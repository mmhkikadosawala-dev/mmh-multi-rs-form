import {
    VStack,
    Text,
    Flex,
    Radio,
    RadioGroup,
    Image,
    Button,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  // Replace the path below with your own image import
  import ConstructionImg from "../../../../assets/Planning/ConstructionPrefrences/constructionPrefrences.png";
  
  export default function StepStructureConstructionPreferences({
    formData,
    setFormData,
    onNext,
    onBack,
    isLastStep,
    onSubmit,
  }) {
    const footingPreference = formData?.footingPreference ?? "";
  
    const handleChange = (value) => {
      setFormData({ ...formData, footingPreference: value });
    };
  
    const handleNext = () => {
      if (isLastStep) onSubmit();
      else onNext();
    };
  
    return (
      <VStack minH="500px" px={4} maxW="400px" mx="auto" spacing={0} align="stretch">
        {/* Title */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={3}>
          Structure & Construction Preferences
        </Text>
  
        {/* Image */}
        <Box
          border="2px solid #2490EF"
          borderRadius="md"
          overflow="hidden"
          mb={4}
          width="100%"
        >
          <Image
            src={ConstructionImg}
            alt="Construction"
            width="100%"
            height="180px"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>
  
        {/* Type of Footing */}
        <Text fontWeight="semibold" color="gray.700" mb={2}>
          Type of Footing Preferred:
        </Text>
        <RadioGroup value={footingPreference} onChange={handleChange}>
          <VStack align="flex-start" spacing={3}>
            <Radio value="shallow" colorScheme="cyan">
              Shallow
            </Radio>
            <Radio value="pile" colorScheme="cyan">
              Pile
            </Radio>
            <Radio value="engineer_suggestion" colorScheme="cyan">
              As per Engineer's Suggestion
            </Radio>
          </VStack>
        </RadioGroup>
  
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
  