import {
    Box,
    Flex,
    HStack,
    IconButton,
    Link,
    useDisclosure,
    useColorModeValue,
    Stack,
    Text,
    Button,
    VStack,
  } from '@chakra-ui/react';
  import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
  
  const navItems = [
    { label: 'Build Campaign', page: '/ads', isExternal: false},
    { label: 'Documents', page: 'https://docs.seshatlabs.xyz', isExternal: true },
    { label: 'Profile', page: '/profile', isExternal: false },
  ];
  
  const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const menuItems = (
      <>
        {navItems.map((navItem) => (
          <Box key={navItem.label}>
            <Link
              href={navItem.page ?? '#'}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
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
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          justify={'space-between'}
        >
          <Box>
          <Link href="https://www.seshatlabs.xyz" isExternal>
            <Text fontSize="lg" fontWeight="bold" paddingLeft={{base: '0', md: '100px'}}> 
              Seshat Labs
            </Text>
            </Link>
          </Box>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <HStack spacing={4} paddingRight={'100px'}>{menuItems}</HStack>
          </Flex>
          <Box display={{ base: 'block', md: 'none' }}>
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
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
          position={{ base: 'absolute', md: 'static' }}
          top={{ base: '60px', md: '0' }}
          left={{ base: 0, md: 'auto' }}
          right={{ base: 0, md: 0 }}
          width={{ base: 'full', md: 'auto' }}
          mt={{ base: 4, md: 0 }}
          py={{ base: 4 }}
          px={{ base: 4, md: 0 }}
          zIndex={9999}
        >
          <Box display={{ base: 'flex', md: 'none' }} justifyContent="flex-end">
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
