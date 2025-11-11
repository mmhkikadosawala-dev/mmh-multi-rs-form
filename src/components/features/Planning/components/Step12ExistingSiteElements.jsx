// src/features/Planning/components/ExistingSiteElements.jsx
import {
  Box,
  VStack,
  Text,
  Flex,
  RadioGroup,
  Radio,
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
      {/* Content Area - No Scroll */}
      <Box>
        <VStack align="stretch" spacing={3}>
          {/* Title */}
          <Text fontWeight="600" color="gray.700" fontSize="17px" mb={1} letterSpacing="-0.01em">
            Existing Site Elements
          </Text>

          {/* Borewell */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            p={3}
          >
            <Text fontWeight="600" color="gray.700" fontSize="14px" mb={2.5}>
              Borewell
            </Text>
            <RadioGroup
              value={siteElements.borewell}
              onChange={v => handleChange("borewell", v)}
            >
              <Flex gap={4}>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.borewell === "yes" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.borewell === "yes" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="yes" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">Yes</Text>
                  </Radio>
                </Box>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.borewell === "no" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.borewell === "no" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="no" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">No</Text>
                  </Radio>
                </Box>
              </Flex>
            </RadioGroup>
          </Box>

          {/* Trees */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            p={3}
          >
            <Text fontWeight="600" color="gray.700" fontSize="14px" mb={2.5}>
              Trees on Site
            </Text>
            <RadioGroup
              value={siteElements.trees}
              onChange={v => handleChange("trees", v)}
            >
              <Flex gap={4}>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.trees === "yes" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.trees === "yes" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="yes" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">Yes</Text>
                  </Radio>
                </Box>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.trees === "no" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.trees === "no" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="no" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">No</Text>
                  </Radio>
                </Box>
              </Flex>
            </RadioGroup>
          </Box>

          {/* Existing Water Tank */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            p={3}
          >
            <Text fontWeight="600" color="gray.700" fontSize="14px" mb={2.5}>
              Existing Water Tank
            </Text>
            <RadioGroup
              value={siteElements.waterTank}
              onChange={v => handleChange("waterTank", v)}
            >
              <Flex gap={4}>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.waterTank === "yes" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.waterTank === "yes" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="yes" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">Yes</Text>
                  </Radio>
                </Box>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.waterTank === "no" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.waterTank === "no" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="no" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">No</Text>
                  </Radio>
                </Box>
              </Flex>
            </RadioGroup>
          </Box>

          {/* Septic Tank / Soak Pit */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="10px"
            p={3}
          >
            <Text fontWeight="600" color="gray.700" fontSize="14px" mb={2.5}>
              Septic Tank / Soak Pit
            </Text>
            <RadioGroup
              value={siteElements.septicTank}
              onChange={v => handleChange("septicTank", v)}
            >
              <Flex gap={4}>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.septicTank === "yes" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.septicTank === "yes" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="yes" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">Yes</Text>
                  </Radio>
                </Box>
                <Box
                  flex="1"
                  p={2.5}
                  bg={siteElements.septicTank === "no" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={siteElements.septicTank === "no" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="no" colorScheme="cyan" size="md">
                    <Text fontSize="13px" fontWeight="500" color="gray.700">No</Text>
                  </Radio>
                </Box>
              </Flex>
            </RadioGroup>
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
