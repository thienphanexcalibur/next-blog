import Image from "next/image";
import NextLink from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import classNames from "classnames";

const commonCls = "w-[100px] h-[50px]";

export default function Header() {
  return (
    <header className="flex justify-between w-full py-5 items-center mt-4">
      <NextLink href="/" className="relative">
        <Image
          src="/signature-light.png"
          alt="signature"
          width={100}
          height={50}
          className={classNames(commonCls, "dark:hidden block")}
        />
        <Image
          src="/signature-dark.png"
          alt="signature"
          width={100}
          height={50}
          className={classNames(commonCls, "dark:block hidden")}
        />
      </NextLink>
      <ThemeSwitch />
    </header>
  );
}
