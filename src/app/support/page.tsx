"use client";

import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-3xl bg-white dark:bg-gray-900 rounded-xl shadow-xl">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
        🆘 Support
      </h1>

      <section className="space-y-12">
        {/* Help Intro */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
            Need Help?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We’re here 24/7. Reach out via any channel below.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-xl mx-auto">
          <a
            href="mailto:hey@snappix.ai"
            className="flex items-center gap-4 p-5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-shadow shadow-sm hover:shadow-md"
          >
            <div className="bg-indigo-600 text-white p-3 rounded-lg shadow-md">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-lg text-indigo-900 dark:text-indigo-200">
                Email Us
              </p>
              <p className="text-indigo-700 dark:text-indigo-300 text-sm">
                hey@snappix.ai
              </p>
            </div>
          </a>

          <a
            href="https://discord.gg/snappix"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl border border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900 hover:bg-purple-100 dark:hover:bg-purple-800 transition-shadow shadow-sm hover:shadow-md"
          >
            <div className="bg-purple-600 text-white p-3 rounded-lg shadow-md">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-lg text-purple-900 dark:text-purple-200">
                Join Discord
              </p>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Chat with our community
              </p>
            </div>
          </a>
        </div>

        {/* Self Help Section */}
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Self-Help
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300 text-lg">
            <li>
              <Link href="/docs" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">
                Read the docs
              </Link>
            </li>
            <li>
              <Link href="/docs#faq" className="underline hover:text-indigo-600 dark:hover:text-indigo-400">
                Check the FAQ
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
