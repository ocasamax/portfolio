export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  description?: string;
  images?: string[];
}

export interface Category {
  slug: string;
  title: string;
  subtitle?: string;
  images: ProjectImage[];
}

const placeholder = "/placeholder.svg";

export const categories: Category[] = [
  {
    slug: "ui-design",
    title: "UI Design",
    subtitle: "Interface design for web and mobile applications",
    images: [
      {
        id: "ui-zellsy",
        src: "/proyectos/ui-design/zellsy-portada.webp",
        alt: "Zellsy UI design project",
        caption: "Zellsy",
        images: ["/proyectos/ui-design/zellsy-img.webp"],
      },
      ...Array.from({ length: 13 }, (_, i) => ({
        id: `ui-${i + 2}`,
        src: placeholder,
        alt: `UI Design project ${i + 2}`,
        caption: `Project ${i + 2}`,
      })),
    ],
  },
  {
    slug: "social-media",
    title: "Social Media",
    subtitle: "Visual content for digital platforms",
    images: Array.from({ length: 16 }, (_, i) => ({
      id: `social-${i + 1}`,
      src: placeholder,
      alt: `Social Media project ${i + 1}`,
      caption: `Campaign ${i + 1}`,
    })),
  },
  {
    slug: "branding",
    title: "Branding",
    subtitle: "Identity systems and brand guidelines",
    images: [
      {
        id: "brand-bortyxgeek",
        src: "/proyectos/Branding/bortyxgeek-portada.jpg",
        alt: "Bortyx Geek branding project",
        caption: "Bortyx Geek",
        images: ["/proyectos/Branding/bortyxgeek-img.webp"],
      },
      ...Array.from({ length: 14 }, (_, i) => ({
        id: `brand-${i + 2}`,
        src: placeholder,
        alt: `Branding project ${i + 2}`,
        caption: `Brand ${i + 2}`,
      })),
    ],
  },
  {
    slug: "web",
    title: "Web",
    subtitle: "Website design and development",
    images: Array.from({ length: 18 }, (_, i) => ({
      id: `web-${i + 1}`,
      src: placeholder,
      alt: `Web project ${i + 1}`,
      caption: `Website ${i + 1}`,
    })),
  },
];
