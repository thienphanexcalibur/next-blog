import dayjs from "dayjs";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  LinkBox,
  Link,
  Text,
  Img,
  LinkOverlay,
} from "@chakra-ui/react";
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
    <LinkBox>
      <Card
        borderRadius="12px 12px 0 0 "
        shadow="none"
        _dark={{ borderColor: "gray.700" }}
      >
        <CardBody p={0} height="200px" flex={0}>
          <Box width="100%" height="200px" position="relative">
            {cover && (
              <Image
                src={cover}
                fill={true}
                alt={title ?? ""}
                style={{
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            )}
          </Box>
          <Flex
            flexDir="column"
            justify="flex-end"
            alignItems="flex-start"
            gap={1}
            position="absolute"
            bottom={0}
            left={0}
            px="16px"
            py="20px"
            width="100%"
            height="70%"
            borderRadius="12px"
            background="linear-gradient(
						to top,
						rgba(0, 0, 0, 0.7),
						transparent
					)"
            // _after={{
            //   backgroundColor: "red",
            //   width: "100%",
            //   height: "100%",
            //   position: "absolute",
            //   zIndex: -1,
            //   borderRadius: "16px",
            //   content: '""',
            // }}
          >
            <Text fontSize="xs" p={0} m={0} color="white" fontWeight={700}>
              {dayjs(createdTime).format("YYYY-MM-DD")}
            </Text>
            <LinkOverlay as={NextLink} href={href}>
              <Text fontWeight={600} color="white">{title}</Text>
            </LinkOverlay>
            <Box
              position="absolute"
              bg="transparent"
              width="20px"
              height="20px"
              bottom={0}
              left={0}
            ></Box>
            {/* {description && <Text>{description}</Text>} */}
          </Flex>
        </CardBody>
      </Card>
    </LinkBox>
  );
};

export default NotionPost;
