import Link from 'next/link'
import {
  Container,
  Heading,
  IconButton,
  Text,
  Flex,
  useColorMode,
  Box,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex alignItems="center" justifyContent="space-between" my={5}>
      <Heading fontSize="sm">
        <Link
          href="/"
        >
          {title}
        </Link>
      </Heading>
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  )
}

const Layout = ({ children }) => {
  const title = "thien k phan";

  return (
    <Container my={5} overflowX="hidden">
      <Header title={title} />
      {children}
      <Box mt={1}>
        <Text
          textAlign="left"
          fontWeight="700"
          fontSize="sm"
          colorScheme="gray"
        >
          © {new Date().getFullYear()}, Thien K. Phan
        </Text>
      </Box>
    </Container>
  );
};

export default Layout
