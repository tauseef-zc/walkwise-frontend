import { CustomLink } from "@/types/footer";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

export const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Site Map",
    menus: [
      { href: "/tours", label: "Tours" },
      { href: "/guides", label: "Guides" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    id: "1",
    title: "Tour Categories",
    menus: [
      {
        href: "/tours/cultural-heritage",
        label: "Cultural Heritage",
      },
      { href: "/tours/wildlife-safari", label: "Wild Safari" },
      { href: "/tours/adventure-and-eco", label: "Adventure & Eco" },
      { href: "/tours/tea-plantation", label: "Tea Plantation" },
      { href: "/tours/coastal-beach", label: "Coastal & Beach" },
    ],
  },
  {
    id: "2",
    title: "",
    menus: [
      { href: "/tours/ayurveda-and-wellness", label: "Ayurveda & Wellness" },
      { href: "/tours/cultural-religious", label: "Cultural & Religious" },
      { href: "/tours/romantic-tours", label: "Romantic Tours" },
    ],
  },
  {
    id: "3",
    title: "Informative",
    menus: [
      { href: "/tours/", label: "Privacy Policy" },
      { href: "/tours/", label: "Terms and Conditions" },
      { href: "/tours/", label: "Cookie Policy" },
    ],
  },
];
