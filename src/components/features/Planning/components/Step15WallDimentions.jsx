// src/features/Planning/components/StepWallDimensions.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";

import wallDimentions4inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions4inch.png";
import wallDimentions5inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions5inch.png";
import wallDimentions6inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions6inch.png";
import wallDimentions8inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions8inch.png";
import wallDimentions9inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions9inch.png";
import wallDimentions10inch from "../../../../assets/Planning/WallDimentions/walldimentionsimages/wallDimentions10inch.png";

const wallOptions = [
  { value: "4", image: wallDimentions4inch, label: "4 inches" },
  { value: "5", image: wallDimentions5inch, label: "5 inches" },
  { value: "6", image: wallDimentions6inch, label: "6 inches" },
  { value: "8", image: wallDimentions8inch, label: "8 inches" },
  { value: "9", image: wallDimentions9inch, label: "9 inches" },
  { value: "10", image: wallDimentions10inch, label: "10 inches" },
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
        <VStack spacing={4} align="stretch">
          {/* Heading */}
          <Text fontWeight="600" color="gray.700" fontSize="16px" mb={0} letterSpacing="-0.01em">
            Wall Dimensions
          </Text>

          {/* External Wall Thickness Selection */}
          <Box>
            <Text fontWeight="600" fontSize="14px" mb={3} color="gray.700">
              External Wall Thickness
            </Text>
            <SimpleGrid columns={3} spacing={3}>
              {wallOptions.map((option) => (
                <Box
                  key={`external-${option.value}`}
                  onClick={() => handleChange("externalWallThickness", option.value)}
                  cursor="pointer"
                  border="2px solid"
                  borderColor={externalWall === option.value ? "cyan.500" : "gray.200"}
                  bg={externalWall === option.value ? "cyan.50" : "white"}
                  borderRadius="10px"
                  p={2}
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "cyan.400",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src={option.image}
                    alt={option.label}
                    width="100%"
                    height="80px"
                    objectFit="contain"
                    mb={1}
                  />
                  <Text
                    textAlign="center"
                    fontSize="12px"
                    fontWeight="600"
                    color={externalWall === option.value ? "cyan.700" : "gray.600"}
                  >
                    {option.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Internal Wall Thickness Selection */}
          <Box>
            <Text fontWeight="600" fontSize="14px" mb={3} color="gray.700">
              Internal Wall Thickness
            </Text>
            <SimpleGrid columns={3} spacing={3}>
              {wallOptions.map((option) => (
                <Box
                  key={`internal-${option.value}`}
                  onClick={() => handleChange("internalWallThickness", option.value)}
                  cursor="pointer"
                  border="2px solid"
                  borderColor={internalWall === option.value ? "cyan.500" : "gray.200"}
                  bg={internalWall === option.value ? "cyan.50" : "white"}
                  borderRadius="10px"
                  p={2}
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor: "cyan.400",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <Image
                    src={option.image}
                    alt={option.label}
                    width="100%"
                    height="80px"
                    objectFit="contain"
                    mb={1}
                  />
                  <Text
                    textAlign="center"
                    fontSize="12px"
                    fontWeight="600"
                    color={internalWall === option.value ? "cyan.700" : "gray.600"}
                  >
                    {option.label}
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
          borderRadius="6px"
          minW="100px"
          h="40px"
          fontWeight="500"
          fontSize="14px"
          _hover={{
            bg: "cyan.50",
            borderColor: "cyan.600",
          }}
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
          borderRadius="6px"
          minW="100px"
          h="40px"
          fontWeight="500"
          fontSize="14px"
          ml="auto"
          _hover={{
            bg: "cyan.600",
          }}
          _disabled={{
            bg: "gray.300",
            color: "gray.500",
            cursor: "not-allowed",
          }}
        >
          {isLastStep ? "Submit" : "Next →"}
        </Button>
      </Flex>
    </Box>
  );
}
