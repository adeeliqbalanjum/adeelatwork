export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteConfig = {
  name: "Muhammad Adeel Iqbal",
  role: "WordPress Developer",
  email: "adeeliqbalajum@gmail.com",
  phone: "+92 305 4829714",
  whatsapp: "923054829714",
  linkedin: "https://linkedin.com/in/adeelatwork/",
  github: "https://github.com/adeeliqbalanjum",
  siteUrl: "https://adeeliqbalanjum.github.io/adeelatwork",
};

export function withBasePath(path: string) {
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalisedPath}`;
}

export const cvUrl = withBasePath("/cv");
