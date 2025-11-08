import {
    VStack,
    Text,
    Flex,
    Button,
    Box,
    Input,
    Image,
  } from "@chakra-ui/react";
  // import all images at the top
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
    // Read values from formData (default to empty string)
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
  
    // For each section: image, label, input
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
      <VStack minH="500px" h="600px" px={4} maxW="400px" mx="auto" align="stretch" spacing={0}>
        {/* Fixed Heading at top */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={3} mt={3}>
          Wall Dimensions
        </Text>
  
        {/* Scrollable block */}
        <Box
          flex="1"
          overflowY="auto"
          pr={1}
          pb={2}
          css={{
            '&::-webkit-scrollbar': { width: '5px' },
            '&::-webkit-scrollbar-thumb': { background: '#E2E8F0', borderRadius: '8px' },
          }}
        >
  
          {specBlocks.map((spec, idx) => (
            <Box
              key={spec.field}
              mb={idx === specBlocks.length - 1 ? 0 : 6}
            >
              {/* Card with image */}
              <Box
                bg="gray.50"
                borderRadius="lg"
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={4}
                boxShadow="sm"
                mb={2}
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
                  h="170px"
                  w="90%"
                  mx="auto"
                >
                  <Image
                    src={spec.image}
                    alt={spec.label}
                    maxHeight="150px"
                    maxWidth="100%"
                    objectFit="contain"
                    mx="auto"
                    />
                </Box>
                {/* Image dots, can be skipped or kept */}
                <Flex gap="2px" mt={2}>
                  <Box w="18px" h="4px" bg="cyan.400" borderRadius="full" />
                  <Box w="4px" h="4px" bg="cyan.100" borderRadius="full" />
                  <Box w="4px" h="4px" bg="cyan.100" borderRadius="full" />
                </Flex>
              </Box>
  
              {/* Numeric Input */}
              <Box textAlign="left" px={2} mb={1}>
                <Text fontWeight={500} mb={1}>{spec.label}</Text>
                <Flex align="center" maxW="180px">
                  <Input
                    value={spec.value}
                    onChange={(e) => handleChange(spec.field, e.target.value)}
                    placeholder="Value"
                    size="sm"
                    w="60px"
                    mr={2}
                    type="number"
                  />
                  <Text color="gray.500" fontSize="sm">feet</Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </Box>
  
        {/* Navigation Buttons fixed at bottom */}
        <Flex
          justify="space-between"
          mt={8}
          maxW="400px"
          mx="auto"
          gap={3}
          bg="white"
          pt={3}
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
  