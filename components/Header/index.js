import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useDisclosure,
  useColorModeValue,
  Text,
  VStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const navItems = [
  { label: "Products", page: "/ads", isExternal: false },
  { label: "Docs", page: "https://docs.seshatlabs.xyz", isExternal: true },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const { user } = useUser();

  const menuItems = (
    <>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            as={NextLink}
            href={navItem.page ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
            onClick={() => {
              if (navItem.isExternal) {
                window.location.href = navItem.page;
              }
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </>
  );

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"flex-start"}
      >
        <Box>
          <Link as={NextLink} href="/">
            <Text
              fontSize="lg"
              fontWeight="bold"
              paddingLeft={{ base: "0", md: "100px" }}
            >
              Seshat
            </Text>
          </Link>
        </Box>
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <HStack spacing={4} paddingRight={"100px"}>
            {menuItems}
          </HStack>
        </Flex>
        <Spacer />
        <Link as={NextLink} href="/profile">
          <Button variant="outline" colorScheme="blue">
            {user ? "Profile" : "Let's start"}
          </Button>
        </Link>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label="Open menu"
            size="lg"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
          />
        </Box>
      </Flex>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        position={{ base: "absolute", md: "static" }}
        top={{ base: "60px", md: "0" }}
        left={{ base: 0, md: "auto" }}
        right={{ base: 0, md: 0 }}
        width={{ base: "full", md: "auto" }}
        mt={{ base: 4, md: 0 }}
        py={{ base: 4 }}
        px={{ base: 4, md: 0 }}
        zIndex={9999}
      >
        <Box display={{ base: "flex", md: "none" }} justifyContent="flex-end">
          <IconButton
            size="md"
            aria-label="Close menu"
            icon={<CloseIcon />}
            onClick={onClose}
            variant="ghost"
          />
        </Box>
        <VStack spacing={4}>{menuItems}</VStack>
      </Box>
    </Box>
  );
};

export default Navbar;
