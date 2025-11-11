// src/features/Planning/components/StepWallDimensions.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Input,
  Image,
} from "@chakra-ui/react";
import LintelLevel from "../../../../assets/Planning/WallDimentions/LintelLevel.png";
import PlinthLevel from "../../../../assets/Planning/WallDimentions/PlinthLevel.png";
import SlabHeight from "../../../../assets/Planning/WallDimentions/SlabHeight.png";
import StillLevel from "../../../../assets/Planning/WallDimentions/StillLevel.png";

export default function StepWallDimensions({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const plinthLevel = formData?.plinthLevel ?? "";
  const lintelLevel = formData?.lintelLevel ?? "";
  const sillLevel = formData?.sillLevel ?? "";
  const slabHeight = formData?.slabHeight ?? "";

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (isLastStep) onSubmit();
    else onNext();
  };

  const specBlocks = [
    {
      label: "Plinth Level",
      value: plinthLevel,
      image: PlinthLevel,
      field: "plinthLevel",
    },
    {
      label: "Lintel Level",
      value: lintelLevel,
      image: LintelLevel,
      field: "lintelLevel",
    },
    {
      label: "Sill Level",
      value: sillLevel,
      image: StillLevel,
      field: "sillLevel",
    },
    {
      label: "Slab Height",
      value: slabHeight,
      image: SlabHeight,
      field: "slabHeight",
    },
  ];

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
      {/* Scrollable Content Area */}
      <Box 
        flex="1" 
        overflowY="auto"
        overflowX="hidden"
        pr={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cbd5e0',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a0aec0',
          },
        }}
      >
        <VStack spacing={4} align="stretch">
          {/* Heading */}
          <Text fontWeight="600" color="gray.700" fontSize="17px" mb={1} letterSpacing="-0.01em">
            Wall Dimensions
          </Text>

          {specBlocks.map((spec, idx) => (
            <Box key={spec.field}>
              {/* Card with image */}
              <Box
                bg="gray.50"
                borderRadius="12px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={4}
                mb={3}
              >
                <Box
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="10px"
                  overflow="hidden"
                  mb={2}
                  p={2}
                  bg="white"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  h="150px"
                  w="90%"
                  mx="auto"
                >
                  <Image
                    src={spec.image}
                    alt={spec.label}
                    maxHeight="130px"
                    maxWidth="100%"
                    objectFit="contain"
                  />
                </Box>
              </Box>

              {/* Input Section */}
              <Box
                bg="white"
                borderRadius="10px"
                border="1px solid"
                borderColor="gray.200"
                p={3}
                mb={idx === specBlocks.length - 1 ? 0 : 4}
              >
                <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                  {spec.label}
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={spec.value}
                    onChange={(e) => handleChange(spec.field, e.target.value)}
                    placeholder="0"
                    h="40px"
                    w="80px"
                    type="number"
                    min="0"
                    borderRadius="8px"
                    fontSize="14px"
                    fontWeight="500"
                    borderColor="gray.300"
                    textAlign="center"
                    _hover={{
                      borderColor: "cyan.400",
                    }}
                    _focus={{
                      borderColor: "cyan.500",
                      boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                    }}
                  />
                  <Text color="gray.600" fontSize="14px" fontWeight="500">
                    feet
                  </Text>
                </Flex>
              </Box>
            </Box>
          ))}
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
