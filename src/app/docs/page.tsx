"use client";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-900 dark:text-gray-100">
        📚 Documentation
      </h1>

      <section className="space-y-12">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            1. Quick Start
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Sign in <span className="font-semibold">→</span> create a project <span className="font-semibold">→</span> upload a screenshot <span className="font-semibold">→</span> get code.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            2. Supported Formats
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-lg">
            <li><span className="font-medium">Images:</span> PNG, JPG, WebP (≤ 5 MB)</li>
            <li><span className="font-medium">Output:</span> React + Tailwind, Storybook, Next.js starter</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">
            3. FAQ
          </h2>
          <details className="mb-4 group rounded-md bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-700 cursor-pointer transition-shadow hover:shadow-md">
            <summary className="font-semibold text-lg text-gray-900 dark:text-gray-100 list-none group-open:mb-2">
              How accurate is the AI?
            </summary>
            <p className="text-gray-700 dark:text-gray-300 ml-4 mt-1 leading-relaxed">
              GPT-4o Vision typically yields &gt; 90% pixel-perfect components for typical UI patterns.
            </p>
          </details>

          <details className="group rounded-md bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-700 cursor-pointer transition-shadow hover:shadow-md">
            <summary className="font-semibold text-lg text-gray-900 dark:text-gray-100 list-none group-open:mb-2">
              Can I edit the generated code?
            </summary>
            <p className="text-gray-700 dark:text-gray-300 ml-4 mt-1 leading-relaxed">
              Yes – every component is editable in the live Monaco editor and saved as versions.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
