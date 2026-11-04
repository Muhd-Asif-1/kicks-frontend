"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InstagramIcon } from "@/components/ui/instagram";
import { XIcon } from "@/components/ui/x";
import { type CommunityPost, communityPosts, communityProfile } from "./community-data";

function ReelPreview({
  post,
  paused,
}: {
  post: Extract<CommunityPost, { type: "video" }>;
  paused: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      if (visible && !paused && !preference.matches && !document.hidden)
        void element.play().catch(() => {});
      else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        update();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element.pause();
    };
  }, [paused]);
  return (
    <video
      ref={video}
      src={post.video}
      poster={post.image}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.035]"
    />
  );
}

function ReelViewer({
  post,
  onClose,
}: {
  post: Extract<CommunityPost, { type: "video" }>;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby="reel-title"
      className="reel-dialog backdrop:bg-black/[0.82] backdrop:backdrop-blur-[10px] fixed m-auto max-h-[94dvh] w-[min(90vw,430px)] overflow-visible rounded-xl bg-[#171715] p-0 text-white shadow-2xl"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-2">
        <h3 id="reel-title" className="text-xs font-medium">
          {post.alt}
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Reel"
          className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-2"
        >
          <XIcon aria-hidden="true" size={22} />
        </button>
      </div>
      <video
        src={post.video}
        poster={post.image}
        controls
        playsInline
        muted
        preload="metadata"
        onError={() => setFailed(true)}
        aria-label={post.alt}
        className="mx-auto max-h-[72dvh] w-full bg-black object-contain"
      >
        Your browser does not support video playback.
      </video>
      {failed && (
        <p role="alert" className="p-4 text-sm">
          This clip could not load. Please close and try again.
        </p>
      )}
      <p className="p-4 text-[10px] tracking-[0.16em] text-white/60">
        KICKS COMMUNITY / MOCK REEL · SILENT CLIP
      </p>
    </dialog>
  );
}

export default function KicksCommunity() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<Extract<CommunityPost, { type: "video" }> | null>(null);
  return (
    <section
      aria-labelledby="kicks-community-heading"
      className="bg-[#F5F3EE] px-6 py-16 text-[#171715] sm:px-10 sm:py-20 lg:px-16 lg:py-24 xl:px-20"
    >
      <div className="mb-9 flex flex-col items-start justify-between gap-6 sm:mb-12 lg:flex-row lg:items-end">
        <div>
          <p className="text-[10px] font-medium tracking-[0.24em] text-black/50">
            THE KICKS COMMUNITY
          </p>
          <h2
            id="kicks-community-heading"
            className="mt-4 text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.05em]"
          >
            ON THE GRAM
          </h2>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-black/55 sm:text-sm">
            A little inspiration from the streets. Follow the Kicks community.
          </p>
        </div>
        <a
          href={communityProfile.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-3 text-[11px] font-medium tracking-[0.12em] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <InstagramIcon aria-hidden="true" size={18} /> FOLLOW {communityProfile.handle}
          <span className="sr-only"> on Instagram (opens in a new tab)</span>
        </a>
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
        className="mb-4 min-h-11 text-[10px] tracking-[0.12em] underline underline-offset-4 focus-visible:outline-2"
      >
        {paused ? "PLAY VIDEO PREVIEWS" : "PAUSE VIDEO PREVIEWS"}
      </button>
      <ul
        aria-label="Kicks community Reels and photographs"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 motion-safe:scroll-smooth sm:gap-4 lg:grid lg:grid-cols-6 lg:overflow-visible"
      >
        {communityPosts.map((post) => {
          const media = (
            <>
              {post.type === "video" ? (
                <ReelPreview post={post} paused={paused || active !== null} />
              ) : (
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 639px) 64vw, (max-width: 1023px) 30vw, 16vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.035]"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
              />
              <span aria-hidden="true" className="absolute left-3 top-3 text-white">
                <InstagramIcon size={17} />
              </span>
              {post.type === "video" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center text-white"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-colors group-hover:bg-black/40">
                    <Play className="size-4 fill-current" />
                  </span>
                </span>
              )}
              <span
                aria-hidden="true"
                className="absolute bottom-3 left-3 text-[9px] tracking-[0.15em] text-white"
              >
                {post.type === "video" ? "PLAY REEL" : "ON THE STREETS"}
              </span>
            </>
          );
          const className =
            "group relative block aspect-[9/16] w-full overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-4";
          return (
            <li key={post.id} className="w-[64vw] flex-none snap-start sm:w-[30vw] lg:w-auto">
              {post.type === "video" ? (
                <button
                  type="button"
                  aria-label={`Play Reel: ${post.alt}`}
                  aria-haspopup="dialog"
                  onClick={() => setActive(post)}
                  className={className}
                >
                  {media}
                </button>
              ) : (
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View photograph on Instagram: ${post.alt} (opens in a new tab)`}
                  className={className}
                >
                  {media}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      {active && <ReelViewer key={active.id} post={active} onClose={() => setActive(null)} />}
    </section>
  );
}
