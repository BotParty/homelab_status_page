import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1e2231] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#8b98e8] mb-4">Page Not Found</h2>
        <Link 
          href="/"
          className="px-4 py-2 bg-[#8b98e8] text-[#1e2231] rounded-lg hover:bg-opacity-90 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 