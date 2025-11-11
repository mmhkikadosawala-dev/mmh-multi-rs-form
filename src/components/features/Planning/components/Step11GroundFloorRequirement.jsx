// src/features/Planning/components/Step11FloorSpaceRequirements.jsx
import {
  Box,
  Text,
  Radio,
  RadioGroup,
  Button,
  Flex,
  Input,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
  Image,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import FloorRequirement from "../../../../assets/Planning/FloorRequirement/Rectangle389.png";

// Additional spaces list
const additionalSpaces = [
  "Living Room", "Pooja Room",
  "Drawing Room", "Store Room",
  "Dining Area", "Study Room",
  "No", "Gym Room",
  "Guest Room", "Utility/Wash Area"
];

export default function Step11FloorSpaceRequirements({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const floorsCount = (() => {
    if (typeof formData?.numberOfFloors === "string") {
      if (formData.numberOfFloors.includes("+")) {
        const additional = parseInt(formData.numberOfFloors.match(/\d+/)[0]) || 0;
        return 1 + additional;
      } else {
        return parseInt(formData.numberOfFloors.match(/\d+/)[0]) || 1;
      }
    }
    return 1;
  })();

  const [activeFloor, setActiveFloor] = useState(0);
  const [floorsData, setFloorsData] = useState(
    formData?.floorsData ??
      Array(floorsCount)
        .fill()
        .map(() => ({
          masterBedrooms: "",
          withAttached: false,
          kitchen: "",
          kitchenType: "",
          additionalSpaces: [],
          otherSpaces: ""
        }))
  );

  const current = floorsData[activeFloor];

  const updateFloorField = (field, value) => {
    const updated = [...floorsData];
    updated[activeFloor] = { ...updated[activeFloor], [field]: value };
    setFloorsData(updated);
  };

  const handleCheckbox = (spaces) => {
    updateFloorField("additionalSpaces", spaces);
  };

  const handleNext = () => {
    if (activeFloor < floorsCount - 1) {
      setActiveFloor(f => f + 1);
    } else {
      setFormData({ ...formData, floorsData });
      if (isLastStep) onSubmit();
      else onNext();
    }
  };

  const handlePrev = () => {
    if (activeFloor > 0) {
      setActiveFloor(f => f - 1);
    } else {
      onBack();
    }
  };

  function floorLabel(idx) {
    if (idx === 0) return "Ground Floor Space Requirements";
    if (idx === 1) return "First Floor Space Requirements";
    if (idx === 2) return "Second Floor Space Requirements";
    const suffix = ["th", "st", "nd", "rd"];
    let v = idx + 1;
    let suf = suffix[v % 100 >= 11 && v % 100 <= 13 ? 0 : v % 10 < 4 ? v % 10 : 0] || "th";
    return `${v}${suf} Floor Space Requirements`;
  }

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
          <Text fontWeight="600" color="gray.700" fontSize="16px" mb={1} letterSpacing="-0.01em">
            {floorLabel(activeFloor)}
          </Text>

          {/* No of Master Bedrooms */}
          <Flex align="center" gap={3}>
            <Text flex="1" fontWeight="500" fontSize="14px" color="gray.700">
              No. of Master Bedrooms
            </Text>
            <Input
              type="number"
              min={0}
              max={20}
              h="40px"
              value={current.masterBedrooms}
              onChange={(e) => updateFloorField("masterBedrooms", e.target.value)}
              w="80px"
              textAlign="center"
              borderRadius="8px"
              fontSize="14px"
              fontWeight="500"
              borderColor="gray.300"
              _hover={{ borderColor: "cyan.400" }}
              _focus={{
                borderColor: "cyan.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
              }}
            />
          </Flex>

          {/* With Attached Toilet */}
          <Flex align="center">
            <Radio
              size="md"
              colorScheme="cyan"
              isChecked={!!current.withAttached}
              onChange={() => updateFloorField("withAttached", !current.withAttached)}
              mr={2}
            />
            <Text fontSize="14px" color="gray.700" fontWeight="500">
              With Attached Toilet
            </Text>
          </Flex>

          {/* Kitchen Yes/No */}
          <Box>
            <Text mb={2} fontWeight="500" fontSize="14px" color="gray.700">
              Kitchen
            </Text>
            <RadioGroup
              value={current.kitchen}
              onChange={(v) => updateFloorField("kitchen", v)}
            >
              <Flex gap={6}>
                <Radio value="yes" colorScheme="cyan" size="md">
                  <Text fontSize="14px" fontWeight="500" color="gray.700">Yes</Text>
                </Radio>
                <Radio value="no" colorScheme="cyan" size="md">
                  <Text fontSize="14px" fontWeight="500" color="gray.700">No</Text>
                </Radio>
              </Flex>
            </RadioGroup>
          </Box>

          {/* Kitchen Type */}
          {current.kitchen === "yes" && (
            <Box>
              <Text mb={2} fontWeight="500" fontSize="14px" color="gray.700">
                Kitchen type
              </Text>
              <RadioGroup
                value={current.kitchenType}
                onChange={(v) => updateFloorField("kitchenType", v)}
              >
                <Flex gap={6}>
                  <Radio value="open" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">Open</Text>
                  </Radio>
                  <Radio value="close" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">Close</Text>
                  </Radio>
                </Flex>
              </RadioGroup>
              {/* Image */}
              <Image
                src={FloorRequirement}
                alt="kitchen"
                w="100%"
                h="120px"
                objectFit="cover"
                borderRadius="12px"
                mt={3}
                border="1px solid"
                borderColor="gray.200"
              />
            </Box>
          )}

          {/* Additional Required Spaces */}
          <Box>
            <Text mb={3} fontWeight="500" fontSize="14px" color="gray.700">
              Additional Required Spaces
            </Text>
            <CheckboxGroup
              value={current.additionalSpaces}
              onChange={handleCheckbox}
            >
              <SimpleGrid columns={2} spacing={3}>
                {additionalSpaces.map((name) => (
                  <Checkbox
                    size="md"
                    colorScheme="cyan"
                    value={name}
                    key={name}
                  >
                    <Text fontSize="14px" fontWeight="500" color="gray.700">
                      {name}
                    </Text>
                  </Checkbox>
                ))}
              </SimpleGrid>
            </CheckboxGroup>
          </Box>

          {/* Other (Please Specify) */}
          <Box>
            <Text mb={2} fontWeight="500" fontSize="14px" color="gray.700">
              Other (Please Specify)
            </Text>
            <Textarea
              placeholder="Enter additional spaces..."
              value={current.otherSpaces}
              onChange={(e) => updateFloorField("otherSpaces", e.target.value)}
              borderColor="gray.300"
              borderRadius="8px"
              minH="80px"
              fontSize="14px"
              _hover={{ borderColor: "cyan.400" }}
              _focus={{
                borderColor: "cyan.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
              }}
            />
          </Box>
        </VStack>
      </Box>

      {/* Fixed Navigation Buttons */}
      <Flex justify="space-between" gap={3} mt={4} flexShrink={0}>
        <Button
          onClick={handlePrev}
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
          Next →
        </Button>
      </Flex>
    </Box>
  );
}
