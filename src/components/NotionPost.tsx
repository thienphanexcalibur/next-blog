import Image from "next/image";
import { default as NextLink } from "next/link";

const NotionPost = ({
  title,
  cover,
  href,
  createdTime,
}: {
  title: string | null;
  cover: string | null;
  href: string;
  createdTime?: number | null;
}) => {
  return (
    <NextLink href={href} className="relative">
      <div className="w-full h-[200px]">
        {cover && (
          <Image
            src={cover}
            fill={true}
            alt={title ?? ""}
            className="object-cover rounded-2xl"
          />
        )}
      </div>
      <div className="flex flex-col justify-end items-start gap-1 absolute bottom-0 left-0 px-4 py-5 w-full h-[70%] rounded-2xl bg-gradient-to-t from-black/85 to-transparent">
        <div className="font-bold text-sm text-white shadow-sm">{title}</div>
        <div className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-transparent"></div>
        {/* {description && <Text>{description}</Text>} */}
      </div>
    </NextLink>
  );
};

export default NotionPost;
