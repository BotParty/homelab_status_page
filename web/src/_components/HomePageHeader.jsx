export default function Header() {
    return (
      <div className="flex justify-between items-center p-8 border-b border-gray-700 bg-[#1e2231] text-[#8b98e8]">
        <div className="flex flex-col space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-[#8b98e8]">Adnan Wahab</h1>
          <h1 className="text-xl font-bold tracking-tight text-[#8b98e8]">Computer Graphics, Robotics, Infrastructure</h1>
  
          <div className="flex space-x-4 text-gray-400">
  
  
  
          <a href="mailto:adnan@llama-tools.com" className="hover:text-[#8b98e8]">email</a>
            <a href="https://github.com/adnanwahab" className="hover:text-[#8b98e8]">github</a>
            <a href="https://x.com/adnan_wahab_" className="hover:text-[#8b98e8]">twitter</a>
            <a href="https://linkedin.com/in/adnanwahab" className="hover:text-[#8b98e8]">linkedin</a>
  
            <a href="/blog" className="hover:text-[#8b98e8]">blog</a>
            {/* <a href="/tools" className="hover:text-[#8b98e8]">tools</a> */}
            {/* <a href="/about" className="hover:text-[#8b98e8]">about</a> */}
  
          </div>
          <div className="text-sm text-gray-400">
            <a href="/simulation_game" className="hover:text-[#8b98e8] underline">Play interactive music physics game</a>
          </div>
  
  
          <div className="text-sm text-gray-400">
            <a href="/robotics-odyssey" className="hover:text-[#8b98e8] underline">Self-teaching Robotics info-course</a>
          </div>
        </div>
        {/* <img
          src="/personal/friends.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-lg"
        /> */}
      </div>
    )
  }