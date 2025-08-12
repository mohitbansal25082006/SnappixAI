"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    features: ["5 uploads / day", "Basic export", "Community support"],
  },
  {
    name: "Pro",
    price: "$15 / mo",
    features: ["Unlimited uploads", "Full export packs", "Priority support", "Team sharing"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["White-label", "On-prem / VPC", "SLA", "Dedicated support"],
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-6 py-20 max-w-6xl">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-gray-900 dark:text-gray-100">
        💳 Pricing
      </h1>
      <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-14">
        Choose the plan that fits your workflow.
      </p>

      <div className="grid gap-10 md:grid-cols-3">
        {tiers.map((tier) => {
          const isPro = tier.name === "Pro";

          return (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl border ${
                isPro
                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900 dark:border-indigo-500 shadow-lg"
                  : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              } p-8 transition-shadow hover:shadow-2xl`}
            >
              <h2
                className={`text-2xl font-semibold mb-3 ${
                  isPro ? "text-indigo-700 dark:text-indigo-300" : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {tier.name}
              </h2>

              <p
                className={`text-4xl font-extrabold mb-6 ${
                  isPro ? "text-indigo-900 dark:text-indigo-200" : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {tier.price}
              </p>

              <ul className="flex-grow space-y-3 text-gray-700 dark:text-gray-300 text-base">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check
                      className={`h-5 w-5 ${
                        isPro ? "text-indigo-600 dark:text-indigo-400" : "text-green-500"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 w-full text-lg font-medium"
                variant={isPro ? "default" : "outline"}
                size="lg"
              >
                {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
