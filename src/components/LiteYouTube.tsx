"use client";
import { useState } from "react";

interface Props {
  videoId: string;
  title: string;
}

export default function LiteYouTube({ videoId, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (loaded) {
    return (
      <div className="aspect-video w-full">
        <iframe
          width="100%" height="100%"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setLoaded(true)}
      className="relative w-full aspect-video bg-black flex items-center justify-center group cursor-pointer border-0 p-0"
      aria-label={`Play ${title}`}
      style={{ display: "block" }}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${thumb})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

      {/* Play button */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110"
          style={{ background: "#FF0000" }}
        >
          <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-white text-sm font-semibold bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
          ▶ Play Hindi Audiobook
        </span>
      </div>

      {/* YouTube logo bottom-left */}
      <div className="absolute bottom-3 left-3 z-10">
        <svg viewBox="0 0 90 20" className="h-4 fill-white opacity-80">
          <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"/>
          <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="#FF0000"/>
          <path d="M34.6024 13.0036L31.3945 1.41846H33.7467L35.7011 9.06482H35.8113L37.6971 1.41846H40.0493L36.8651 13.0036V18.561H34.6001L34.6024 13.0036ZM40.8786 18.5657C40.3875 18.2341 40.0317 17.7359 39.8243 17.0699C39.6169 16.4039 39.5117 15.5117 39.5117 14.3892V12.0296C39.5117 10.8914 39.6244 10.0014 39.8382 9.34104C40.0564 8.68069 40.4123 8.19638 40.9082 7.87499C41.4029 7.55097 42.0606 7.38897 42.8849 7.38897C43.7038 7.38897 44.3561 7.55361 44.8414 7.88025C45.3248 8.2056 45.6742 8.69258 45.8808 9.3472C46.0874 10.0032 46.19 10.8904 46.19 12.0296V14.3892C46.19 15.5082 46.09 16.3978 45.8938 17.0578C45.6976 17.7178 45.3418 18.2147 44.8278 18.5507C44.3137 18.8867 43.6517 19.0534 42.8352 19.0534C41.9939 19.0534 41.3707 18.8914 40.8786 18.5657Z" fill="white"/>
        </svg>
      </div>
    </button>
  );
}
