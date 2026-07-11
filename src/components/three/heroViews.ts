export type HeroViewId = "overview" | "laptop" | "lamp" | "phone" | "frame" | "chair";

export interface HeroView {
  id: HeroViewId;
  /** Short name shown on the view chips */
  label: string;
  /** FontAwesome icon class for the chip */
  icon: string;
  /** Headline shown on the caption card when this view is focused */
  title: string;
  blurb: string;
  cta?: { label: string; to: string };
  /** Camera fly-to position */
  camera: [number, number, number];
  /** OrbitControls look-at target */
  target: [number, number, number];
}

export const HERO_VIEWS: HeroView[] = [
  {
    id: "overview",
    label: "Overview",
    icon: "fa-solid fa-cube",
    title: "My digital workspace",
    blurb: "Drag to orbit around the desk, or click a glowing object to zoom in.",
    camera: [10.5, 7.2, 14],
    target: [0, 3.1, 0],
  },
  {
    id: "laptop",
    label: "Laptop",
    icon: "fa-solid fa-laptop-code",
    title: "Where the code happens",
    blurb: "From static pages to full-stack apps — everything I build starts on this screen.",
    cta: { label: "View my projects", to: "/projects" },
    camera: [2.6, 7.4, 4.9],
    target: [0.4, 6.3, 0.1],
  },
  {
    id: "lamp",
    label: "Lamp",
    icon: "fa-solid fa-lightbulb",
    title: "Ideas, switched on",
    blurb: "Always learning something new — languages, frameworks and problem solving.",
    cta: { label: "See my skills", to: "/#skills" },
    camera: [-6.2, 8.6, 2.8],
    target: [-2.5, 7.0, -1.5],
  },
  {
    id: "phone",
    label: "Phone",
    icon: "fa-solid fa-mobile-screen",
    title: "Always reachable",
    blurb: "Have a project in mind or just want to say hi? My inbox is open.",
    cta: { label: "Contact me", to: "/contact" },
    camera: [5.7, 7.5, 1.8],
    target: [2.85, 6.2, -1.7],
  },
  {
    id: "frame",
    label: "Wall art",
    icon: "fa-solid fa-image",
    title: "A bit about me",
    blurb: "Software Engineering student at BINUS University who loves building for the web.",
    cta: { label: "About me", to: "/#about" },
    camera: [2.8, 8.4, 1.8],
    target: [1.6, 7.9, -4.2],
  },
  {
    id: "chair",
    label: "Chair",
    icon: "fa-solid fa-chair",
    title: "Take a seat",
    blurb: "Bootcamps, organizations and volunteering — the journey so far.",
    cta: { label: "My experience", to: "/#skills" },
    camera: [-7.8, 5.4, 9.4],
    target: [-1.6, 2.6, 3.2],
  },
];

export const getHeroView = (id: HeroViewId): HeroView =>
  HERO_VIEWS.find((v) => v.id === id) ?? HERO_VIEWS[0];
