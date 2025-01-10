// INSERT INTO my_table (event_date, user_id, action)
// VALUES
//     ('2023-01-01', 101, 'click'),
//     ('2023-01-01', 102, 'view');
// curl https://clickhouse.com/ | sh


import { createClient } from '@clickhouse/client' // or '@clickhouse/client-web'

const client = createClient({
  /* configuration */
})