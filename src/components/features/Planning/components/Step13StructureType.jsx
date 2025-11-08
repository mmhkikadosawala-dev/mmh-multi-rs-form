import {
    VStack,
    Text,
    Flex,
    Radio,
    Image,
    Button,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import LoadBearing from "../../../../assets/Planning/StructureType/loadBearing.png";
  import FrameStructure from "../../../../assets/Planning/StructureType/frameStructure.png";
  
  export default function StepStructureType({
    formData,
    setFormData,
    onNext,
    onBack,
    isLastStep,
    onSubmit,
  }) {
    const structureType = formData?.structureType ?? "";
  
    const handleSelect = value => {
      setFormData({ ...formData, structureType: value });
    };
  
    const handleNext = () => {
      if (isLastStep) onSubmit();
      else onNext();
    };
  
    return (
      <VStack minH="500px" px={4} maxW="400px" mx="auto" spacing={0} align="stretch">
        {/* Progress dots - keep if needed */}
        <Flex justify="center" mb={3} mt={1}>
          {[...Array(8).keys()].map(idx => (
            <Box
              key={idx}
              w="8px" h="8px"
              mx="1"
              borderRadius="full"
              bg={idx === 0 ? "cyan.500" : "gray.200"}
            />
          ))}
        </Flex>
        
        {/* Title */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={4}>
          Structure Type
        </Text>
  
        {/* Load Bearing Structure Option */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          border={structureType === "loadBearing" ? "2px solid #E5B800" : "1px solid #E2E8F0"}
          mb={4}
          p={1}
          bg={structureType === "loadBearing" ? "yellow.50" : "white"}
          transition="border 0.2s"
        >
          <Image
            src={LoadBearing}
            alt="Load Bearing"
            width="100%"
            height="160px"
            objectFit="contain"
            borderRadius="md"
            border={structureType === "loadBearing" ? "1px solid #E5B800" : "none"}
          />
          <Flex align="center" py={2} pl={2}>
            <Radio
              value="loadBearing"
              isChecked={structureType === "loadBearing"}
              onChange={() => handleSelect("loadBearing")}
              colorScheme="cyan"
              mr={2}
            />
            <Text fontSize="md" color="gray.700" ml={2}>Load Bearing</Text>
          </Flex>
        </Box>
  
        {/* Frame Structure Option */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          border={structureType === "frameStructure" ? "2px solid #2490EF" : "1px solid #E2E8F0"}
          mb={2}
          p={1}
          bg={structureType === "frameStructure" ? "blue.50" : "white"}
          transition="border 0.2s"
        >
          <Image
            src={FrameStructure}
            alt="Frame structure"
            width="100%"
            height="160px"
            objectFit="contain"
            borderRadius="md"
            border={structureType === "frameStructure" ? "1px solid #2490EF" : "none"}
          />
          <Flex align="center" py={2} pl={2}>
            <Radio
              value="frameStructure"
              isChecked={structureType === "frameStructure"}
              onChange={() => handleSelect("frameStructure")}
              colorScheme="cyan"
              mr={2}
            />
            <Text fontSize="md" color="gray.700" ml={2}>Frame Structure</Text>
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
  