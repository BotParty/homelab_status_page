from dataclasses import dataclass
from datetime import date, timedelta
import sqlite3
from typing import Iterator, List
import unittest


_db = sqlite3.connect(":memory:")


CREATE_MARKETING_SOURCES_TABLE = """
    CREATE TABLE marketing_sources (
        id INTEGER PRIMARY KEY,
        name TEXT,
        synced_until TEXT
    )
"""

CREATE_MARKETING_SOURCE_DATA_TABLE = """
    CREATE TABLE marketing_source_data (
        marketing_source_id INTEGER,
        ad_id INTEGER,
        date TEXT,
        impressions REAL,
        clicks REAL,
        conversions REAL,
        spend REAL,
        FOREIGN KEY (marketing_source_id) REFERENCES marketing_sources(id)
    )
"""


@dataclass
class MarkingSourceRow:
    ad_id: int
    date: date
    impressions: float
    clicks: float
    conversions: float
    spend: float


class DummyMarketingSource:
    """Dummy marketing source sync implementation.

    (!) This implementation is entirely correct and complete.

    This dummy source has 10 active ads.
    Each ad serves 1000 impressions, 100 clicks and 1 conversion, and spends $10 per day.

    E.g. for since: 2021-01-01, until: 2021-01-03, the data would be:
    ad_id | date       | impressions | clicks | conversions | spend
    ------|------------|-------------|--------|-------------|------
    0     | 2021-01-01 | 1000        | 100    | 1           | 10
    0     | 2021-01-02 | 1000        | 100    | 1           | 10
    0     | 2021-01-03 | 1000        | 100    | 1           | 10
    1     | 2021-01-01 | 1000        | 100    | 1           | 10
    1     | 2021-01-02 | 1000        | 100    | 1           | 10
    1     | 2021-01-03 | 1000        | 100    | 1           | 10
    2     | 2021-01-01 | 1000        | 100    | 1           | 10
    ...
    """

    def get_data(self, since: date, until: date) -> Iterator[MarkingSourceRow]:
        yield from [
            MarkingSourceRow(
                ad_id=ad_id,
                date=date,
                impressions=1000,
                clicks=100,
                conversions=1,
                spend=10,
            )
            for ad_id in range(10)
            for date in [
                since + timedelta(days=i) for i in range((until - since).days + 1)
            ]
        ]


@dataclass
class MarketingsourceSyncer:
    """Syncs marketing source data from a third-party API to the database."""

    id_: int

    def run(self, until: date) -> None:
        impl = self._get_sync_impl()
        since = self._get_sync_cursor()

        for row in impl.get_data(since, until):
            self._save_row(row)
        self._update_synced_until(until)

    def _get_sync_impl(self) -> DummyMarketingSource:
        """Returns a marketing source sync implementation based on the source's type.

        For now, we only have a dummy implementation."""
        return DummyMarketingSource()

    def _get_sync_cursor(self) -> date:
        """Returns the last synced timestamp for the marketing source."""
        synced_until: str | None = _db.execute(
            "SELECT synced_until FROM marketing_sources WHERE id = ?", (self.id_,)
        ).fetchone()[0]
        if synced_until is None:
            # initial sync: sync the last 7 days (including today)
            return date.today() - timedelta(days=6)
        return date.fromisoformat(synced_until)

    def _update_synced_until(self, until: date) -> None:
        """Updates the synced_until timestamp to the current progress for the marketing source."""
        _db.execute(
            "UPDATE marketing_sources SET synced_until = ? WHERE id = ?",
            (until.isoformat(), self.id_),
        )

    def _save_row(self, row: MarkingSourceRow) -> None:
        """Saves the marketing source data to the database."""
        _db.execute(
            """
            INSERT INTO marketing_source_data (marketing_source_id, ad_id, date, impressions, clicks, conversions, spend)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                self.id_,
                row.ad_id,
                row.date.isoformat(),
                row.impressions,
                row.clicks,
                row.conversions,
                row.spend,
            ),
        )


class TestMarketingSourceSync(unittest.TestCase):
    def setUp(self) -> None:
        self._migrate_db()
        self._dummy_sync_id = self._create_sync("Dummy source")

    def tearDown(self) -> None:
        self._clean_db()

    def test_marketing_source_initial(self) -> None:
        # run an initial sync
        until = date.today()
        syncer = MarketingsourceSyncer(self._dummy_sync_id)
        syncer.run(until)

        # verify the resulting metrics
        totals = _db.execute(
            "SELECT count(*), sum(impressions), sum(clicks), sum(conversions), sum(spend) FROM marketing_source_data WHERE marketing_source_id = ?",
            (self._dummy_sync_id,),
        ).fetchone()
        self.assertEqual(totals, (70, 70_000, 7_000, 70, 700))

    def _migrate_db(self) -> None:
        _db.execute(CREATE_MARKETING_SOURCE_DATA_TABLE)
        _db.execute(CREATE_MARKETING_SOURCES_TABLE)

    def _clean_db(self) -> None:
        _db.execute("DROP TABLE marketing_source_data")
        _db.execute("DROP TABLE marketing_sources")

    def _create_sync(self, name: str) -> int:
        id_: int = _db.execute(
            "INSERT INTO marketing_sources (name, synced_until) VALUES (?, ?) RETURNING id",
            (name, None),
        ).fetchone()[0]
        return id_


"""
In production, we notice that the data displayed by Converge does not match the data from the third-party API.

While the data from the backfilled 7 days is correct, from the moment the sync is turned on, we see the following:

           |  impressions  |    clicks     |  conversions  |     spend      |
    date   | cvg   | dummy | cvg   | dummy | cvg   | dummy | cvg   | dummy  |
-----------|-------|-------|-------|-------|-------|-------|-------|--------|
2021-01-01 | 1000  | 1000  | 100   | 100   | 1     | 1     | 10    | 10     |  <---     backfilled
2021-01-02 | 1000  | 1000  | 100   | 100   | 1     | 1     | 10    | 10     |  <---     backfilled
2021-01-03 | 1000  | 1000  | 100   | 100   | 1     | 1     | 10    | 10     |  <---     backfilled
2021-01-04 | 1000  | 1000  | 100   | 100   | 1     | 1     | 10    | 10     |  <---     backfilled
2021-01-05 | 1000  | 1000  | 100   | 100   | 1     | 1     | 10    | 10     |  <---     backfilled
2021-01-06 | 1000  | 1000  | 100   | 100   | 1     | 1     | 10    | 10     |  <---     backfilled
2021-01-07 | 2000  | 1000  | 200   | 100   | 2     | 1     | 20    | 10     |  <--- sync turned on
2021-01-08 | 2000  | 1000  | 200   | 100   | 2     | 1     | 20    | 10     |  <---    sync active
2021-01-09 | 2000  | 1000  | 200   | 100   | 2     | 1     | 20    | 10     |  <---    sync active
2021-01-10 | 2000  | 1000  | 200   | 100   | 2     | 1     | 20    | 10     |  <---          today

Find the bug, fix it, and write a unit test to ensure it does not reappear.
"""


