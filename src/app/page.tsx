"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Upload, Zap, Code2, Palette, Layers, Star, Shield, ZapIcon } from "lucide-react";

export default function LandingPage() {
  const features = [
    { icon: Upload, title: "Upload Screenshot", desc: "Drag-and-drop any PNG/JPG/WebP screenshot." },
    { icon: ZapIcon, title: "AI Analysis", desc: "GPT-4o extracts colors, typography & layout." },
    { icon: Code2, title: "Get Code", desc: "Receive clean TypeScript + Tailwind component." },
  ];

  const highlights = [
    { icon: Star, title: "100% AI Accuracy", desc: "Powered by GPT-4o Vision." },
    { icon: Palette, title: "Design Tokens", desc: "Colors, spacing & fonts auto-extracted." },
    { icon: Layers, title: "Version History", desc: "Save & compare every iteration." },
    { icon: Shield, title: "Storybook Ready", desc: "Stories generated on export." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 py-32 sm:py-40 lg:px-8">
        <div className="absolute inset-0 -z-10 blur-3xl">
          <div
            className="bg-gradient-to-tr from-purple-400 to-pink-500 opacity-30 w-[60vw] h-[60vw] rounded-full mx-auto filter animate-blob"
            style={{ animationDuration: "20s" }}
          />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
            Snappix
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            Transform your Figma screenshots into production-ready React components with AI-powered precision.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 hover:shadow-lg transition-transform duration-300 shadow-purple-400/50"
            >
              <Link href="/sign-up" className="flex items-center gap-2">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-500">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100 relative inline-block">
          How It Works in 3 Steps
          <span className="block h-1 w-24 bg-purple-600 rounded-full mx-auto mt-3" />
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Card
              key={i}
              className="group hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-3xl border border-transparent hover:border-purple-400 dark:hover:border-purple-600"
            >
              <CardHeader className="flex flex-col items-center text-center">
                <Icon className="h-10 w-10 text-purple-600 group-hover:animate-bounce transition-transform duration-300" />
                <CardTitle className="mt-4 text-2xl font-semibold">{title}</CardTitle>
                <CardDescription className="mt-2 text-gray-600 dark:text-gray-400 max-w-[14rem]">
                  {desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100 relative inline-block">
          Why Snappix?
          <span className="block h-1 w-24 bg-purple-600 rounded-full mx-auto mt-3" />
        </h2>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Icon className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20 max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-gray-100">
          Ready to Ship Faster?
        </h2>
        <p className="mb-10 text-lg text-gray-700 dark:text-gray-400 max-w-xl mx-auto">
          Join thousands of developers turning design into code in minutes.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-110 hover:shadow-xl transition-transform duration-300 shadow-purple-500/60"
        >
          <Link href="/sign-up">Start Free Trial</Link>
        </Button>
      </section>

      {/* Blob animation keyframes */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
      `}</style>
    </div>
  );
}
