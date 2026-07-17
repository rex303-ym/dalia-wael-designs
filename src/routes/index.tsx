import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  Gem,
  Sparkles,
  Box,
  Layers,
  Diamond,
  Ruler,
  Palette,
  FileText,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ArrowRight,
  PenTool,
  Camera,
  Award,
  GraduationCap,
  Languages,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import heroJewelry from "@/assets/hero-jewelry.jpg";
import heroMonogram from "@/assets/hero-monogram.png.asset.json";
import aboutDalia from "@/assets/about-dalia.jpg.asset.json";
import sw1 from "@/assets/sw-1.jpg.asset.json";
import sw2 from "@/assets/sw-2.jpg.asset.json";
import sw3 from "@/assets/sw-3.jpg.asset.json";
import sw4 from "@/assets/sw-4.jpg.asset.json";
import sw5 from "@/assets/sw-5.jpg.asset.json";
import sw6 from "@/assets/sw-6.jpg.asset.json";
import sw7 from "@/assets/sw-7.jpg.asset.json";
import sw8 from "@/assets/sw-8.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#artcam", label: "Art CAM" },
  { href: "#solidworks", label: "SolidWorks" },
  { href: "#3dmax", label: "3D Max" },
  { href: "#photoshop", label: "Photoshop" },
  { href: "#rhino", label: "Rhino & Rhino Gold" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

const SOLIDWORKS_IMAGES = [sw1.url, sw2.url, sw3.url, sw4.url, sw5.url, sw6.url, sw7.url, sw8.url];

const ARTCAM_IMAGES = [
  "photo_2026-07-16_01-34-36.jpg","photo_2026-07-16_01-34-50.jpg","photo_2026-07-16_01-34-55.jpg",
  "photo_2026-07-16_01-35-01.jpg","photo_2026-07-16_01-35-07.jpg","photo_2026-07-16_01-35-12.jpg",
  "photo_2026-07-16_01-35-25.jpg","photo_2026-07-16_01-35-32.jpg","photo_2026-07-16_01-35-36.jpg",
  "photo_2026-07-16_01-35-43.jpg","photo_2026-07-16_01-35-48.jpg","photo_2026-07-16_01-35-56.jpg",
  "photo_2026-07-16_01-36-08.jpg","photo_2026-07-16_01-36-13.jpg","photo_2026-07-16_01-36-18.jpg",
  "photo_2026-07-16_01-36-21.jpg","photo_2026-07-16_01-36-28.jpg","photo_2026-07-16_01-36-33.jpg",
  "photo_2026-07-16_01-36-39.jpg","photo_2026-07-16_01-36-45.jpg","photo_2026-07-16_01-36-50.jpg",
  "photo_2026-07-16_01-36-55.jpg","photo_2026-07-16_01-37-02.jpg","photo_2026-07-16_01-37-07.jpg",
  "photo_2026-07-16_01-37-15.jpg","photo_2026-07-16_01-37-29.jpg","photo_2026-07-16_01-37-35.jpg",
  "photo_2026-07-16_01-37-42.jpg","photo_2026-07-16_01-37-47.jpg","photo_2026-07-16_01-37-53.jpg",
  "photo_2026-07-16_01-37-58.jpg","photo_2026-07-16_01-38-01.jpg","photo_2026-07-16_01-38-06.jpg",
  "photo_2026-07-16_01-38-11.jpg","photo_2026-07-16_01-38-20.jpg","photo_2026-07-16_01-38-26.jpg",
  "photo_2026-07-16_01-38-32.jpg","photo_2026-07-16_01-38-38.jpg","photo_2026-07-16_01-38-42.jpg",
  "photo_2026-07-16_01-38-47.jpg","photo_2026-07-16_01-38-53.jpg","photo_2026-07-16_01-38-57.jpg",
  "photo_2026-07-16_01-39-02.jpg","photo_2026-07-16_01-39-07.jpg","photo_2026-07-16_01-39-15.jpg",
  "photo_2026-07-16_01-39-29.jpg","photo_2026-07-16_01-39-35.jpg","photo_2026-07-16_01-39-40.jpg",
  "photo_2026-07-16_01-39-45.jpg","photo_2026-07-16_01-39-51.jpg","photo_2026-07-16_01-39-55.jpg",
  "photo_2026-07-16_01-40-04.jpg","photo_2026-07-16_01-40-09.jpg","photo_2026-07-16_01-40-12.jpg",
  "photo_2026-07-16_01-40-31.jpg","photo_2026-07-16_01-40-35.jpg","photo_2026-07-16_01-40-40.jpg",
  "photo_2026-07-16_01-40-48.jpg","photo_2026-07-16_01-40-53.jpg",
].map((f) => `/artcam/${f}`);

const THREEDMAX_IMAGES = [
  "2156.JPG","52146.JPG","545152.JPG","654225.JPG","6588.JPG","897.JPG","999.JPG",
  "Screenshot 2025-05-12 182503.png","gfds.JPG",
  "untitled.1.jpg","untitled.38.jpg","untitled.44.jpg","untitled.46.jpg",
  "untitled.59.jpg","untitled.61.jpg",
  "بيئيسس.JPG","رندر شكل هندسي.62.jpg","رندر شمس.67.jpg","رندر طاووس بجد.63.jpg",
  "رندر قنديل.62.jpg","عنكبوت.68.jpg","نتلؤ.JPG","يلسبي.JPG",
].map((f) => `/3dmax/${encodeURIComponent(f)}`);

const PHOTOSHOP_IMAGES = [
  "photo_2026-07-16_01-14-58.jpg","photo_2026-07-16_01-15-15.jpg","photo_2026-07-16_01-15-22.jpg",
  "photo_2026-07-16_01-15-26.jpg","photo_2026-07-16_01-15-40.jpg","photo_2026-07-16_01-15-46.jpg",
  "photo_2026-07-16_01-15-53.jpg","photo_2026-07-16_01-15-59.jpg","photo_2026-07-16_01-16-04.jpg",
  "photo_2026-07-16_01-16-11.jpg","photo_2026-07-16_01-16-18.jpg","photo_2026-07-16_01-16-26.jpg",
  "photo_2026-07-16_01-16-34.jpg","photo_2026-07-16_01-16-48.jpg","photo_2026-07-16_01-16-55.jpg",
  "photo_2026-07-16_01-17-01.jpg","photo_2026-07-16_01-17-07.jpg","photo_2026-07-16_01-17-13.jpg",
  "photo_2026-07-16_01-17-17.jpg","photo_2026-07-16_01-17-21.jpg","photo_2026-07-16_01-17-27.jpg",
  "photo_2026-07-16_01-17-34.jpg","photo_2026-07-16_01-17-41.jpg","photo_2026-07-16_01-17-47.jpg",
  "photo_2026-07-16_01-17-52.jpg","photo_2026-07-16_01-17-58.jpg","photo_2026-07-16_01-18-02.jpg",
  "photo_2026-07-16_01-18-09.jpg","photo_2026-07-16_01-18-48.jpg","photo_2026-07-16_01-18-53.jpg",
].map((f) => `/photoshop/${f}`);

const RHINO_IMAGES = [
  "photo_2026-07-16_00-36-08.jpg","photo_2026-07-16_01-10-02.jpg","photo_2026-07-16_01-10-18.jpg",
  "photo_2026-07-16_01-10-27.jpg","photo_2026-07-16_01-10-32.jpg","photo_2026-07-16_01-10-41.jpg",
  "photo_2026-07-16_01-10-47.jpg","photo_2026-07-16_01-11-01.jpg","photo_2026-07-16_01-11-06.jpg",
  "photo_2026-07-16_01-11-12.jpg","photo_2026-07-16_01-11-17.jpg","photo_2026-07-16_01-11-22.jpg",
  "photo_2026-07-16_01-11-28.jpg","photo_2026-07-16_01-11-33.jpg","photo_2026-07-16_01-11-38.jpg",
  "photo_2026-07-16_01-11-43.jpg","photo_2026-07-16_01-11-48.jpg","photo_2026-07-16_01-11-54.jpg",
  "photo_2026-07-16_01-12-00.jpg","photo_2026-07-16_01-12-06.jpg","photo_2026-07-16_01-12-11.jpg",
  "photo_2026-07-16_01-12-16.jpg","photo_2026-07-16_01-12-22.jpg","photo_2026-07-16_01-12-28.jpg",
  "photo_2026-07-16_01-12-34.jpg","photo_2026-07-16_01-12-42.jpg","photo_2026-07-16_01-12-47.jpg",
  "photo_2026-07-16_01-12-53.jpg","photo_2026-07-16_01-12-57.jpg","photo_2026-07-16_01-13-02.jpg",
  "photo_2026-07-16_01-13-07.jpg","photo_2026-07-16_01-13-13.jpg","photo_2026-07-16_01-13-19.jpg",
  "photo_2026-07-16_01-14-18.jpg","photo_2026-07-16_01-14-25.jpg",
].map((f) => `/rhino/${f}`);

const HANDMADE_IMAGES = [
  "photo_2026-07-15_18-37-11.jpg","photo_2026-07-15_18-37-23.jpg","photo_2026-07-15_18-37-44.jpg",
  "photo_2026-07-15_18-37-57.jpg","photo_2026-07-15_18-38-06.jpg","photo_2026-07-15_18-38-19.jpg",
  "photo_2026-07-15_18-38-29.jpg","photo_2026-07-15_18-38-40.jpg","photo_2026-07-15_18-39-01.jpg",
  "photo_2026-07-15_18-39-10.jpg","photo_2026-07-15_18-41-48.jpg","photo_2026-07-15_18-42-04.jpg",
  "photo_2026-07-15_18-42-17.jpg","photo_2026-07-15_18-42-21.jpg","photo_2026-07-15_18-42-27.jpg",
  "photo_2026-07-15_18-42-29.jpg","photo_2026-07-15_18-42-39.jpg","photo_2026-07-15_18-43-04.jpg",
  "photo_2026-07-16_00-35-12.jpg","photo_2026-07-16_01-02-20.jpg","photo_2026-07-16_01-02-37.jpg",
  "photo_2026-07-16_01-02-51.jpg",
].map((f) => `/handmade/${f}`);
const HANDMADE_HALF = Math.ceil(HANDMADE_IMAGES.length / 2);
const HAND_SKETCHES_IMAGES = HANDMADE_IMAGES.slice(0, HANDMADE_HALF);
const FINAL_PRODUCTS_IMAGES = HANDMADE_IMAGES.slice(HANDMADE_HALF);

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchStart.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        if (!touchStart.current) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = t.clientY - touchStart.current.y;
        if (Math.abs(dy) > 80 && Math.abs(dy) > Math.abs(dx)) onClose();
        else if (Math.abs(dx) > 60) (dx > 0 ? onPrev : onNext)();
        touchStart.current = null;
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-[lb-fade_180ms_ease-out]"
    >
      <button
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-[color:var(--gold)]/20 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 md:left-8 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-[color:var(--gold)]/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 md:right-8 grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-[color:var(--gold)]/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <img
        key={index}
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] object-contain rounded-md shadow-luxe animate-[lb-zoom_200ms_ease-out]"
      />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-24 py-20 md:py-28 transition-all duration-500 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          {eyebrow && (
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
          )}
          <h2 className="text-4xl md:text-5xl font-semibold text-gold">{title}</h2>
          <hr className="gold-divider mx-auto my-6" />
          {description && (
            <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function EmptySlot({ label, icon: Icon }: { label: string; icon: typeof Gem }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg card-gold bg-card">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[color:var(--sand)] to-[color:var(--cream)]">
        <Icon className="h-10 w-10 text-gold/70" strokeWidth={1.2} />
        <p className="px-4 text-center text-sm font-medium tracking-wide text-foreground/60">
          {label}
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60">Add image</p>
      </div>
    </div>
  );
}

function ImageCard({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg card-gold bg-card hover:[&]:card-gold-hover cursor-zoom-in"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </button>
  );
}

function GalleryGrid({
  prefix,
  icon,
  images = [],
  slots = 6,
}: {
  prefix: string;
  icon: typeof Gem;
  images?: string[];
  slots?: number;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const total = images.length > 0 ? images.length : slots;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: total }).map((_, i) =>
          images[i] ? (
            <ImageCard
              key={i}
              src={images[i]}
              alt={`${prefix} · Piece ${i + 1}`}
              onClick={() => setOpen(i)}
            />
          ) : (
            <EmptySlot key={i} label={`${prefix} · Piece ${i + 1}`} icon={icon} />
          ),
        )}
      </div>
      {open !== null && images.length > 0 && (
        <Lightbox
          images={images}
          index={open}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((v) => (v === null ? 0 : (v - 1 + images.length) % images.length))}
          onNext={() => setOpen((v) => (v === null ? 0 : (v + 1) % images.length))}
        />
      )}
    </>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--cream)]/90 backdrop-blur-md shadow-[0_1px_0_0_color-mix(in_oklab,var(--gold)_35%,transparent)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="font-display text-2xl font-semibold tracking-wide text-gold">
          Dalia&nbsp;Wael
        </a>
        <ul className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="relative text-sm text-foreground/80 hover:text-gold transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="lg:hidden text-gold"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
          </div>
        </button>
      </nav>
      {open && (
        <div className="lg:hidden bg-[color:var(--cream)] border-t border-[color:var(--gold)]/30">
          <ul className="flex flex-col p-4">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-foreground/80 hover:text-gold"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero pt-24"
    >
      <div className="absolute inset-0 opacity-25">
        <img
          src={heroMonogram.url}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1200}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--cream)] via-[color:var(--cream)]/70 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center w-full">
        <div className="reveal">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">Portfolio · 2026</p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gold leading-[0.95]">
            Dalia
            <br />
            Wael
          </h1>
          <hr className="gold-divider my-8" />
          <p className="text-lg md:text-xl text-foreground/85 font-medium">
            Metal Products &amp; Jewelry Designer
          </p>
          <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
            Passionate about continuous learning and professional development in jewelry &amp;
            metal design — crafting precision, elegance, and story into every piece.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#gallery"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-luxe transition-transform hover:scale-[1.03]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-gold hover:bg-[color:var(--gold)]/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
        <div className="hidden md:block relative">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-luxe border-2 border-[color:var(--gold)]/50">
            <img
              src={heroJewelry}
              alt="Luxury jewelry pieces"
              className="h-full w-full object-cover"
              width={1200}
              height={1500}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[color:var(--gold)]/40 rounded-lg -z-0" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <section
      id="about"
      ref={ref}
      className={`scroll-mt-24 py-20 md:py-28 bg-[color:var(--sand)]/50 transition-all duration-500 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-lg border-2 border-[color:var(--gold)]/50 shadow-luxe">
            <img
              src={aboutDalia.url}
              alt="Dalia Wael"
              loading="lazy"
              className="h-full w-full object-cover"
              width={900}
              height={1100}
            />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[color:var(--gold)] rounded-lg -z-0" />
        </div>
        <div className="md:col-span-3">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">About Me</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gold">A designer of detail</h2>
          <hr className="gold-divider my-6" />
          <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
            Passionate about continuous learning and professional development. Skilled in time
            management and prioritizing tasks efficiently, and consistently recognized for
            attention to detail and delivering high-quality results.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <InfoRow icon={GraduationCap} title="Education">
              Applied Arts — Department of Jewelry &amp; Metal Productions
            </InfoRow>
            <InfoRow icon={MapPin} title="Location">
              Banha, Qalyubia, Egypt
            </InfoRow>
            <InfoRow icon={Languages} title="Languages">
              Arabic (native), English, French
            </InfoRow>
            <InfoRow icon={Award} title="Achievements">
              NEBU Expo for Gold &amp; Jewelry · 26/11/2023
              <br />
              Summer Training — Military Factory · 16/7 – 3/8/2023
            </InfoRow>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Gem;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 grid h-11 w-11 place-items-center rounded-full bg-gradient-gold text-[color:var(--ink)]">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="font-display text-base font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function ExploreSection() {
  const [open, setOpen] = useState<number | null>(null);
  const images: string[] = []; // no images yet
  const cards = [
    {
      title: "Hand Sketches & Manual Design",
      desc: "Original pencil sketches, ideation, and manual craftsmanship — the origin of every piece.",
      icon: PenTool,
    },
    {
      title: "Final Products & Photography",
      desc: "Finished jewelry pieces captured in professional product photography.",
      icon: Camera,
    },
  ];
  return (
    <Section
      id="gallery"
      eyebrow="Explore More"
      title="Beyond the Screen"
      description="Where craft meets concept — hand-drawn ideation and the finished, photographed pieces."
    >
      <div className="grid md:grid-cols-2 gap-8">
        {cards.map((c, i) => {
          const Icon = c.icon;
          const hasImg = Boolean(images[i]);
          return (
            <div
              key={c.title}
              onClick={hasImg ? () => setOpen(i) : undefined}
              className={`group relative block overflow-hidden rounded-lg card-gold bg-card hover:[&]:card-gold-hover ${hasImg ? "cursor-zoom-in" : ""}`}
            >
              <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[color:var(--sand)] to-[color:var(--cream)] border-b border-[color:var(--gold)]/30">
                {hasImg ? (
                  <img src={images[i]} alt={c.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gold/70">
                    <Icon className="h-10 w-10" strokeWidth={1.2} />
                    <p className="text-[10px] uppercase tracking-[0.3em]">Add image</p>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-[color:var(--ink)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-gold transition-colors duration-200">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      {open !== null && images.length > 0 && (
        <Lightbox
          images={images}
          index={open}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen((v) => (v === null ? 0 : (v - 1 + images.length) % images.length))}
          onNext={() => setOpen((v) => (v === null ? 0 : (v + 1) % images.length))}
        />
      )}
    </Section>
  );
}

const SKILLS = [
  { label: "MS Office", icon: FileText },
  { label: "Adobe Suite", icon: Palette },
  { label: "AutoCAD", icon: Ruler },
  { label: "Rhino", icon: Box },
  { label: "Rhino Gold", icon: Diamond },
  { label: "Art CAM", icon: Sparkles },
];

function Contact() {
  const [fallback, setFallback] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = `Portfolio Contact - ${name}`;
    const body = `From: ${email}\n\n${message}`;
    const href = `mailto:daliaafifi70@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const start = Date.now();
    window.location.href = href;
    // Show fallback if no mail handler took over within ~1.2s
    window.setTimeout(() => {
      if (Date.now() - start < 3000 && document.visibilityState === "visible") {
        setFallback(true);
      }
    }, 1200);
  };
  return (
    <Section
      id="contact"
      eyebrow="Get in Touch"
      title="Contact"
      description="I'd love to hear about your project, collaboration, or opportunity."
    >
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <ContactLine icon={MapPin} label="Address">
            Banha, Qalyubia, Egypt
          </ContactLine>
          <ContactLine icon={Phone} label="Phone">
            <a href="tel:+201018312035" className="hover:text-gold transition-colors">
              +20 101 831 2035
            </a>
          </ContactLine>
          <ContactLine icon={Mail} label="Email">
            <a
              href="mailto:daliaafifi70@gmail.com"
              className="hover:text-gold transition-colors break-all"
            >
              daliaafifi70@gmail.com
            </a>
          </ContactLine>
          <div className="pt-4 flex gap-3">
            <a
              href="https://www.facebook.com/dalia.wael.9843"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-gradient-gold hover:text-[color:var(--ink)] transition-all"
            >
              <Facebook className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.instagram.com/dalia_wael_3/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-gradient-gold hover:text-[color:var(--ink)] transition-all"
            >
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-lg card-gold bg-card p-6 md:p-8 space-y-5">
          <Field label="Name" name="name" type="text" placeholder="Your full name" />
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-gold">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell me about your project…"
              className="w-full rounded-md border border-[color:var(--border)] bg-[color:var(--cream)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-[color:var(--ink)] shadow-luxe transition-transform hover:scale-[1.02]"
          >
            Send Message
          </button>
          {fallback && (
            <p className="text-xs text-muted-foreground text-center">
              No email app detected. Please email{" "}
              <a
                href="mailto:daliaafifi70@gmail.com"
                className="text-gold hover:underline break-all"
              >
                daliaafifi70@gmail.com
              </a>{" "}
              directly.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-gold">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-[color:var(--border)] bg-[color:var(--cream)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[color:var(--gold)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30 transition"
      />
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Gem;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 grid h-12 w-12 place-items-center rounded-full bg-gradient-gold text-[color:var(--ink)]">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-widest text-gold">{label}</p>
        <p className="mt-0.5 text-base text-foreground">{children}</p>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />

        <Section
          id="artcam"
          eyebrow="Software"
          title="Art CAM"
          description="Precision CNC carving and relief designs crafted using Art CAM software."
        >
          <GalleryGrid prefix="Art CAM" icon={Sparkles} images={ARTCAM_IMAGES} />
        </Section>

        <Section
          id="solidworks"
          eyebrow="Software"
          title="SolidWorks"
          description="3D modeling and technical design of metal products and components."
        >
          <GalleryGrid prefix="SolidWorks" icon={Box} images={SOLIDWORKS_IMAGES} />
        </Section>

        <Section
          id="3dmax"
          eyebrow="Software"
          title="3D Max"
          description="Photorealistic 3D rendering and visualization of jewelry and metal design concepts."
        >
          <GalleryGrid prefix="3D Max" icon={Layers} />
        </Section>

        <Section
          id="photoshop"
          eyebrow="Software"
          title="Photoshop"
          description="Digital editing, retouching, and creative visualization of jewelry and metal designs using Adobe Photoshop."
        >
          <GalleryGrid prefix="Photoshop" icon={Palette} />
        </Section>

        <Section
          id="rhino"
          eyebrow="Software"
          title="Rhino & Rhino Gold"
          description="Specialized jewelry CAD design and gold modeling using Rhino and Rhino Gold."
        >
          <GalleryGrid prefix="Rhino" icon={Diamond} />
        </Section>

        <ExploreSection />

        <Section
          id="skills"
          eyebrow="Toolkit"
          title="Skills"
          description="Software and tools I use daily to design, model, and communicate jewelry work."
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {SKILLS.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-3 rounded-lg card-gold bg-card p-6 hover:[&]:card-gold-hover"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-gold text-[color:var(--ink)] transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-foreground text-center">{label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Contact />
      </main>

      <footer className="border-t border-[color:var(--gold)]/40 bg-[color:var(--sand)]/60">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center">
          <hr className="gold-divider mx-auto mb-6" />
          <p className="text-sm text-muted-foreground">
            © 2026 Dalia Wael — Jewelry &amp; Metal Design Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}
