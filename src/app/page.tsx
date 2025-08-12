"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Upload, Zap, Code2, Palette, Layers, Star, Check, Shield, ZapIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-purple-900">
      
      {/* Hero */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent leading-tight">
          Snappix
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl mx-auto text-slate-700 dark:text-slate-300">
          Transform your Figma screenshots into production-ready React components with AI-powered precision.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105">
            <Link href="/sign-up">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
          How It Works in 3 Steps
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[ { icon: Upload, title: "Upload Screenshot", desc: "Drag-and-drop any PNG/JPG/WebP screenshot." },
             { icon: ZapIcon, title: "AI Analysis", desc: "GPT-4o extracts colors, typography & layout." },
             { icon: Code2, title: "Get Code", desc: "Receive clean TypeScript + Tailwind component." } ].map((f, i) => (
            <Card key={i}>
              <CardHeader>
                <f.icon className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
          Why Snappix?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[ { icon: Star, title: "100% AI Accuracy", desc: "Powered by GPT-4o Vision." },
             { icon: Palette, title: "Design Tokens", desc: "Colors, spacing & fonts auto-extracted." },
             { icon: Layers, title: "Version History", desc: "Save & compare every iteration." },
             { icon: Shield, title: "Storybook Ready", desc: "Stories generated on export." } ].map((h, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <h.icon className="h-10 w-10 text-purple-600 mb-2" />
              <h3 className="font-semibold text-lg">{h.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Ready to Ship Faster?
        </h2>
        <p className="mb-6 max-w-xl mx-auto text-slate-600 dark:text-slate-400">
          Join thousands of developers turning design into code in minutes.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105">
          <Link href="/sign-up">Start Free Trial</Link>
        </Button>
      </section>
    </div>
  );
}