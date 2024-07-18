import { Route } from "./router";

export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}