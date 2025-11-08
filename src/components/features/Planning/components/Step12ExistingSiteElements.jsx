import {
    VStack,
    Text,
    Flex,
    RadioGroup,
    Radio,
    Divider,
    Button,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  export default function ExistingSiteElements({
    formData,
    setFormData,
    onNext,
    onBack,
    isLastStep,
    onSubmit,
  }) {
    // Initial values (defaults to empty string)
    const initial = formData?.siteElements ?? {
      borewell: "",
      trees: "",
      waterTank: "",
      septicTank: "",
    };
  
    const [siteElements, setSiteElements] = useState(initial);
  
    const handleChange = (field, value) => {
      const updated = { ...siteElements, [field]: value };
      setSiteElements(updated);
      setFormData({ ...formData, siteElements: updated });
    };
  
    const handleNext = () => {
      if (isLastStep) onSubmit();
      else onNext();
    };
  
    return (
      <VStack align="stretch" spacing={0} maxW="400px" mx="auto" pb={6}>
        {/* Stepper Example - only if you want to keep progress dots */}
        <Flex justify="center" mb={3} mt={1}>
          {[...Array(8).keys()].map(idx => (
            <Flex
              key={idx}
              w="8px" h="8px"
              mx="1"
              borderRadius="full"
              bg={idx === 0 ? "cyan.500" : "gray.200"}
            />
          ))}
        </Flex>
  
        {/* Content */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={2} mt={1}>
          Existing Site Elements
        </Text>
  
        {/* Borewell */}
        <Flex direction="column" mb={0}>
          <Text fontWeight="medium" color="gray.700" fontSize="md" mb={1}>
            Borewell
          </Text>
          <RadioGroup
            value={siteElements.borewell}
            onChange={v => handleChange("borewell", v)}
          >
            <Flex gap={6}>
              <Radio value="yes" colorScheme="cyan">
                Yes
              </Radio>
              <Radio value="no" colorScheme="cyan">
                No
              </Radio>
            </Flex>
          </RadioGroup>
        </Flex>
        <Divider my={3} />
  
        {/* Trees */}
        <Flex direction="column" mb={0}>
          <Text fontWeight="medium" color="gray.700" fontSize="md" mb={1}>
            Trees on Site
          </Text>
          <RadioGroup
            value={siteElements.trees}
            onChange={v => handleChange("trees", v)}
          >
            <Flex gap={6}>
              <Radio value="yes" colorScheme="cyan">
                Yes
              </Radio>
              <Radio value="no" colorScheme="cyan">
                No
              </Radio>
            </Flex>
          </RadioGroup>
        </Flex>
        <Divider my={3} />
  
        {/* Existing Water Tank */}
        <Flex direction="column" mb={0}>
          <Text fontWeight="medium" color="gray.700" fontSize="md" mb={1}>
            Existing Water Tank
          </Text>
          <RadioGroup
            value={siteElements.waterTank}
            onChange={v => handleChange("waterTank", v)}
          >
            <Flex gap={6}>
              <Radio value="yes" colorScheme="cyan">
                Yes
              </Radio>
              <Radio value="no" colorScheme="cyan">
                No
              </Radio>
            </Flex>
          </RadioGroup>
        </Flex>
        <Divider my={3} />
  
        {/* Septic Tank / Soak Pit */}
        <Flex direction="column">
          <Text fontWeight="medium" color="gray.700" fontSize="md" mb={1}>
            Septic Tank / Soak Pit:
          </Text>
          <RadioGroup
            value={siteElements.septicTank}
            onChange={v => handleChange("septicTank", v)}
          >
            <Flex gap={6}>
              <Radio value="yes" colorScheme="cyan">
                Yes
              </Radio>
              <Radio value="no" colorScheme="cyan">
                No
              </Radio>
            </Flex>
          </RadioGroup>
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
  