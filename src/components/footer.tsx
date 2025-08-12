"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Brand */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Snappix
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              AI-powered design-to-code for React & Tailwind.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-600">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="hover:text-purple-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-purple-600">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-purple-600">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3 text-slate-900 dark:text-slate-100">Follow us</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mohitbansal25082006/snappixai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/snappixai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600"
              >
                <Twitter size={20} />
              </a>
              <a href="mailto:hey@snappix.ai" className="hover:text-purple-600">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>&copy; {new Date().getFullYear()} Snappix. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Made with ❤️ by Mohit Bansal</span>
        </div>
      </div>
    </footer>
  );
}
