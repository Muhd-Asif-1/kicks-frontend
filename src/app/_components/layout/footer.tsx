"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

const navigation = [
  {
    title: "THE BRAND",
    links: [
      ["About Kicks", "/about"],
      ["Our Story", "/our-story"],
      ["Featured Brands", "/brands"],
      ["Careers", "/careers"],
    ],
  },
  {
    title: "CUSTOMER SUPPORT",
    links: [
      ["Contact Us", "/contact"],
      ["Shipping & Delivery", "/shipping"],
      ["Returns & Exchanges", "/returns"],
      ["Order Tracking", "/order-tracking"],
      ["FAQs", "/faqs"],
    ],
  },
  {
    title: "INFORMATION",
    links: [
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms-and-conditions"],
      ["Cookie Policy", "/cookie-policy"],
    ],
  },
] as const;

// Simple Icons brand paths, kept inline because Lucide doesn't include brand logos.
// Replace the platform URLs with Kicks' official profiles when available.
const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/",
    path: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z",
  },
];

const locales = [
  { name: "country", label: "Country", value: "IN", text: "India" },
  { name: "currency", label: "Currency", value: "INR", text: "INR ₹" },
  { name: "language", label: "Language", value: "en", text: "English" },
] as const;

type FooterProps = {
  newsletterAction?: (formData: FormData) => void | Promise<void>;
};

export default function Footer({ newsletterAction }: FooterProps = {}) {
  const id = useId();

  return (
    <footer className="w-full overflow-hidden bg-[#F5F3EE] pt-16 text-[#3B2923] sm:pt-20 lg:pt-24">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-[1.65fr_1fr_1.1fr_0.85fr] lg:gap-x-16 xl:gap-x-24">
          <section aria-labelledby={`${id}-newsletter`} className="max-w-md">
            <h2 id={`${id}-newsletter`} className="text-xs font-semibold tracking-[0.12em]">
              STAY IN THE LOOP
            </h2>
            <p className="mt-5 max-w-[21rem] text-sm leading-relaxed text-[#3B2923]/75">
              Get updates on new drops, exclusive releases and offers.
            </p>
            <form
              action={newsletterAction}
              onSubmit={newsletterAction ? undefined : (event) => event.preventDefault()}
              aria-describedby={!newsletterAction ? `${id}-signup-status` : undefined}
              className="mt-7"
            >
              <label htmlFor={`${id}-email`} className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-3 border-b border-[#3B2923]/30 focus-within:border-[#3B2923] focus-within:shadow-[0_1px_0_#3B2923]">
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  required
                  className="min-h-12 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#3B2923]/45 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!newsletterAction}
                  className="flex min-h-12 shrink-0 items-center gap-2 text-[10px] font-medium tracking-[0.08em] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
                >
                  SUBSCRIBE{" "}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-5 flex items-start gap-3">
                <input
                  id={`${id}-consent`}
                  type="checkbox"
                  name="privacyConsent"
                  value="accepted"
                  required
                  className="mt-0.5 size-4 shrink-0 cursor-pointer accent-[#3B2923] focus-visible:outline-2 focus-visible:outline-offset-4"
                />
                <p className="text-[11px] leading-relaxed text-[#3B2923]/75">
                  <label htmlFor={`${id}-consent`} className="cursor-pointer">
                    I agree to receive marketing emails from Kicks and accept the{" "}
                  </label>
                  <Link
                    href="/privacy-policy"
                    prefetch={false}
                    className="underline decoration-[#3B2923]/40 underline-offset-2 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              {!newsletterAction && (
                <p id={`${id}-signup-status`} className="mt-3 text-[10px] text-[#3B2923]/55">
                  Newsletter signups open soon.
                </p>
              )}
            </form>
          </section>

          {navigation.map((group, index) => (
            <nav key={group.title} aria-labelledby={`${id}-nav-${index}`}>
              <h2 id={`${id}-nav-${index}`} className="text-xs font-semibold tracking-[0.12em]">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-1">
                {group.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      prefetch={false}
                      className="inline-flex min-h-9 items-center text-[13px] text-[#3B2923]/80 underline-offset-4 transition-colors hover:text-[#3B2923] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-wrap gap-x-7 gap-y-5 sm:gap-x-10">
            {locales.map((locale) => (
              <div key={locale.name}>
                <label
                  htmlFor={`${id}-${locale.name}`}
                  className="block text-[9px] font-medium uppercase tracking-[0.14em] text-[#3B2923]/55"
                >
                  {locale.label}
                </label>
                <div className="relative mt-1">
                  <select
                    id={`${id}-${locale.name}`}
                    name={locale.name}
                    defaultValue={locale.value}
                    className="min-h-10 cursor-pointer appearance-none bg-transparent pr-6 text-xs focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <option value={locale.value}>{locale.text}</option>
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-1/2 size-3 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:gap-10">
            <p className="text-[10px] tracking-[0.02em] text-[#3B2923]/55">
              © 2026 Kicks. All rights reserved.
            </p>
            <nav aria-label="Social media" className="-ml-3 flex items-center gap-1 sm:ml-0">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-full transition-opacity hover:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-[18px]"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(3rem,6vw,7rem)] px-3 pb-4 sm:px-5 sm:pb-6 lg:px-8 lg:pb-8">
        {/* Crop the asset's transparent padding, preserving the original wordmark and underline. */}
        <div className="relative aspect-[1463/443] w-full overflow-hidden">
          <Image
            src="/logo-black.png"
            alt="Kicks"
            width={2172}
            height={724}
            sizes="150vw"
            className="absolute -left-[24.27%] -top-[36.57%] h-auto w-[148.46%] max-w-none"
          />
        </div>
      </div>
    </footer>
  );
}
