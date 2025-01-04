

const about = `I'm a design engineer...` // existing text

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        About Me
      </h1>
      
      <div className="prose prose-lg dark:prose-invert">
        {about.split('\n\n').map((paragraph, index) => (
          <p 
            key={index} 
            className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Optional: Add a contact/resume button */}
      <div className="mt-12">
        my phone number is 713-677-3668
      </div>
    </div>
  )
}