// src/features/Planning/components/StepApproximateBudget.jsx
import {
  Box,
  Text,
  Flex,
  Button,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";

export default function StepApproximateBudget({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const budget = formData?.approximateBudget ?? "";
  const unit = formData?.budgetUnit ?? "crore";

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
            Approximate Project Budget
          </Text>

          {/* Budget Input Card */}
          <Box
            bg="white"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            p={5}
          >
            <VStack spacing={4} align="stretch">
              <Text fontWeight="600" fontSize="14px" color="gray.700">
                Enter Your Budget
              </Text>

              <Flex align="center" gap={3}>
                <Box flex="1">
                  <Input
                    value={budget}
                    onChange={(e) => handleChange("approximateBudget", e.target.value)}
                    placeholder="0"
                    fontSize="32px"
                    fontWeight="600"
                    border="none"
                    borderBottom="2px solid"
                    borderBottomColor="gray.300"
                    borderRadius={0}
                    type="number"
                    min="0"
                    textAlign="left"
                    px={0}
                    color="gray.800"
                    _focus={{
                      borderBottomColor: "cyan.500",
                      boxShadow: "none",
                    }}
                    _hover={{
                      borderBottomColor: "cyan.400",
                    }}
                  />
                </Box>
                <Select
                  value={unit}
                  onChange={(e) => handleChange("budgetUnit", e.target.value)}
                  fontWeight="600"
                  fontSize="15px"
                  color="white"
                  bg="cyan.500"
                  borderRadius="8px"
                  w="120px"
                  h="44px"
                  border="none"
                  _focus={{
                    bg: "cyan.600",
                    boxShadow: "none",
                  }}
                  _hover={{
                    bg: "cyan.600",
                  }}
                >
                  <option value="thousand" style={{color: '#000'}}>Thousand</option>
                  <option value="lakh" style={{color: '#000'}}>Lakh</option>
                  <option value="crore" style={{color: '#000'}}>Crore</option>
                </Select>
              </Flex>

              {/* Helper Text */}
              <Text fontSize="13px" color="gray.500" mt={2}>
                This helps us understand your project requirements better
              </Text>
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
