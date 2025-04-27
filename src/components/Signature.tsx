import Image from "next/image";
import classNames from "classnames";

const commonCls = "w-[100px] h-[25px]";

export default function Header() {
  return (
    <>
      <Image
        src="/signature-light.png"
        alt="signature"
        width={100}
        height={25}
        className={classNames(commonCls, "dark:hidden block")}
      />
      <Image
        src="/signature-dark.png"
        alt="signature"
        width={100}
        height={25}
        className={classNames(commonCls, "dark:block hidden")}
      />
    </>
  );
}
