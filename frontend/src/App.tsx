import rows from './dummy.json'

function App() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-8'>
      <h1 className="text-3xl font-bold">
        Marketing metrics
      </h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Spend</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>Conversions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (<tr key={index}>
            <td>{row.date}</td>
            <td>{row.spend}</td>
            <td>{row.impressions}</td>
            <td>{row.clicks}</td>
            <td>{row.conversions}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
