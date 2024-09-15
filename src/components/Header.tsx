import NextLink from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  const title = "thien k phan";

  return (
    <header className="flex justify-between w-full py-10 items-center">
      <NextLink href="/">
        <div className="font-medium text-blue-400 text-3xl">{title}</div>
      </NextLink>
      <ThemeSwitch />
    </header>
  );
}
