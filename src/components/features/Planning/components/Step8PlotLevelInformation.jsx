// src/features/Planning/components/Step3ProjectLevel.jsx
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Input,
  Image,
} from "@chakra-ui/react";
import PlinthLevelImg from "../../../../assets/Planning/PlotLevelImage/PlinthLevelImg.png";
import PlotLevelDownImg from "../../../../assets/Planning/PlotLevelImage/PlotLevelDownImg.png";
import SameLevelImg from "../../../../assets/Planning/PlotLevelImage/SameLevelImg.png";

export default function Step3ProjectLevel({
  formData,
  setFormData,
  onNext,
  onSubmit,
  onBack,
  isLastStep,
}) {
  const levelRelation = formData.levelRelation ?? "same";
  const levelFeet = formData.levelFeet ?? "";
  const levelInches = formData.levelInches ?? "";

  const updateLevelRelation = (value) => {
    const next = { ...formData, levelRelation: value };
    if (value === "same") {
      next.levelFeet = "";
      next.levelInches = "";
    }
    setFormData(next);
  };

  const updateLevelFeet = (e) => {
    setFormData({
      ...formData,
      levelFeet: e.target.value,
    });
  };

  const updateLevelInches = (e) => {
    const value = e.target.value;
    // Only allow values between 0 and 11
    if (value === '' || (Number(value) >= 0 && Number(value) <= 11)) {
      setFormData({
        ...formData,
        levelInches: value,
      });
    }
  };

  const isDeltaEnabled = levelRelation === "above" || levelRelation === "below";
  const deltaLabel =
    levelRelation === "above"
      ? "How much is plot level above road?"
      : levelRelation === "below"
      ? "How much is plot level below road?"
      : "Plot level same as road";

  const handleAction = isLastStep ? onSubmit : onNext;

  const levelOptions = [
    {
      value: "same",
      label: "Same as Road",
      image: SameLevelImg,
    },
    {
      value: "above",
      label: "Above Road",
      image: PlotLevelDownImg, // SWAPPED: Now using PlotLevelDownImg
    },
    {
      value: "below",
      label: "Below Road",
      image: PlinthLevelImg, // SWAPPED: Now using PlinthLevelImg
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
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a0aec0",
          },
        }}
      >
        <VStack spacing={5} align="stretch">
          {/* Heading */}
          <Text fontSize="16px" fontWeight="600" color="gray.700">
            Plot Level Information
          </Text>

          {/* Level Options with Images */}
          <Box>
            <Text fontSize="14px" color="gray.700" fontWeight="600" mb={3}>
              Level Difference from Road <Text as="span" color="red.500">*</Text>
            </Text>

            <VStack spacing={3} align="stretch">
              {levelOptions.map((option) => (
                <Box
                  key={option.value}
                  onClick={() => updateLevelRelation(option.value)}
                  cursor="pointer"
                  border="2px solid"
                  borderColor={
                    levelRelation === option.value ? "cyan.500" : "gray.200"
                  }
                  borderRadius="12px"
                  overflow="hidden"
                  bg={levelRelation === option.value ? "cyan.50" : "white"}
                  transition="all 0.2s ease"
                  _hover={{
                    borderColor:
                      levelRelation === option.value ? "cyan.600" : "gray.300",
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                >
                  <Image
                    src={option.image}
                    alt={option.label}
                    width="100%"
                    height="140px"
                    objectFit="cover"
                  />
                  <Flex
                    align="center"
                    justify="center"
                    p={3}
                    bg={levelRelation === option.value ? "cyan.50" : "white"}
                  >
                    <Box
                      w="18px"
                      h="18px"
                      borderRadius="full"
                      border="2px solid"
                      borderColor={
                        levelRelation === option.value ? "cyan.500" : "gray.300"
                      }
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mr={2}
                    >
                      {levelRelation === option.value && (
                        <Box
                          w="10px"
                          h="10px"
                          borderRadius="full"
                          bg="cyan.500"
                        />
                      )}
                    </Box>
                    <Text
                      fontSize="14px"
                      fontWeight="600"
                      color={
                        levelRelation === option.value ? "cyan.700" : "gray.700"
                      }
                    >
                      {option.label}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Delta input row - Feet and Inches */}
          {isDeltaEnabled && (
            <Box>
              <Text fontSize="14px" color="gray.700" fontWeight="600" mb={2}>
                {deltaLabel}
              </Text>
              <Flex gap={2} align="center">
                <Input
                  value={levelFeet}
                  onChange={updateLevelFeet}
                  type="number"
                  min="0"
                  placeholder="0"
                  size="md"
                  h="40px"
                  borderRadius="8px"
                  fontSize="14px"
                  textAlign="center"
                  fontWeight="500"
                  borderColor="gray.300"
                  flex="1"
                  _hover={{
                    borderColor: "cyan.400",
                  }}
                  _focus={{
                    borderColor: "cyan.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                  }}
                />
                <Text fontSize="13px" color="gray.600" fontWeight="500" minW="35px">
                  feet
                </Text>
                <Input
                  value={levelInches}
                  onChange={updateLevelInches}
                  type="number"
                  min="0"
                  max="11"
                  placeholder="0"
                  size="md"
                  h="40px"
                  borderRadius="8px"
                  fontSize="14px"
                  textAlign="center"
                  fontWeight="500"
                  borderColor="gray.300"
                  flex="1"
                  _hover={{
                    borderColor: "cyan.400",
                  }}
                  _focus={{
                    borderColor: "cyan.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                  }}
                />
                <Text fontSize="13px" color="gray.600" fontWeight="500" minW="45px">
                  inches
                </Text>
              </Flex>
            </Box>
          )}
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
