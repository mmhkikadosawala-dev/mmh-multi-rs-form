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
import CompassImage from "../../../../assets/Planning/Compass/illustration-compass 1.png";
import RoadWithHuman from "../../../../assets/Planning/RoadImage/roadwithhuman.png";


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
        {/* Compass Section */}
        <Flex justify="center" direction="column" align="center" mb={4}>
          <Text mb={3} fontWeight="600" fontSize="16px" color="gray.700" letterSpacing="-0.01em">
            Plot Direction Compass
          </Text>
          <Box
            boxSize="180px"
            transform={`rotate(${directionAngles[formData.direction] || 0}deg)`}
            transition="transform 0.4s ease-in-out"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={CompassImage}
              alt="Rotating Compass"
              boxSize="100%"
              objectFit="contain"
            />
          </Box>

          {/* Road with Human Image - Smaller size */}
          <Box mt={2} mb={2}>
            <Image
              src={RoadWithHuman}
              alt="Road with Human"
              height="35px"
              objectFit="contain"
            />
          </Box>
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
