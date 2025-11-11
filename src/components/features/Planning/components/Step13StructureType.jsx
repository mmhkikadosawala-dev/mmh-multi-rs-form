// src/features/Planning/components/StepStructureType.jsx
import {
  VStack,
  Text,
  Flex,
  Radio,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import LoadBearing from "../../../../assets/Planning/StructureType/loadBearing.png";
import FrameStructure from "../../../../assets/Planning/StructureType/frameStructure.png";

export default function StepStructureType({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const structureType = formData?.structureType ?? "";

  const handleSelect = value => {
    setFormData({ ...formData, structureType: value });
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
      {/* Content Area */}
      <Box>
        <VStack spacing={4} align="stretch">
          {/* Title */}
          <Text fontWeight="600" color="gray.700" fontSize="18px" mb={2} letterSpacing="-0.01em">
            Structure Type
          </Text>

          {/* Load Bearing Structure Option */}
          <Box
            borderRadius="12px"
            overflow="hidden"
            border={structureType === "loadBearing" ? "2px solid #E5B800" : "1px solid #E2E8F0"}
            p={1}
            bg={structureType === "loadBearing" ? "yellow.50" : "white"}
            transition="all 0.2s ease"
            cursor="pointer"
            onClick={() => handleSelect("loadBearing")}
            _hover={{
              boxShadow: "md",
            }}
          >
            <Image
              src={LoadBearing}
              alt="Load Bearing"
              width="100%"
              height="160px"
              objectFit="contain"
              borderRadius="10px"
              border={structureType === "loadBearing" ? "1px solid #E5B800" : "none"}
            />
            <Flex align="center" py={2} pl={2}>
              <Radio
                value="loadBearing"
                isChecked={structureType === "loadBearing"}
                onChange={() => handleSelect("loadBearing")}
                colorScheme="cyan"
                size="md"
                mr={2}
              />
              <Text fontSize="15px" color="gray.700" ml={2} fontWeight="500">
                Load Bearing
              </Text>
            </Flex>
          </Box>

          {/* Frame Structure Option */}
          <Box
            borderRadius="12px"
            overflow="hidden"
            border={structureType === "frameStructure" ? "2px solid #2490EF" : "1px solid #E2E8F0"}
            p={1}
            bg={structureType === "frameStructure" ? "blue.50" : "white"}
            transition="all 0.2s ease"
            cursor="pointer"
            onClick={() => handleSelect("frameStructure")}
            _hover={{
              boxShadow: "md",
            }}
          >
            <Image
              src={FrameStructure}
              alt="Frame structure"
              width="100%"
              height="160px"
              objectFit="contain"
              borderRadius="10px"
              border={structureType === "frameStructure" ? "1px solid #2490EF" : "none"}
            />
            <Flex align="center" py={2} pl={2}>
              <Radio
                value="frameStructure"
                isChecked={structureType === "frameStructure"}
                onChange={() => handleSelect("frameStructure")}
                colorScheme="cyan"
                size="md"
                mr={2}
              />
              <Text fontSize="15px" color="gray.700" ml={2} fontWeight="500">
                Frame Structure
              </Text>
            </Flex>
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
