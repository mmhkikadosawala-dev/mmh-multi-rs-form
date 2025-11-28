// src/features/Planning/components/StepWallDimensions.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Image,
  SimpleGrid,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { FaHome, FaDoorClosed } from "react-icons/fa";

import wallDimentions4inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions4inch.png";
import wallDimentions5inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions5inch.png";
import wallDimentions6inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions6inch.png";
import wallDimentions8inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions8inch.png";
import wallDimentions9inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions9inch.png";
import wallDimentions10inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions10inch.png";

const externalWallOptions = [
  { value: "4", image: wallDimentions4inch, label: "4\"", fullLabel: "4 inches" },
  { value: "5", image: wallDimentions5inch, label: "5\"", fullLabel: "5 inches" },
  { value: "6", image: wallDimentions6inch, label: "6\"", fullLabel: "6 inches" },
  { value: "8", image: wallDimentions8inch, label: "8\"", fullLabel: "8 inches" },
  { value: "9", image: wallDimentions9inch, label: "9\"", fullLabel: "9 inches" },
  { value: "10", image: wallDimentions10inch, label: "10\"", fullLabel: "10 inches" },
];

const internalWallOptions = [
  { value: "4", image: wallDimentions4inch, label: "4\"", fullLabel: "4 inches" },
  { value: "5", image: wallDimentions5inch, label: "5\"", fullLabel: "5 inches" },
  { value: "6", image: wallDimentions6inch, label: "6\"", fullLabel: "6 inches" },
];

export default function StepWallDimensions({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const externalWall = formData?.externalWallThickness ?? "";
  const internalWall = formData?.internalWallThickness ?? "";

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (isLastStep) onSubmit();
    else onNext();
  };

  return (
    <Box
      h="600px"
      w="100%"
      maxW="400px"
      mx="auto"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px={4}
      py={6}
    >
      {/* Scrollable Content Area */}
      <Box
        flex="1"
        overflowY="auto"
        overflowX="hidden"
        pr={2}
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a0aec0",
          },
        }}
      >
        <VStack spacing={5} align="stretch">
          {/* Heading */}
          <Box textAlign="center">
            <Text fontWeight="700" color="gray.800" fontSize="18px" mb={1}>
              Wall Dimensions
            </Text>
            <Text fontSize="13px" color="gray.500">
              Select wall thickness for external and internal walls
            </Text>
          </Box>

          {/* External Wall Thickness Section */}
          <Box
            bg="white"
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
            position="relative"
            overflow="hidden"
          >
            {/* Decorative gradient */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="4px"
              bgGradient="linear(to-r, green.400, teal.400)"
            />

            <Flex align="center" justify="space-between" mb={3}>
              <Flex align="center" gap={2}>
                <Box
                  bg="green.100"
                  p={2}
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaHome} color="green.600" boxSize="16px" />
                </Box>
                <Text fontWeight="600" fontSize="15px" color="gray.700">
                  External Wall
                </Text>
              </Flex>
              {externalWall && (
                <Badge colorScheme="green" fontSize="11px" borderRadius="full" px={2}>
                  {externalWall}" Selected
                </Badge>
              )}
            </Flex>

            <SimpleGrid columns={3} spacing={2}>
              {externalWallOptions.map((option) => (
                <Box
                  key={`external-${option.value}`}
                  onClick={() => handleChange("externalWallThickness", option.value)}
                  cursor="pointer"
                  position="relative"
                  border="2px solid"
                  borderColor={externalWall === option.value ? "green.500" : "gray.200"}
                  bg={externalWall === option.value ? "green.50" : "white"}
                  borderRadius="12px"
                  p={2}
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "green.400",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {externalWall === option.value && (
                    <Box
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="green.500"
                      color="white"
                      borderRadius="full"
                      w="20px"
                      h="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      ✓
                    </Box>
                  )}
                  <Image
                    src={option.image}
                    alt={option.fullLabel}
                    width="100%"
                    height="60px"
                    objectFit="contain"
                    mb={2}
                  />
                  <Text
                    textAlign="center"
                    fontSize="13px"
                    fontWeight="700"
                    color={externalWall === option.value ? "green.700" : "gray.700"}
                  >
                    {option.label}
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize="9px"
                    fontWeight="500"
                    color={externalWall === option.value ? "green.600" : "gray.500"}
                  >
                    {option.fullLabel}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Internal Wall Thickness Section */}
          <Box
            bg="white"
            borderRadius="16px"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            boxShadow="0 2px 8px rgba(0,0,0,0.04)"
            position="relative"
            overflow="hidden"
          >
            {/* Decorative gradient */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="4px"
              bgGradient="linear(to-r, blue.400, purple.400)"
            />

            <Flex align="center" justify="space-between" mb={3}>
              <Flex align="center" gap={2}>
                <Box
                  bg="blue.100"
                  p={2}
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={FaDoorClosed} color="blue.600" boxSize="16px" />
                </Box>
                <Text fontWeight="600" fontSize="15px" color="gray.700">
                  Internal Wall
                </Text>
              </Flex>
              {internalWall && (
                <Badge colorScheme="blue" fontSize="11px" borderRadius="full" px={2}>
                  {internalWall}" Selected
                </Badge>
              )}
            </Flex>

            <SimpleGrid columns={3} spacing={2}>
              {internalWallOptions.map((option) => (
                <Box
                  key={`internal-${option.value}`}
                  onClick={() => handleChange("internalWallThickness", option.value)}
                  cursor="pointer"
                  position="relative"
                  border="2px solid"
                  borderColor={internalWall === option.value ? "blue.500" : "gray.200"}
                  bg={internalWall === option.value ? "blue.50" : "white"}
                  borderRadius="12px"
                  p={2}
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "blue.400",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  {internalWall === option.value && (
                    <Box
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="blue.500"
                      color="white"
                      borderRadius="full"
                      w="20px"
                      h="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      ✓
                    </Box>
                  )}
                  <Image
                    src={option.image}
                    alt={option.fullLabel}
                    width="100%"
                    height="60px"
                    objectFit="contain"
                    mb={2}
                  />
                  <Text
                    textAlign="center"
                    fontSize="13px"
                    fontWeight="700"
                    color={internalWall === option.value ? "blue.700" : "gray.700"}
                  >
                    {option.label}
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize="9px"
                    fontWeight="500"
                    color={internalWall === option.value ? "blue.600" : "gray.500"}
                  >
                    {option.fullLabel}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>

      {/* Fixed Navigation Buttons */}
      <Flex justify="space-between" gap={3} mt={4} flexShrink={0}>
        <Button
          onClick={onBack}
          variant="solid"
          bg="white"
          color="cyan.600"
          border="1px solid"
          borderColor="cyan.500"
          borderRadius="8px"
          minW="100px"
          h="42px"
          fontWeight="600"
          fontSize="14px"
          _hover={{
            bg: "cyan.50",
            borderColor: "cyan.600",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          transition="all 0.2s ease"
        >
          ← Previous
        </Button>

        <Button
          onClick={handleNext}
          isDisabled={!externalWall || !internalWall}
          variant="solid"
          bg="cyan.500"
          color="white"
          border="none"
          borderRadius="8px"
          minW="100px"
          h="42px"
          fontWeight="600"
          fontSize="14px"
          ml="auto"
          _hover={{
            bg: "cyan.600",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(6, 182, 212, 0.3)",
          }}
          _disabled={{
            bg: "gray.300",
            color: "gray.500",
            cursor: "not-allowed",
            transform: "none",
          }}
          transition="all 0.2s ease"
        >
          {isLastStep ? "Submit" : "Next →"}
        </Button>
      </Flex>
    </Box>
  );
}
