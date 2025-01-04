'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#1e2231] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#8b98e8] mb-4">Something went wrong!</h2>
        <button
          className="px-4 py-2 bg-[#8b98e8] text-[#1e2231] rounded-lg hover:bg-opacity-90"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
} 