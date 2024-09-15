import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const socials = [
  {
    icon: LinkedInLogoIcon,
    href: "https://www.linkedin.com/in/phankhanhthien/",
  },
  {
    icon: GitHubLogoIcon,
    href: "https://github.com/thienphanexcalibur",
  },
];

export default function Footer() {
  return (
    <footer className="w-full flex justify-between py-5 mt-10 gap-5">
      <div className="text-sm font-semibold">
        © {new Date().getFullYear()}, Thien K. Phan
      </div>
      <div className="flex gap-2">
        {socials.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="cursor-pointer size-4"
          >
            {<item.icon />}
          </Link>
        ))}
      </div>
    </footer>
  );
}
