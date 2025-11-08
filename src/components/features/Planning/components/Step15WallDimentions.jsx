import {
    VStack,
    Text,
    Flex,
    Button,
    Box,
    Input,
    Image,
  } from "@chakra-ui/react";
  import { useState } from "react";
  // Update this import as needed
  import WallImg from "../../../../assets/Planning/WallDimentions/wallDimentions.png";
  
  export default function StepWallDimensions({
    formData,
    setFormData,
    onNext,
    onBack,
    isLastStep,
    onSubmit,
  }) {
    // Controlled values
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
      <VStack minH="500px" px={4} maxW="400px" mx="auto" align="stretch" spacing={0}>
        {/* Heading */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={2} mt={3}>
          Wall Dimensions
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
          >
            <Image
              src={WallImg}
              alt="Wall"
              width="122px"
              height="208px"
              objectFit="contain"
              mx="auto"
            />
          </Box>
          {/* Optionally, use dots to indicate more images or carousel */}
          <Flex gap="2px" mt={2}>
            <Box w="18px" h="4px" bg="cyan.400" borderRadius="full" />
            <Box w="4px" h="4px" bg="cyan.100" borderRadius="full" />
            <Box w="4px" h="4px" bg="cyan.100" borderRadius="full" />
          </Flex>
        </Box>
  
        {/* Thickness Inputs */}
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
            <Text fontWeight={500} mb={1}>External Wall Thickness</Text>
            <Flex align="center">
              <Input
                value={externalWall}
                onChange={(e) => handleChange("externalWallThickness", e.target.value)}
                placeholder="Thickness"
                size="sm"
                w="60px"
                mr={2}
                type="number"
              />
              <Text color="gray.500" fontSize="sm">inches</Text>
            </Flex>
          </Box>
          <Box flex="1">
            <Text fontWeight={500} mb={1}>Internal Wall Thickness</Text>
            <Flex align="center">
              <Input
                value={internalWall}
                onChange={(e) => handleChange("internalWallThickness", e.target.value)}
                placeholder="Thickness"
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
  