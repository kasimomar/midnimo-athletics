# Scrollytelling Portfolio

A high-end, scroll-driven portfolio built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and Framer Motion. The core mechanic is a
scroll-scrubbed HTML5 Canvas image sequence with parallax text overlay.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for scroll-linked animation
- **HTML5 Canvas** for the image sequence (not video)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx      Root layout, fonts (Fraunces + Inter), global styles
  page.tsx         Composes ScrollyCanvas + Projects
  globals.css      Tailwind layers + base styles
components/
  ScrollyCanvas.tsx  500vh scroll track, sticky canvas, frame scrubbing
  Overlay.tsx        Parallax title (z-10) over the canvas
  Projects.tsx       Glassmorphism project grid
public/
  sequence/          Drop your 89 WebP frames here (see README inside)
```

## How the scroll-scrubbing works

1. `ScrollyCanvas` wraps a `500vh` section with a `sticky top-0 h-screen`
   canvas inside it.
2. `useScroll` (Framer Motion) tracks scroll progress (`0` to `1`)
   across that 500vh section.
3. `useTransform` maps that progress to a frame index (`0` to `88`).
4. On every scroll-driven change, the matching preloaded image is drawn
   to the canvas using a manual `object-fit: cover`-style crop so it
   always fills the viewport, on any screen size.

## Overlay parallax keyframes

`Overlay.tsx` maps scroll progress to horizontal position:

| Scroll progress | Position |
| ---------------- | -------- |
| 0%   | centered |
| 30%  | drifts left |
| 60%  | drifts right (then holds, fading out) |

## Adding your image sequence

See `public/sequence/README.md` — drop in `frame_0000.webp` through
`frame_0088.webp` (zero-padded, 4 digits).

## Notes

- This project lives alongside the existing Midnimo Athletics static
  site in the parent folder — the two are independent and won't
  conflict (separate `package.json`, no shared dependencies).
- Adjust `FRAME_COUNT` in `ScrollyCanvas.tsx` if your sequence has a
  different number of frames.
