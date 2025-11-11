// src/features/Planning/components/Step3Peripheries.jsx
import {
  Box,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Image,
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
        {/* Compass & Images */}
        <Box 
          position="relative" 
          height="200px" 
          mb={5} 
          mx="auto" 
          maxWidth="280px"
          bg="gray.50"
          borderRadius="12px"
          p={4}
        >
          {/* Center Compass */}
          <Image
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            src={CompassImage}
            width="110px"
            height="110px"
            zIndex={10}
          />

          {/* Bottom Fixed Road */}
          <Image
            position="absolute"
            bottom="16px"
            left="50%"
            transform="translateX(-50%)"
            src={RoadImage}
            width="90px"
            height="28px"
            objectFit="cover"
          />

          {/* Top (Back) */}
          {backImage && (
            <Image
              position="absolute"
              top="16px"
              left="50%"
              transform="translateX(-50%)"
              src={backImage}
              width="90px"
              height="28px"
              objectFit="cover"
              opacity={1}
            />
          )}

          {/* Left */}
          {leftImage && (
            <Image
              position="absolute"
              left="16px"
              top="50%"
              transform="translateY(-50%) rotate(-90deg)"
              transformOrigin="center"
              src={leftImage}
              width="90px"
              height="28px"
              objectFit="cover"
              opacity={1}
            />
          )}

          {/* Right */}
          {rightImage && (
            <Image
              position="absolute"
              right="16px"
              top="50%"
              transform="translateY(-50%) rotate(90deg)"
              transformOrigin="center"
              src={rightImage}
              width="90px"
              height="28px"
              objectFit="cover"
              opacity={1}
            />
          )}
        </Box>

        {/* Radio Group Section - Broader & Comfortable */}
        <Stack spacing={4} mx="auto" w="100%">
          {sides.map(({ key, label }) => (
            <Box key={key}>
              <Text 
                fontWeight="600" 
                fontSize="14px" 
                mb={2.5} 
                color="gray.700"
                letterSpacing="-0.01em"
              >
                Select what is in your {label}
              </Text>
              <RadioGroup
                onChange={(value) => updatePeriphery(key, value)}
                value={formData.peripheries[key] || ""}
              >
                <Flex gap={6} align="center" flexWrap="wrap">
                  <Radio value="Neighbour Plot" colorScheme="cyan" size="md">
                    <Flex align="center" gap={2.5}>
                      <Box 
                        w="26px" 
                        h="26px" 
                        bg="orange.100" 
                        borderRadius="6px" 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                        fontSize="15px"
                      >
                        🏠
                      </Box>
                      <Text fontSize="14px" color="gray.700" fontWeight="500">
                        Neighbour Plot
                      </Text>
                    </Flex>
                  </Radio>

                  <Radio value="Road" colorScheme="cyan" size="md">
                    <Flex align="center" gap={2.5}>
                      <Box 
                        w="26px" 
                        h="26px" 
                        bg="gray.800" 
                        borderRadius="6px" 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                      >
                        <Box w="16px" h="2px" bg="white" borderRadius="full" />
                      </Box>
                      <Text fontSize="14px" color="gray.700" fontWeight="500">
                        Road
                      </Text>
                    </Flex>
                  </Radio>
                </Flex>
              </RadioGroup>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Fixed Navigation Buttons */}
      <Flex justify="space-between" gap={3} flexShrink={0}>
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
          {isLastStep ? 'Submit' : 'Next →'}
        </Button>
      </Flex>
    </Box>
  );
}
