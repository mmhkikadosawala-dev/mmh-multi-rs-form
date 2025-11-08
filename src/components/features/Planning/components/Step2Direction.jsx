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
  useBreakpointValue,
} from "@chakra-ui/react";
import CompassImage from "../../../../assets/Planning/Compass/illustration-compass 1.png";

const directionAngles = {
  north: 0,
  "north-east": 45,
  east: 90,
  "south-east": 135,
  south: 180,
  "south-west": 225,
  west: 270,
  "north-west": 315,
};

export default function Step2PlotDirection({ formData, setFormData, onNext, onSubmit, onBack, isLastStep }) {
  const imageBoxSize = useBreakpointValue({ base: "160px", md: "200px" });
  const containerMinHeight = useBreakpointValue({ base: "420px", md: "480px" });

  const handleAction = isLastStep ? onSubmit : onNext;

  return (
    <Box
      minHeight={containerMinHeight}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px={4}
    >
      {/* Compass */}
      <Flex justify="center" mt={2} direction="column" align="center">
        <Text mb={2} fontWeight="500" fontSize="sm" color="gray.700">
          Plot Direction Compass
        </Text>
        <Box
          boxSize={imageBoxSize}
          transform={`rotate(${directionAngles[formData.direction] || 0}deg)`}
          transition="transform 0.3s ease"
        >
          <Image src={CompassImage} alt="Rotating Compass" boxSize="100%" objectFit="contain" />
        </Box>
      </Flex>

      {/* Directions Grid */}
      <RadioGroup
        onChange={(value) => setFormData({ ...formData, direction: value })}
        value={formData.direction}
      >
        <SimpleGrid columns={2} spacing={4} maxWidth="320px" mx="auto" mt={4}>
          {Object.keys(directionAngles).map((dir) => (
            <Radio key={dir} value={dir} size="sm" colorScheme="teal">
              <Text fontSize="xs">
                {dir.charAt(0).toUpperCase() + dir.slice(1).replace("-", " ")}
              </Text>
            </Radio>
          ))}
        </SimpleGrid>
      </RadioGroup>

      {/* Navigation Buttons */}
      <Flex justify="space-between" mt={6} maxWidth="320px" mx="auto" w="100%">
        <Button
          colorScheme="gray"
          variant="outline"
          onClick={onBack}
          size="sm"
          fontWeight="500"
        >
          ← Previous
        </Button>
        <Button
          colorScheme="teal"
          onClick={handleAction}
          isDisabled={!formData.direction}
          size="sm"
          fontWeight="500"
        >
          {isLastStep ? 'Submit' : 'Next →'}
        </Button>
      </Flex>
    </Box>
  );
}