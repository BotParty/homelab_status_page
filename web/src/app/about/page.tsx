

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
        {/* <Button
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Get in Touch
        </Button> */}
      </div>
    </div>
  )
}