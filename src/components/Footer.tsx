import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

import Link from "next/link";

const socials = [
  {
    icon: LinkedInLogoIcon,
    href: "https://www.linkedin.com/in/phankhanhthien/",
    label: "LinkedIn",
  },
  {
    icon: GitHubLogoIcon,
    href: "https://github.com/thienphanexcalibur",
    label: "GitHub",
  },
];

export default function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center py-5 mt-10 gap-5 mb-6">
      <div className="text-sm font-semibold">
        © {new Date().getFullYear()}, Thien K. Phan
      </div>
      <div className="flex gap-2">
        {socials.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className="cursor-pointer size-4 hover:opacity-70 transition-opacity"
          >
            <item.icon aria-hidden="true" />
          </Link>
        ))}
      </div>
    </footer>
  );
}
