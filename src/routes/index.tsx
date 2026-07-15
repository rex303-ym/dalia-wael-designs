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
  Linkedin,
  Instagram,
  ArrowRight,
  PenTool,
  Camera,
  Award,
  GraduationCap,
  Languages,
} from "lucide-react";
import heroJewelry from "@/assets/hero-jewelry.jpg";
import aboutPortrait from "@/assets/about-portrait.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#artcam", label: "Art CAM" },
  { href: "#solidworks", label: "SolidWorks" },
  { href: "#3dmax", label: "3D Max" },
  { href: "#rhino", label: "Rhino & Rhino Gold" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

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
      className={`scroll-mt-24 py-20 md:py-28 transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
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

function PlaceholderCard({ label, icon: Icon }: { label: string; icon: typeof Gem }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg card-gold bg-card hover:[&]:card-gold-hover">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[color:var(--sand)] to-[color:var(--cream)] transition-transform duration-500 group-hover:scale-105">
        <Icon className="h-10 w-10 text-gold" strokeWidth={1.2} />
        <p className="px-4 text-center text-sm font-medium tracking-wide text-foreground/70">
          {label}
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold/70">Add image</p>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_center,color-mix(in_oklab,var(--gold)_18%,transparent),transparent_70%)]" />
    </div>
  );
}

function GalleryGrid({ prefix, icon }: { prefix: string; icon: typeof Gem }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PlaceholderCard key={i} label={`${prefix} · Piece ${i + 1}`} icon={icon} />
      ))}
    </div>
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
        <a
          href="#home"
          className="font-display text-2xl font-semibold tracking-wide text-gold"
        >
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
          src={heroJewelry}
          alt=""
          className="h-full w-full object-cover"
          width={1920}
          height={1200}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--cream)] via-[color:var(--cream)]/70 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center w-full">
        <div className="reveal">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">Portfolio · 2025</p>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold text-gold leading-[0.95]">
            Dalia
            <br />
            Wael
          </h1>
          <hr className="gold-divider my-8" />
          <p className="text-lg md:text-xl text-foreground/85 font-medium">
            Metal Products &amp; Jewelry Designer Student
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
      className={`scroll-mt-24 py-20 md:py-28 bg-[color:var(--sand)]/50 transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-5 gap-12 items-center">
        <div className="md:col-span-2 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-lg border-2 border-[color:var(--gold)]/50 shadow-luxe">
            <img
              src={aboutPortrait}
              alt="Dalia Wael's work"
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

function ExploreCard({
  title,
  desc,
  img,
  icon: Icon,
}: {
  title: string;
  desc: string;
  img: string;
  icon: typeof Gem;
}) {
  return (
    <a
      href="#gallery"
      className="group relative block overflow-hidden rounded-lg card-gold bg-card hover:[&]:card-gold-hover"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={1200}
          height={900}
        />
      </div>
      <div className="p-6 md:p-8">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-[color:var(--ink)]">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold">
          Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </a>
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
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.currentTarget as HTMLFormElement).reset();
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
              href="#"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-gradient-gold hover:text-[color:var(--ink)] transition-all"
            >
              <Linkedin className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)] text-gold hover:bg-gradient-gold hover:text-[color:var(--ink)] transition-all"
            >
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-lg card-gold bg-card p-6 md:p-8 space-y-5"
        >
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
            {sent ? "Message Sent ✓" : "Send Message"}
          </button>
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
          <GalleryGrid prefix="Art CAM" icon={Sparkles} />
        </Section>

        <Section
          id="solidworks"
          eyebrow="Software"
          title="SolidWorks"
          description="3D modeling and technical design of jewelry pieces and metal components."
        >
          <GalleryGrid prefix="SolidWorks" icon={Box} />
        </Section>

        <Section
          id="3dmax"
          eyebrow="Software"
          title="3D Max"
          description="Photorealistic 3D rendering and visualization of jewelry concepts."
        >
          <GalleryGrid prefix="3D Max" icon={Layers} />
        </Section>

        <Section
          id="rhino"
          eyebrow="Software"
          title="Rhino & Rhino Gold"
          description="Specialized jewelry CAD design and gold modeling using Rhino and Rhino Gold."
        >
          <GalleryGrid prefix="Rhino" icon={Diamond} />
        </Section>

        <Section
          id="gallery"
          eyebrow="Explore More"
          title="Beyond the Screen"
          description="Where craft meets concept — hand-drawn ideation and the finished, photographed pieces."
        >
          <div className="grid md:grid-cols-2 gap-8">
            <ExploreCard
              title="Hand Sketches & Manual Design"
              desc="Original pencil sketches, ideation, and manual craftsmanship — the origin of every piece."
              img={handSketches}
              icon={PenTool}
            />
            <ExploreCard
              title="Final Products & Photography"
              desc="Finished jewelry pieces captured in professional product photography."
              img={finalProducts}
              icon={Camera}
            />
          </div>
        </Section>

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
            © 2025 Dalia Wael — Jewelry &amp; Metal Design Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
}
