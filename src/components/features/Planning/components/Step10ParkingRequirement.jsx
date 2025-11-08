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
  import { useState } from "react";
  
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
      <Box minH="500px" px={4}>
        {/* Progress dots (static, for example) */}
        <Flex justify="center" mb={6}>
          {[...Array(8).keys()].map((idx) => (
            <Box
              key={idx}
              h="8px"
              w="8px"
              mx="1"
              borderRadius="full"
              bg={idx === 0 ? "cyan.500" : "gray.200"}
            />
          ))}
        </Flex>
  
        {/* Main Card */}
        <Box
          maxW="400px"
          mx="auto"
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
  
        {/* Navigation Buttons */}
        <Flex
          justify="space-between"
          mt={8}
          maxW="400px"
          mx="auto"
          gap={3}
        >
          <Button
            onClick={onBack}
            variant="outline"
            borderColor="cyan.300"
            color="cyan.700"
            size="md"
            fontWeight="500"
            px={7}
          >
            &#xab; Previous
          </Button>
          <Button
            onClick={handleAction}
            colorScheme="cyan"
            size="md"
            fontWeight="500"
            px={8}
          >
            {isLastStep ? "Submit" : "Next \u00bb"}
          </Button>
        </Flex>
      </Box>
    );
  }
  