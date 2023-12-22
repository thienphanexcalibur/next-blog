"use client";
import NextLink from "next/link";
import { HStack, IconButton, Link, Text, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const title = "thien k phan";

  return (
    <HStack justifyContent="space-between" py={10}>
      <Link
        as={NextLink}
        href="/"
        fontSize="3xl"
        color="blue.700"
        textDecoration="none"
        _hover={{ textDecor: "none" }}
      >
        <Text color="blue.500" _dark={{ color: "blue.400" }} fontWeight={500}>
          {title}
        </Text>
      </Link>
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        aria-label="colormode"
        onClick={toggleColorMode}
      />
    </HStack>
  );
}
