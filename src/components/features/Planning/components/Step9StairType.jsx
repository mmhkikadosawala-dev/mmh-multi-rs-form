// src/features/Planning/components/Step9StairType.jsx
import {
    Box,
    Flex,
    Text,
    Radio,
    Button,
    VStack,
    Image,
  } from "@chakra-ui/react";
  import InteriorStair from "../../../../assets/Planning/StairType/InteriorStair.png";
  import ExteriorImage from "../../../../assets/Planning/StairType/ExteriorStair.png";
  
  export default function Step9StairType({
    formData,
    setFormData,
    onNext,
    onSubmit,
    onBack,
    isLastStep,
  }) {
    const stairType = formData.stairType ?? "internal";
  
    const updateStairType = (value) => {
      setFormData({ ...formData, stairType: value });
    };
  
    const handleAction = isLastStep ? onSubmit : onNext;
  
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
        <VStack spacing={4} align="stretch">
          {/* Title just like the screenshot */}
          <Text fontSize="lg" fontWeight="bold" color="blue.700" mb={1}>
            Stair Type
          </Text>
  
          {/* Internal stair option */}
          <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            border={stairType === "internal" ? "2px solid #319795" : "1px solid #E2E8F0"}
          >
            <Image
              src={InteriorStair}
              alt="Internal Stair"
              width="100%"
              height="160px"
              objectFit="cover"
              borderTopRadius="lg"
            />
            <Flex align="center" py={2} px={3}>
              <Radio
                value="internal"
                colorScheme="cyan"
                isChecked={stairType === "internal"}
                onChange={() => updateStairType("internal")}
                mr={2}
              />
              <Text fontSize="md" color="gray.700" ml={2}>Internal</Text>
            </Flex>
          </Box>
  
          {/* External stair option */}
          <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            border={stairType === "external" ? "2px solid #319795" : "1px solid #E2E8F0"}
          >
            <Image
              src={ExteriorImage}
              alt="External Stair"
              width="100%"
              height="160px"
              objectFit="cover"
              borderTopRadius="lg"
            />
            <Flex align="center" py={2} px={3}>
              <Radio
                value="external"
                colorScheme="cyan"
                isChecked={stairType === "external"}
                onChange={() => updateStairType("external")}
                mr={2}
              />
              <Text fontSize="md" color="gray.700" ml={2}>External</Text>
            </Flex>
          </Box>
        </VStack>
  
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
            onClick={handleAction}
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
  