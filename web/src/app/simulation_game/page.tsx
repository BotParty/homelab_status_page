export default function SimulationEditor() {
  return (
    <div
      className="bg-blue-100"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      <iframe
        src="https://musicgame2026.netlify.app/"
        width="100%"
        height="100%"
        style={{
          border: 'none',
        }}
      />
    </div>
  )
}
