import {
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
        return 1 + additional; // Ground + additional floors
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
      else onNext(); // This will proceed to step 12
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
    <VStack minH="500px" px={4} maxW="400px" mx="auto" spacing={0} align="stretch">
      {/* Scrollable content area directly (no outer box/card) */}
      <VStack
        height="600px"
        overflowY="auto"
        pr={2}
        spacing={4}
        css={{
          "&::-webkit-scrollbar": { width: "5px" },
          "&::-webkit-scrollbar-thumb": { background: "#e0e0e0", borderRadius: "6px" },
        }}
      >
        {/* Heading */}
        <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={2}>
          {floorLabel(activeFloor)}
        </Text>

        {/* No of Master Bedrooms */}
        <Flex align="center" mb={2}>
          <Text w="60%" fontWeight="medium">
            No. of Master Bedrooms
          </Text>
          <Input
            type="number"
            min={0}
            max={20}
            size="sm"
            value={current.masterBedrooms}
            onChange={(e) =>
              updateFloorField("masterBedrooms", e.target.value)
            }
            w="32%"
            textAlign="center"
          />
        </Flex>

        {/* With Attached Toilet */}
        <Flex align="center" mb={2}>
          <Radio
            size="sm"
            colorScheme="cyan"
            isChecked={!!current.withAttached}
            onChange={() =>
              updateFloorField("withAttached", !current.withAttached)
            }
            mr={2}
          />
          <Text fontSize="sm" color="gray.700">
            With Attached Toilet
          </Text>
        </Flex>

        {/* Kitchen Yes/No */}
        <Text mt={2} fontWeight="medium" fontSize="sm">
          Kitchen
        </Text>
        <RadioGroup
          value={current.kitchen}
          onChange={(v) => updateFloorField("kitchen", v)}
        >
          <Flex gap={4}>
            <Radio value="yes" colorScheme="cyan">
              Yes
            </Radio>
            <Radio value="no" colorScheme="cyan">
              No
            </Radio>
          </Flex>
        </RadioGroup>

        {/* Kitchen Type */}
        {current.kitchen === "yes" && (
          <>
            <Text mt={2} mb={1} fontWeight="medium" fontSize="sm">
              Kitchen type
            </Text>
            <RadioGroup
              value={current.kitchenType}
              onChange={(v) => updateFloorField("kitchenType", v)}
            >
              <Flex gap={5}>
                <Radio value="open" colorScheme="cyan">
                  Open
                </Radio>
                <Radio value="close" colorScheme="cyan">
                  Close
                </Radio>
              </Flex>
            </RadioGroup>
            {/* Image (local asset) */}
            <Image
              src={FloorRequirement}
              alt="kitchen"
              w="100%"
              h="110px"
              objectFit="cover"
              borderRadius="md"
              mt={2}
            />
          </>
        )}

        {/* Additional Required Spaces */}
        <Text mt={4} mb={1} fontWeight="medium" fontSize="sm">
          Additional Required Spaces:
        </Text>
        <CheckboxGroup
          value={current.additionalSpaces}
          onChange={handleCheckbox}
        >
          <SimpleGrid columns={2} spacing={2}>
            {additionalSpaces.map((name) => (
              <Checkbox
                size="sm"
                colorScheme="cyan"
                value={name}
                key={name}
              >
                {name}
              </Checkbox>
            ))}
          </SimpleGrid>
        </CheckboxGroup>

        {/* Other (Please Specify) */}
        <Textarea
          mt={3}
          placeholder="Other (Please Specify):"
          value={current.otherSpaces}
          onChange={(e) =>
            updateFloorField("otherSpaces", e.target.value)
          }
          size="sm"
          borderColor="gray.200"
          borderRadius="md"
          minH="40px"
        />
      </VStack>

      {/* Navigation Buttons */}
      <Flex
        justify="space-between"
        mt={8}
        maxW="400px"
        mx="auto"
        gap={3}
      >
        <Button
          onClick={handlePrev}
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
          Next &#xbb;
        </Button>
      </Flex>
    </VStack>
  );
}