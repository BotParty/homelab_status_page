export default function Tailscale() {
  return (
    <div className="grid grid-cols-3 gap-4 h-screen p-4">
      <div className="border-2 border-black rounded-md p-4">
        <h1>gpu1</h1>
        <iframe 
          src="https://gpu.jerboa-kokanue.ts.net"
          className="w-full h-[calc(100%-2rem)]"
        ></iframe>
      </div>

      <div className="border-2 border-black rounded-md p-4">
        <h1>gpu2</h1>
        <iframe 
          src="https://gpu2.jerboa-kokanue.ts.net"
          className="w-full h-[calc(100%-2rem)]"
        ></iframe>
      </div>

      <div className="border-2 border-black rounded-md p-4">
        <h1>shels-macbook-pro</h1>
        <iframe 
          src="https://shels-macbook-pro.jerboa-kokanue.ts.net/"
          className="w-full h-[calc(100%-2rem)]"
        ></iframe>
      </div>
    </div>
  );
}
