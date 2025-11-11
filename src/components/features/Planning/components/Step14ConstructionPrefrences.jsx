// src/features/Planning/components/StepStructureConstructionPreferences.jsx
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
      {/* Content Area */}
      <Box>
        <VStack spacing={4} align="stretch">
          {/* Title */}
          <Text fontWeight="600" color="gray.700" fontSize="17px" mb={1} letterSpacing="-0.01em">
            Structure & Construction Preferences
          </Text>

          {/* Image */}
          <Box
            border="1px solid"
            borderColor="gray.200"
            borderRadius="12px"
            overflow="hidden"
            width="100%"
          >
            <Image
              src={ConstructionImg}
              alt="Construction"
              width="100%"
              height="180px"
              objectFit="cover"
            />
          </Box>

          {/* Type of Footing */}
          <Box>
            <Text fontWeight="600" color="gray.700" fontSize="15px" mb={3}>
              Type of Footing Preferred
            </Text>
            <RadioGroup value={footingPreference} onChange={handleChange}>
              <VStack align="flex-start" spacing={3}>
                <Box
                  w="100%"
                  p={3}
                  bg={footingPreference === "shallow" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={footingPreference === "shallow" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  onClick={() => handleChange("shallow")}
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="shallow" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">
                      Shallow
                    </Text>
                  </Radio>
                </Box>

                <Box
                  w="100%"
                  p={3}
                  bg={footingPreference === "pile" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={footingPreference === "pile" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  onClick={() => handleChange("pile")}
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="pile" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">
                      Pile
                    </Text>
                  </Radio>
                </Box>

                <Box
                  w="100%"
                  p={3}
                  bg={footingPreference === "engineer_suggestion" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={footingPreference === "engineer_suggestion" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  onClick={() => handleChange("engineer_suggestion")}
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="engineer_suggestion" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">
                      As per Engineer's Suggestion
                    </Text>
                  </Radio>
                </Box>
              </VStack>
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
