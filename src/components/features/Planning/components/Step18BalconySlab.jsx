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
  import { useState } from "react";
  // Import balcony image
  import BalconySlabImg from "../../../../assets/Planning/BalconySlab/BalconySlab.png";
  
  export default function Step18BalconySlab({
    formData,
    setFormData,
    onNext,
    onBack,
    isLastStep,
    onSubmit,
  }) {
    const slabExtension = formData?.slabExtension ?? ""; // "yes" or "no"
    const slabSides = formData?.slabSides ?? "";
  
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
          Slab Projection / Balcony
        </Text>
  
        {/* Image Card */}
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
              src={BalconySlabImg}
              alt="Balcony Slab"
              maxHeight="160px"
              maxWidth="100%"
              objectFit="cover"
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
  
        {/* Question and Input */}
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.100"
          p={4}
          mb={1}
        >
          <Text fontWeight={500} mb={2}>
            Do you want slab extension in front or any other side?
          </Text>
          <RadioGroup
            value={slabExtension}
            onChange={(value) => handleChange("slabExtension", value)}
            mb={3}
          >
            <Flex gap={8}>
              <Radio value="yes" colorScheme="cyan">
                Yes
              </Radio>
              <Radio value="no" colorScheme="cyan">
                No
              </Radio>
            </Flex>
          </RadioGroup>
          <Text fontWeight={500} mb={1}>
            If yes, mention side(s)
          </Text>
          <Flex align="center" maxW="220px" mt={1}>
            <Input
              value={slabSides}
              onChange={(e) => handleChange("slabSides", e.target.value)}
              placeholder="side(s)"
              size="sm"
              w="80%"
              mr={2}
              type="text"
              isDisabled={slabExtension !== "yes"}
            />
            <Text color="gray.500" fontSize="sm">inches</Text>
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
  