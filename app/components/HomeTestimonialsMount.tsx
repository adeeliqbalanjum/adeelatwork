"use client";

import { usePathname } from "next/navigation";
import { HomeTestimonials } from "./HomeTestimonials";

export function HomeTestimonialsMount() {
  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/\/$/, "") || "/";

  if (normalizedPathname !== "/" && normalizedPathname !== "/adeelatwork") return null;

  return <HomeTestimonials />;
}
