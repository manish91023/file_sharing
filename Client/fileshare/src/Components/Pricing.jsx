import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Pricing() {
  useGSAP(() => {
    gsap.from(".pricing", {
      x: 600,
      duration: 5,
      opacity: 0,
      scrollTrigger: {
        trigger: ".pricing",
        start: "top 60%",
        end: "bottom 70%",
        scrub: true,
      },
    });
  });

  return (
    <div className="pricing md:w-[300px] w-[200px] mt-5 p-4 bg-white border border-gray-200 rounded-lg shadow md:p-6">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 md:text-2xl">
        Standard plan
      </h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold md:text-4xl">$</span>
        <span className="text-5xl font-extrabold tracking-tight md:text-6xl">0</span>
        <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400 md:text-lg">
          /month
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7 md:grid md:grid-cols-2 md:gap-6">
        {pricingFeatures.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </ul>
      <button
        type="button"
        className="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center md:py-3 md:px-6"
      >
        Thanks
      </button>
    </div>
  );
}

function FeatureItem({ feature }) {
  return (
    <li className="flex items-center space-x-3">
      <svg
        className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500 mr-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 md:text-sm">
        {feature}
      </span>
    </li>
  );
}

const pricingFeatures = [
  "Unlimited User Access",
  "2GB Cloud storage",
  "Easy To Download",
  "Sketch Files",
  "API Access",
  "Complete documentation",
  "24×7 phone & email support",
];

export default Pricing;