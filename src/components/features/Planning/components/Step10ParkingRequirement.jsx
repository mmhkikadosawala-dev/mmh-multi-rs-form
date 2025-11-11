// src/features/Planning/components/Step10ParkingRequirement.jsx
import {
  Box,
  Text,
  Radio,
  RadioGroup,
  VStack,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";

export default function Step10ParkingRequirement({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  // Initial values from props, fallback to empty
  const parkingRequirement = formData?.parkingRequirement ?? "";
  const vastuPreference = formData?.vastuPreference ?? "";

  // Handler functions
  const handleParkingChange = (value) => {
    setFormData({ ...formData, parkingRequirement: value });
  };
  const handleVastuChange = (value) => {
    setFormData({ ...formData, vastuPreference: value });
  };

  const handleAction = isLastStep ? onSubmit : onNext;

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
      <VStack spacing={4} align="stretch">

        {/* Main Card */}
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          p={5}
          border="1px solid"
          borderColor="gray.100"
        >
          {/* Title */}
          <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={4}>
            Parking requirement
          </Text>

          {/* Parking Requirement Radio */}
          <RadioGroup value={parkingRequirement} onChange={handleParkingChange}>
            <VStack align="flex-start" spacing={3}>
              <Radio value="bike" colorScheme="cyan">
                Bike
              </Radio>
              <Radio value="car" colorScheme="cyan">
                Car
              </Radio>
              <Radio value="both" colorScheme="cyan">
                Both
              </Radio>
            </VStack>
          </RadioGroup>

          <Divider my={4} />

          {/* Vastu Preference */}
          <Text fontWeight="semibold" color="gray.700" mb={1}>
            Vastu Preference
          </Text>
          <RadioGroup value={vastuPreference} onChange={handleVastuChange}>
            <VStack align="flex-start" spacing={3}>
              <Radio value="yes" colorScheme="cyan">
                Yes
              </Radio>
              <Radio value="no" colorScheme="cyan">
                No
              </Radio>
              <Radio value="as_much_as_possible" colorScheme="cyan">
                As much as possible
              </Radio>
            </VStack>
          </RadioGroup>
        </Box>
      </VStack>

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
          onClick={handleAction}
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
