// src/features/Planning/components/Step2PlotDirection.jsx
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Text,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import CompassImage from "../../../../assets/Planning/Compass/illustration-compass 1.png";
import RoadWithHuman from "../../../../assets/Planning/RoadImage/roadwithhuman.png";

// Compass rose standard angles - clockwise rotation
const directionAngles = {
  north: 0,           // Top
  "north-east": 45,   // Top-Right
  east: 90,           // Right
  "south-east": 135,  // Bottom-Right
  south: 180,         // Bottom
  "south-west": 225,  // Bottom-Left
  west: 270,          // Left
  "north-west": 315,  // Top-Left
};

export default function Step2PlotDirection({ formData, setFormData, onNext, onSubmit, onBack, isLastStep }) {
  const handleAction = isLastStep ? onSubmit : onNext;

  // Calculate compass rotation - selected direction should face DOWN (towards road)
  // South is already at bottom (180°), so we need to rotate to make selected direction point to 180°
  const getCompassRotation = () => {
    if (!formData.direction) return 0;
    
    const selectedAngle = directionAngles[formData.direction];
    // Rotate compass so selected direction points down (180°)
    return 180 - selectedAngle;
  };

  const compassRotation = getCompassRotation();

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
        {/* Compass Section */}
        <Flex justify="center" direction="column" align="center" mb={4}>
          <Text mb={3} fontWeight="600" fontSize="16px" color="gray.700" letterSpacing="-0.01em">
            Plot Direction Compass
          </Text>
          
          {/* Compass + Sun Container - ROTATES */}
          <Box
            boxSize="180px"
            transform={`rotate(${compassRotation}deg)`}
            transition="transform 0.4s ease-in-out"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            {/* Compass Image */}
            <Image
              src={CompassImage}
              alt="Rotating Compass"
              boxSize="100%"
              objectFit="contain"
            />

            {/* Sun Icon - Rotates with compass, stays at East position */}
            <Box
              position="absolute"
              top="50%"
              right="-12px"
              transform="translateY(-50%)"
              fontSize="26px"
              sx={{
                "& svg": {
                  fill: "#FF8C00",
                  stroke: "#FF8C00",
                  color: "#FF8C00",
                }
              }}
            >
              <FiSun color="#FF8C00" fill="#FF8C00" />
            </Box>
          </Box>

          {/* Road with Human Image - FIXED at bottom */}
          <Box mt={2} mb={2}>
            <Image
              src={RoadWithHuman}
              alt="Road with Human"
              height="35px"
              objectFit="contain"
            />
          </Box>

          {/* Direction Label */}
          {/* {formData.direction && (
            <Text fontSize="12px" fontWeight="600" color="cyan.600" mt={1}>
              {formData.direction.charAt(0).toUpperCase() + formData.direction.slice(1).replace("-", " - ")} facing road
            </Text>
          )} */}
        </Flex>

        {/* Directions Grid */}
        <RadioGroup
          onChange={(value) => setFormData({ ...formData, direction: value })}
          value={formData.direction}
        >
          <SimpleGrid columns={2} spacing={3} maxW="340px" mx="auto">
            {Object.keys(directionAngles).map((dir) => (
              <Box
                key={dir}
                p={2.5}
                bg={formData.direction === dir ? "cyan.50" : "white"}
                border="1px solid"
                borderColor={formData.direction === dir ? "cyan.500" : "gray.200"}
                borderRadius="8px"
                transition="all 0.2s ease"
                cursor="pointer"
                onClick={() => setFormData({ ...formData, direction: dir })}
                _hover={{
                  borderColor: "cyan.300",
                  bg: "cyan.50",
                }}
              >
                <Radio value={dir} size="md" colorScheme="cyan">
                  <Text fontSize="13px" fontWeight="500" color="gray.700">
                    {dir.charAt(0).toUpperCase() + dir.slice(1).replace("-", " - ")}
                  </Text>
                </Radio>
              </Box>
            ))}
          </SimpleGrid>
        </RadioGroup>
      </Box>

      {/* Fixed Navigation Buttons */}
      <Flex justify="space-between" gap={3}>
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
          isDisabled={!formData.direction}
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
          _disabled={{
            bg: "gray.300",
            color: "gray.500",
            cursor: "not-allowed",
          }}
        >
          {isLastStep ? 'Submit' : 'Next →'}
        </Button>
      </Flex>
    </Box>
  );
}
