// src/features/Planning/components/Step17StaircaseDimentions.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Input,
  Image,
} from "@chakra-ui/react";
import StaircaseDimentionsImg from "../../../../assets/Planning/StaircaseDimentions/StaircaseDimentions.png";

export default function Step17StaircaseDimentions({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const tread = formData?.tread ?? "";
  const riser = formData?.riser ?? "";

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
      {/* Content Area */}
      <Box>
        <VStack spacing={4} align="stretch">
          {/* Heading */}
          <Text fontWeight="600" color="gray.700" fontSize="17px" mb={1} letterSpacing="-0.01em">
            Staircase Dimensions
          </Text>

          {/* Image Box */}
          <Box
            bg="gray.50"
            borderRadius="12px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
          >
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderRadius="10px"
              overflow="hidden"
              mb={2}
              p={2}
              bg="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="100%"
              mx="auto"
              h="180px"
            >
              <Image
                src={StaircaseDimentionsImg}
                alt="Staircase"
                maxHeight="160px"
                maxWidth="100%"
                objectFit="contain"
              />
            </Box>
          </Box>

          {/* Inputs block */}
          <Box
            bg="white"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            p={4}
          >
            <VStack spacing={4} align="stretch">
              {/* Tread */}
              <Box>
                <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                  Tread (step depth)
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={tread}
                    onChange={(e) => handleChange("tread", e.target.value)}
                    placeholder="0"
                    h="40px"
                    w="80px"
                    type="number"
                    min="0"
                    borderRadius="8px"
                    fontSize="14px"
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
                  <Text color="gray.600" fontSize="14px" fontWeight="500">
                    inches
                  </Text>
                </Flex>
              </Box>

              {/* Riser */}
              <Box>
                <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                  Riser (step height)
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={riser}
                    onChange={(e) => handleChange("riser", e.target.value)}
                    placeholder="0"
                    h="40px"
                    w="80px"
                    type="number"
                    min="0"
                    borderRadius="8px"
                    fontSize="14px"
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
                  <Text color="gray.600" fontSize="14px" fontWeight="500">
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
