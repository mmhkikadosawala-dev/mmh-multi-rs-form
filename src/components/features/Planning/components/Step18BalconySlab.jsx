// src/features/Planning/components/Step18BalconySlab.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Input,
  Image,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import BalconySlabImg from "../../../../assets/Planning/BalconySlab/BalconySlab.png";

export default function Step18BalconySlab({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const slabExtension = formData?.slabExtension ?? "";
  const slabSides = formData?.slabSides ?? "";

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
            Slab Projection / Balcony
          </Text>

          {/* Image Card */}
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
                src={BalconySlabImg}
                alt="Balcony Slab"
                maxHeight="160px"
                maxWidth="100%"
                objectFit="cover"
              />
            </Box>
          </Box>

          {/* Question and Input */}
          <Box
            bg="white"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            p={4}
          >
            <VStack spacing={4} align="stretch">
              {/* Question */}
              <Box>
                <Text fontWeight="600" fontSize="14px" mb={3} color="gray.700">
                  Do you want slab extension in front or any other side?
                </Text>
                <RadioGroup
                  value={slabExtension}
                  onChange={(value) => handleChange("slabExtension", value)}
                >
                  <Flex gap={6}>
                    <Box
                      flex="1"
                      p={3}
                      bg={slabExtension === "yes" ? "cyan.50" : "white"}
                      border="1px solid"
                      borderColor={slabExtension === "yes" ? "cyan.500" : "gray.200"}
                      borderRadius="8px"
                      transition="all 0.2s ease"
                      cursor="pointer"
                      onClick={() => handleChange("slabExtension", "yes")}
                      _hover={{
                        borderColor: "cyan.300",
                        bg: "cyan.50",
                      }}
                    >
                      <Radio value="yes" colorScheme="cyan" size="md">
                        <Text fontSize="14px" fontWeight="500" color="gray.700">Yes</Text>
                      </Radio>
                    </Box>
                    <Box
                      flex="1"
                      p={3}
                      bg={slabExtension === "no" ? "cyan.50" : "white"}
                      border="1px solid"
                      borderColor={slabExtension === "no" ? "cyan.500" : "gray.200"}
                      borderRadius="8px"
                      transition="all 0.2s ease"
                      cursor="pointer"
                      onClick={() => handleChange("slabExtension", "no")}
                      _hover={{
                        borderColor: "cyan.300",
                        bg: "cyan.50",
                      }}
                    >
                      <Radio value="no" colorScheme="cyan" size="md">
                        <Text fontSize="14px" fontWeight="500" color="gray.700">No</Text>
                      </Radio>
                    </Box>
                  </Flex>
                </RadioGroup>
              </Box>

              {/* Side Input */}
              <Box>
                <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                  If yes, mention side(s)
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={slabSides}
                    onChange={(e) => handleChange("slabSides", e.target.value)}
                    placeholder="Enter side(s)"
                    h="40px"
                    type="text"
                    isDisabled={slabExtension !== "yes"}
                    borderRadius="8px"
                    fontSize="14px"
                    fontWeight="500"
                    borderColor="gray.300"
                    _hover={{
                      borderColor: slabExtension === "yes" ? "cyan.400" : "gray.300",
                    }}
                    _focus={{
                      borderColor: "cyan.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                    }}
                    _disabled={{
                      bg: "gray.100",
                      cursor: "not-allowed",
                    }}
                  />
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
