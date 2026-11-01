import Image from "next/image";
import { cn } from "@/lib/utils";
import { communityPosts, communityProfile } from "./community-data";

export default function KicksCommunity() {
  return (
    <section
      aria-labelledby="kicks-community-heading"
      className="bg-[#F5F3EE] px-6 py-16 text-[#171715] sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-20"
    >
      <div className="mb-9 flex flex-col items-start justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end lg:gap-10">
        <div>
          <p className="text-[10px] font-medium tracking-[0.24em] text-[#171715]/50">
            THE KICKS COMMUNITY
          </p>
          <h2
            id="kicks-community-heading"
            className="mt-4 text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.05em]"
          >
            YOUR STYLE. YOUR KICKS.
          </h2>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-[#171715]/55 sm:text-sm">
            The streets are our runway. See how the Kicks community wears it.
          </p>
        </div>
        <a
          href={communityProfile.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-3 text-[11px] font-medium tracking-[0.12em] underline-offset-4 transition-opacity hover:opacity-60 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
        >
          <Image src="/brands/instagram.svg" alt="" width={16} height={16} className="size-4" />
          FOLLOW {communityProfile.handle}
          <span className="sr-only"> on Instagram (opens in a new tab)</span>
        </a>
      </div>

      <ul className="columns-2 gap-3 sm:gap-5 lg:columns-3">
        {communityPosts.map((post) => (
          <li key={post.id} className="break-inside-avoid pb-3 sm:pb-5">
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View on Instagram: ${post.alt} (opens in a new tab)`}
              className={cn(
                "group relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171715]",
                post.format === "portrait" ? "aspect-[4/5]" : "aspect-square",
              )}
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 1023px) 50vw, 33vw"
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.035] motion-safe:group-focus-visible:scale-[1.035]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-end bg-[linear-gradient(0deg,rgba(0,0,0,0.45),transparent_45%)] p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 motion-reduce:transition-none sm:p-5"
              >
                <span className="inline-flex items-center gap-2 text-[9px] font-medium tracking-[0.16em] text-white sm:gap-3 sm:text-[10px]">
                  <Image
                    src="/brands/instagram.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 brightness-0 invert"
                  />
                  VIEW POST
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
