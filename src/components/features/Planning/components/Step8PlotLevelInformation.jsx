// src/features/Planning/components/Step3ProjectLevel.jsx
import {
    Box,
    Flex,
    Text,
    Radio,
    RadioGroup,
    useBreakpointValue,
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
    const containerMinHeight = useBreakpointValue({ base: "500px", md: "600px" });
  
    // Defaults like the screenshot
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
      <Box minHeight={containerMinHeight} px={4}>
        <VStack spacing={4} maxWidth="400px" mx="auto" align="stretch">
          {/* Heading (no box) */}
          <Text fontSize="md" fontWeight="600" color="gray.700">
            Plot Level Information
          </Text>
  
          {/* Image (no wrapper box) */}
          <Image
            src={PlotLevelImage}
            alt="Plot Level Illustration"
            width="100%"
            height="auto"
            objectFit="cover"
            borderRadius="md"
          />
  
          {/* Level Difference from Road (plain layout) */}
          <Box>
            <Text fontSize="sm" color="gray.700" fontWeight="600" mb={2}>
              Level Difference from Road:
            </Text>
  
            <RadioGroup onChange={updateLevelRelation} value={levelRelation}>
              <VStack spacing={3} align="stretch">
                <Radio value="same" colorScheme="teal" size="sm">
                  <Text fontSize="sm" color="gray.700">Same as road</Text>
                </Radio>
                <Radio value="above" colorScheme="teal" size="sm">
                  <Text fontSize="sm" color="gray.700">Above road by</Text>
                </Radio>
                <Radio value="below" colorScheme="teal" size="sm">
                  <Text fontSize="sm" color="gray.700">Below road by</Text>
                </Radio>
              </VStack>
            </RadioGroup>
          </Box>
  
          {/* Delta input row (plain) */}
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
              {/* If only feet is required, replace Select with a small Text "feet" */}
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
  
        {/* Navigation Buttons */}
        <Flex justifyContent="space-between" mt={8} maxWidth="400px" mx="auto">
          <Button
            onClick={onBack}
            variant="outline"
            colorScheme="gray"
            size="md"
            fontWeight="500"
            px={6}
          >
            ← Previous
          </Button>
          <Button onClick={handleAction} colorScheme="teal" size="md" fontWeight="500" px={8}>
            {isLastStep ? "Submit" : "Next →"}
          </Button>
        </Flex>
      </Box>
    );
  }
  