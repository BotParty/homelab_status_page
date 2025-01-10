import { serve } from "bun";
import { createClient } from "@clickhouse/client";

// 1. Create a ClickHouse client
// const client = createClient({
//   url: "http://localhost:8123", // default ClickHouse HTTP port
//    username: "default", // add username
//  password: "sicp.123", // add password
// });

// async function initializeDatabase() {
//   try {
//     // Create the table
//     await client.query({
//       query: `  
//         CREATE TABLE IF NOT EXISTS houston_weather (
//           date Date,
//           weather String,
//           temp_max Float32,
//           temp_min Float32,
//           precipitation Float32
//         ) ENGINE = MergeTree()
//         ORDER BY date
//       `
//     });

//     // Insert sample data for the last week
//     await client.query({
//       query: `
//         INSERT INTO houston_weather (date, weather, temp_max, temp_min, precipitation)
//         VALUES
//           ('2024-03-20', 'Sunny', 85.6, 72.3, 0.0),
//           ('2024-03-21', 'Partly Cloudy', 82.4, 70.1, 0.0),
//           ('2024-03-22', 'Thunderstorm', 79.8, 68.5, 1.2),
//           ('2024-03-23', 'Humid', 84.2, 73.4, 0.1),
//           ('2024-03-24', 'Clear', 86.1, 71.8, 0.0),
//           ('2024-03-25', 'Scattered Clouds', 83.5, 69.9, 0.0),
//           ('2024-03-26', 'Light Rain', 78.9, 67.2, 0.4)
//       `
//     });

//     console.log('Database initialized with Houston weather data');
//   } catch (err) {
//     console.error('Error initializing database:', err);
//   }
// }

// // Call this before starting the server
// await initializeDatabase();

async function handler(req) {
  // const query = `
  //   SELECT
  //     weather,
  //     round(AVG(temp_max), 2) AS avg_temp_max,
  //     round(MAX(temp_max), 2) AS max_temp
  //   FROM houston_weather
  //   GROUP BY weather
  //   ORDER BY avg_temp_max DESC
  // `;

  // let rows = [];
  // try {
  //   const resultSet = await client.query({
  //     query,
  //     format: "JSONEachRow",
  //   });
  //   rows = await resultSet.json();
  // } catch (err) {
  //   console.error("Error querying ClickHouse:", err);
  //   return new Response("Error querying ClickHouse", { status: 500 });
  // }

  const tableRows = ``
  // 4. Build a simple HTML table from the result
//   const tableRows = rows.data
//     .map(
//       (row) => `
//         <tr>
//           <td>${row.weather}</td>
//           <td>${row.avg_temp_max}</td>
//           <td>${row.max_temp}</td>
//         </tr>
//       `
//     )
//     .join("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Seattle Weather Stats</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        table { border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px 12px; }
        th { background: #f5f5f5; }
      </style>
    </head>
    <body>
      <h1>Seattle Weather Stats (by Weather Type)</h1>
      <table>
        <thead>
          <tr>
            <th>Weather Type</th>
            <th>Avg Temp Max</th>
            <th>Max Temp</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // 5. Return the HTML response
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

// 6. Start the Bun server
serve({
  fetch: handler,
  port: 8000,
});

console.log("Server running at http://localhost:3000");
