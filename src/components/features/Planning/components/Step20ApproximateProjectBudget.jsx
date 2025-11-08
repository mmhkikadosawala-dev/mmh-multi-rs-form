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
      <VStack minH="500px" px={4} maxW="400px" mx="auto" align="stretch">
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.100"
          p={5}
          mb={0}
        >
          {/* Heading */}
          <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={3}>
            Approximate Project Budget
          </Text>
  
          <Text fontWeight={500} mb={1}>Approximate Budget</Text>
          <Flex align="center" gap={2} mt={1}>
            <Input
              value={budget}
              onChange={e => handleChange("approximateBudget", e.target.value)}
              placeholder="Amount"
              fontSize="3xl"
              fontWeight={600}
              border="none"
              borderBottom="2px solid #eee"
              borderRadius={0}
              w="65%"
              mr={2}
              type="number"
              _focus={{ borderColor: "cyan.400", boxShadow: "none" }}
            />
            <Select
              value={unit}
              onChange={e => handleChange("budgetUnit", e.target.value)}
              fontWeight={600}
              color="white"
              bg="cyan.400"
              borderRadius="md"
              py={1}
              px={4}
              w="35%"
              size="lg"
              _focus={{ bg: "cyan.500" }}
            >
              <option value="lakh">lakh</option>
              <option value="crore">crore</option>
              <option value="thousand">thousand</option>
            </Select>
          </Flex>
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
            onClick={handleNext}
            colorScheme="cyan"
            size="md"
            fontWeight="500"
            px={8}
          >
            {isLastStep ? "Submit" : "Next \u00bb"}
          </Button>
        </Flex>
      </VStack>
    );
  }
  