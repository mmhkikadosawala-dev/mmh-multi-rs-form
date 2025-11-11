// src/features/Planning/components/Step3ProjectLevel.jsx
import {
  Box,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Button,
  VStack,
  Input,
  Select,
  Image,
} from "@chakra-ui/react";
import PlotLevelImage from "../../../../assets/Planning/PlotLevelImage/Rectangle 389.png";

export default function Step3ProjectLevel({
  formData,
  setFormData,
  onNext,
  onSubmit,
  onBack,
  isLastStep,
}) {
  const levelRelation = formData.levelRelation ?? "below";
  const levelDelta = formData.levelDelta ?? 30;
  const levelUnit = formData.levelUnit ?? "feet";

  const updateLevelRelation = (value) => {
    const next = { ...formData, levelRelation: value };
    if (value === "same") next.levelDelta = 0;
    setFormData(next);
  };

  const updateLevelDelta = (e) => {
    const v = parseFloat(e.target.value);
    setFormData({
      ...formData,
      levelDelta: Number.isNaN(v) ? "" : Math.max(0, v),
    });
  };

  const updateLevelUnit = (e) => {
    setFormData({
      ...formData,
      levelUnit: e.target.value,
    });
  };

  const isDeltaEnabled = levelRelation === "above" || levelRelation === "below";
  const deltaLabel =
    levelRelation === "above"
      ? "How plot Level above Road"
      : levelRelation === "below"
      ? "How plot Level below Road"
      : "How plot Level";

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
          <Text fontSize="md" fontWeight="600" color="gray.700">
            Plot Level Information
          </Text>

          {/* Image */}
          <Image
            src={PlotLevelImage}
            alt="Plot Level Illustration"
            width="100%"
            height="auto"
            objectFit="cover"
            borderRadius="md"
          />

          {/* Level Difference from Road */}
          <Box>
            <Text fontSize="sm" color="gray.700" fontWeight="600" mb={2}>
              Level Difference from Road:
            </Text>

            <RadioGroup onChange={updateLevelRelation} value={levelRelation}>
              <VStack spacing={3} align="stretch">
                <Radio value="same" colorScheme="cyan" size="sm">
                  <Text fontSize="sm" color="gray.700">Same as road</Text>
                </Radio>
                <Radio value="above" colorScheme="cyan" size="sm">
                  <Text fontSize="sm" color="gray.700">Above road by</Text>
                </Radio>
                <Radio value="below" colorScheme="cyan" size="sm">
                  <Text fontSize="sm" color="gray.700">Below road by</Text>
                </Radio>
              </VStack>
            </RadioGroup>
          </Box>

          {/* Delta input row */}
          <Box>
            <Text fontSize="sm" color="gray.700" mb={2}>
              {deltaLabel}
            </Text>
            <Flex gap={2} align="center">
              <Input
                value={isDeltaEnabled ? levelDelta : 0}
                onChange={updateLevelDelta}
                isDisabled={!isDeltaEnabled}
                type="number"
                min="0"
                step="1"
                size="sm"
                borderRadius="md"
                fontSize="sm"
                placeholder="0"
              />
              <Select
                value={levelUnit}
                onChange={updateLevelUnit}
                size="sm"
                width="90px"
              >
                <option value="feet">feet</option>
                <option value="meters">meters</option>
              </Select>
            </Flex>
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
