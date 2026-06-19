"use client";

import { usePathname } from "next/navigation";
import { HomeTestimonials } from "./HomeTestimonials";

export function HomeTestimonialsMount() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return <HomeTestimonials />;
}
