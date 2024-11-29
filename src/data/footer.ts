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
      { href: "#", label: "Tours" },
      { href: "#", label: "Guides" },
      { href: "#", label: "About Us" },
      { href: "#", label: "Contact Us" },
      { href: "#", label: "Editor Support" },
    ],
  },
  {
    id: "1",
    title: "Tour Categories",
    menus: [
      { href: "#", label: "Cultural Heritage" },
      { href: "#", label: "Wild Safari" },
      { href: "#", label: "Adventure & Eco" },
      { href: "#", label: "Tea Plantation" },
      { href: "#", label: "Coastal & Beach" },
    ],
  },
  {
    id: "2",
    title: "",
    menus: [
      { href: "#", label: "Ayurveda & Wellness" },
      { href: "#", label: "Cultural & Religious" },
      { href: "#", label: "Romantic Tours" },
    ],
  },
  {
    id: "3",
    title: "Informative",
    menus: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms and Conditions" },
      { href: "#", label: "Cookie Policy" },
    ],
  },
];
