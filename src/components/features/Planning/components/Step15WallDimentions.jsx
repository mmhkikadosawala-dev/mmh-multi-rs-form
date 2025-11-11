// src/features/Planning/components/StepWallDimensions.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Input,
  Image,
} from "@chakra-ui/react";
import WallImg from "../../../../assets/Planning/WallDimentions/wallDimentions.png";

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
      {/* Content Area - No Scroll */}
      <Box>
        <VStack spacing={3} align="stretch">
          {/* Heading */}
          <Text fontWeight="600" color="gray.700" fontSize="16px" mb={0} letterSpacing="-0.01em">
            Wall Dimensions
          </Text>

          {/* Image Box - Compact */}
          <Box
            bg="gray.50"
            borderRadius="10px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={3}
          >
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              overflow="hidden"
              mb={1.5}
              p={1.5}
              bg="white"
            >
              <Image
                src={WallImg}
                alt="Wall"
                width="110px"
                height="190px"
                objectFit="contain"
                mx="auto"
              />
            </Box>

          </Box>

          {/* Thickness Inputs - Compact */}
          <Box
            bg="white"
            borderRadius="10px"
            border="1px solid"
            borderColor="gray.200"
            p={3}
          >
            <VStack spacing={3} align="stretch">
              {/* External Wall */}
              <Box>
                <Text fontWeight="600" fontSize="13px" mb={1.5} color="gray.700">
                  External Wall Thickness
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={externalWall}
                    onChange={(e) => handleChange("externalWallThickness", e.target.value)}
                    placeholder="0"
                    h="38px"
                    w="75px"
                    type="number"
                    min="0"
                    borderRadius="8px"
                    fontSize="13px"
                    fontWeight="500"
                    borderColor="gray.300"
                    textAlign="center"
                    _hover={{
                      borderColor: "cyan.400",
                    }}
                    _focus={{
                      borderColor: "cyan.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                    }}
                  />
                  <Text color="gray.600" fontSize="13px" fontWeight="500">
                    inches
                  </Text>
                </Flex>
              </Box>

              {/* Internal Wall */}
              <Box>
                <Text fontWeight="600" fontSize="13px" mb={1.5} color="gray.700">
                  Internal Wall Thickness
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={internalWall}
                    onChange={(e) => handleChange("internalWallThickness", e.target.value)}
                    placeholder="0"
                    h="38px"
                    w="75px"
                    type="number"
                    min="0"
                    borderRadius="8px"
                    fontSize="13px"
                    fontWeight="500"
                    borderColor="gray.300"
                    textAlign="center"
                    _hover={{
                      borderColor: "cyan.400",
                    }}
                    _focus={{
                      borderColor: "cyan.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                    }}
                  />
                  <Text color="gray.600" fontSize="13px" fontWeight="500">
                    inches
                  </Text>
                </Flex>
              </Box>
            </VStack>
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
        >
          {isLastStep ? "Submit" : "Next →"}
        </Button>
      </Flex>
    </Box>
  );
}
