import { NavItemType } from "@/components/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const NAVIGATION: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/tours",
    name: "Tours",
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Guides",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "About"
  },

  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact"
  },
];
