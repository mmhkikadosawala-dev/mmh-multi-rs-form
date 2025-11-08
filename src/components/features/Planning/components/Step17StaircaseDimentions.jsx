import {
    VStack,
    Text,
    Flex,
    Button,
    Box,
    Input,
    Image,
  } from "@chakra-ui/react";
  // Import image at the top
  import StaircaseDimentionsImg from "../../../../assets/Planning/StaircaseDimentions/StaircaseDimentions.png";
  
  export default function Step17StaircaseDimentions({
    formData,
    setFormData,
    onNext,
    onBack,
    isLastStep,
    onSubmit,
  }) {
    // Controlled values
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
      <VStack minH="500px" px={4} maxW="400px" mx="auto" align="stretch" spacing={0}>
        {/* Heading */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={2} mt={3}>
          Staircase dimensions
        </Text>
  
        {/* Image Box */}
        <Box
          bg="gray.50"
          borderRadius="lg"
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
          mb={4}
        >
          <Box
            border="2px solid #2490EF"
            borderRadius="md"
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
              mx="auto"
            />
          </Box>
          {/* Dots below image */}
          <Flex gap="2px" mt={2}>
            <Box w="18px" h="4px" bg="cyan.400" borderRadius="full" />
            <Box w="4px" h="4px" bg="cyan.100" borderRadius="full" />
            <Box w="4px" h="4px" bg="cyan.100" borderRadius="full" />
          </Flex>
        </Box>
  
        {/* Inputs block */}
        <Flex
          mt={3}
          gap={4}
          mb={0}
          justify="center"
          align="center"
          flexWrap="wrap"
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Box flex="1">
            <Text fontWeight={500} mb={1}>Tread (step depth)</Text>
            <Flex align="center">
              <Input
                value={tread}
                onChange={(e) => handleChange("tread", e.target.value)}
                placeholder="Depth"
                size="sm"
                w="60px"
                mr={2}
                type="number"
              />
              <Text color="gray.500" fontSize="sm">inches</Text>
            </Flex>
          </Box>
          <Box flex="1">
            <Text fontWeight={500} mb={1}>Riser (step height)</Text>
            <Flex align="center">
              <Input
                value={riser}
                onChange={(e) => handleChange("riser", e.target.value)}
                placeholder="Height"
                size="sm"
                w="60px"
                mr={2}
                type="number"
              />
              <Text color="gray.500" fontSize="sm">inches</Text>
            </Flex>
          </Box>
        </Flex>
  
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
  