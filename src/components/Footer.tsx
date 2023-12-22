"use client";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { Linkedin, Github, Facebook } from "@geist-ui/react-icons";

export default function Footer() {
  return (
    <VStack width="100%" justifyContent="space-between" py={5} gap={5}>
      <Text
        color="gray.800"
        fontSize="sm"
        fontWeight={500}
        _dark={{ color: "gray.100" }}
      >
        © {new Date().getFullYear()}, Thien K. Phan
      </Text>
      <HStack>
        <Linkedin
          onClick={() =>
            window.open("https://www.linkedin.com/in/phankhanhthien/")
          }
          size={16}
          cursor="pointer"
        />
        <Github
          onClick={() => window.open("https://www.facebook.com/ThienFoster")}
          size={16}
          cursor="pointer"
        />
        <Facebook
          onClick={() => window.open("https://github.com/thienphanexcalibur")}
          size={16}
          cursor="pointer"
        />
      </HStack>
    </VStack>
  );
}
