// src/features/Planning/components/Step3Peripheries.jsx
import {
  Box,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Image,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import CompassImage from "../../../../assets/Planning/Compass/illustration-compass 1.png";
import NeighbourHomeImage from "../../../../assets/Planning/NeighboursHouse/Rectangle 9607.png";
import RoadImage from "../../../../assets/Planning/RoadImage/Group 35547.png";

const sides = [
  { key: "right", label: "Right side of plot" },
  { key: "back", label: "Back side of plot" },
  { key: "left", label: "Left side of plot" },
];

function getSideImage(side, peripheries) {
  const value = peripheries[side];
  if (!value) return null;
  if (value === "Road") return RoadImage;
  if (value === "Neighbour Plot") return NeighbourHomeImage;
  return null;
}

export default function Step3Peripheries({ formData, setFormData, onNext, onSubmit, onBack, isLastStep }) {
  const imageBoxSize = useBreakpointValue({ base: "200px", md: "240px" }); // Increased compass section height
  const containerMinHeight = useBreakpointValue({ base: "440px", md: "500px" });

  const updatePeriphery = (side, value) => {
    setFormData({
      ...formData,
      peripheries: { ...formData.peripheries, [side]: value },
    });
  };

  const rightImage = getSideImage("right", formData.peripheries);
  const backImage = getSideImage("back", formData.peripheries);
  const leftImage = getSideImage("left", formData.peripheries);

  const handleAction = isLastStep ? onSubmit : onNext;

  return (
    <Box minHeight={containerMinHeight}>
      {/* Compass & Images */}
      <Box position="relative" height={imageBoxSize} mb={6} mx="auto" maxWidth="350px">
        {/* Center Compass */}
        <Image
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          src={CompassImage}
          width="140px"
          height="140px"
          zIndex={10}
        />

        {/* Bottom Fixed Road */}
        <Image
          position="absolute"
          bottom="12px"
          left="50%"
          transform="translateX(-50%)"
          src={RoadImage}
          width="120px"
          height="34px"
          objectFit="cover"
        />

        {/* Top (Back) */}
        {backImage && (
          <Image
            position="absolute"
            top="12px"
            left="50%"
            transform="translateX(-50%)"
            src={backImage}
            width="120px"
            height="34px"
            objectFit="cover"
            opacity={1}
            boxShadow="sm"
          />
        )}

        {/* Left */}
        {leftImage && (
          <Image
            position="absolute"
            left="12px"
            top="50%"
            transform="translateY(-50%) rotate(-90deg)"
            transformOrigin="center"
            src={leftImage}
            width="120px"
            height="34px"
            objectFit="cover"
            opacity={1}
            boxShadow="sm"
          />
        )}

        {/* Right */}
        {rightImage && (
          <Image
            position="absolute"
            right="12px"
            top="50%"
            transform="translateY(-50%) rotate(90deg)"
            transformOrigin="center"
            src={rightImage}
            width="120px"
            height="34px"
            objectFit="cover"
            opacity={1}
            boxShadow="sm"
          />
        )}
      </Box>

      {/* Radio Group Section */}
      <Stack spacing={5} maxWidth="500px" mx="auto" px={4}>
        {sides.map(({ key, label }) => (
          <Box key={key}>
            <Text fontWeight="500" fontSize="sm" mb={2} color="gray.700">
              Select what is in your {label}
            </Text>
            <RadioGroup
              onChange={(value) => updatePeriphery(key, value)}
              value={formData.peripheries[key] || ""}
            >
              <Flex gap={6} align="center">
                <Radio value="Neighbour Plot" colorScheme="teal" size="sm">
                  <Flex align="center" gap={2}>
                    <Box w="20px" h="20px" bg="orange.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                      🏠
                    </Box>
                    <Text fontSize="xs" color="gray.700">Neighbour Plot</Text>
                  </Flex>
                </Radio>

                <Radio value="Road" colorScheme="teal" size="sm">
                  <Flex align="center" gap={2}>
                    <Box w="20px" h="20px" bg="gray.800" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                      <Box w="14px" h="2px" bg="white" borderRadius="full" />
                    </Box>
                    <Text fontSize="xs" color="gray.700">Road</Text>
                  </Flex>
                </Radio>
              </Flex>
            </RadioGroup>
          </Box>
        ))}
      </Stack>

      {/* Navigation */}
      <Flex justifyContent="space-between" mt={6} maxWidth="500px" mx="auto" px={4}>
        <Button
          onClick={onBack}
          variant="outline"
          colorScheme="gray"
          size="sm"
          fontWeight="500"
        >
          ← Previous
        </Button>
        <Button
          onClick={handleAction}
          colorScheme="teal"
          size="sm"
          fontWeight="500"
        >
          {isLastStep ? 'Submit' : 'Next →'}
        </Button>
      </Flex>
    </Box>
  );
}