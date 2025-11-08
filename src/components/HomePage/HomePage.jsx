import { Link as RouterLink } from "react-router-dom";
import {
  FaRegBuilding,
  FaPencilRuler,
  FaCubes,
  FaUsersCog,
  FaCouch,
  FaListAlt,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import {
  Box,
  Flex,
  Text,
  Icon,
  Link,
  useColorModeValue,
  Circle,
} from "@chakra-ui/react";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Planning",
      icon: FaPencilRuler,
      color: "orange.500",
      bg: "orange.50",
      iconBg: "orange.100",
      link: "/planning",
    },
    {
      name: "Structure",
      icon: FaRegBuilding,
      color: "blue.500",
      bg: "blue.50",
      iconBg: "blue.100",
      link: "/structure",
    },
    {
      name: "Elevation",
      icon: FaCubes,
      color: "cyan.500",
      bg: "cyan.50",
      iconBg: "cyan.100",
      link: "/elevation",
    },
    {
      name: "MEP Team",
      icon: FaUsersCog,
      color: "blue.500",
      bg: "orange.50",
      iconBg: "orange.100",
      link: "/mep",
    },
    {
      name: "Interior Team",
      icon: FaCouch,
      color: "green.500",
      bg: "yellow.50",
      iconBg: "yellow.100",
      link: "/interior",
    },
    {
      name: "BBS / BOQ",
      icon: FaListAlt,
      color: "blue.500",
      bg: "purple.50",
      iconBg: "purple.100",
      link: "/bbs",
    },
  ];

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box
        w="320px"
        bg={useColorModeValue("gray.50", "gray.800")}
        px={4}
        py={6}
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
      >
        <Flex direction="column" gap={4} flex="1">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              as={RouterLink}
              to={item.link}
              _hover={{
                textDecoration: "none",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              transition="all 0.2s ease"
            >
              <Flex
                align="center"
                p={4}
                bg={item.bg}
                minH="70px"
                borderRadius="16px"
                justify="space-between"
                border="1px solid"
                borderColor="transparent"
                _hover={{
                  borderColor: "gray.200",
                }}
              >
                <Flex align="center" gap={4}>
                  <Circle
                    bg={item.iconBg}
                    size="44px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={item.icon} w={5} h={5} color={item.color} />
                  </Circle>
                  <Text
                    fontWeight="600"
                    fontSize="16px"
                    color="gray.700"
                    letterSpacing="-0.01em"
                  >
                    {item.name}
                  </Text>
                </Flex>
                <Icon
                  as={MdOutlineKeyboardArrowRight}
                  w={5}
                  h={5}
                  color="gray.400"
                />
              </Flex>
            </Link>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
