// src/features/Planning/components/Step4PlotSize.jsx
import {
  Box,
  Flex,
  Text,
  Input,
  Image,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import CompassImage from "../../../../assets/Planning/Compass/illustration-compass 1.png";
import NeighbourHomeImage from "../../../../assets/Planning/NeighboursHouse/Rectangle 9607.png";
import RoadImage from "../../../../assets/Planning/RoadImage/Group 35547.png";

function getSideImage(side, peripheries) {
  const value = peripheries[side];
  if (!value) return null;
  if (value === "Road") return RoadImage;
  if (value === "Neighbour Plot") return NeighbourHomeImage;
  return null;
}

export default function Step4PlotSize({ formData, setFormData, onNext, onSubmit, onBack, isLastStep }) {
  const imageBoxSize = useBreakpointValue({ base: "200px", md: "240px" });
  const containerMinHeight = useBreakpointValue({ base: "440px", md: "500px" });

  const handleWidthChange = e => setFormData({ ...formData, size: { ...formData.size, width: e.target.value } });
  const handleDepthChange = e => setFormData({ ...formData, size: { ...formData.size, depth: e.target.value } });

  const rightImage = getSideImage("right", formData.peripheries);
  const backImage = getSideImage("back", formData.peripheries);
  const leftImage = getSideImage("left", formData.peripheries);

  const handleAction = isLastStep ? onSubmit : onNext;

  return (
    <Box minHeight={containerMinHeight}>
      {/* Top Inputs */}
      <Flex gap={4} mb={4} justify="center" align="center">
        <Box>
          <Text fontSize="sm" mb={1} color="gray.600">
            Plot Width
          </Text>
          <Flex align="center">
            <Input
              value={formData.size.width || ''}
              onChange={handleWidthChange}
              width="60px"
              size="sm"
              borderRadius="md"
              fontSize="sm"
              mr={2}
              textAlign="center"
              type="number"
              min="0"
            />
            <Text fontSize="sm" color="gray.500">
              feet
            </Text>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="sm" mb={1} color="gray.600">
            Plot depth
          </Text>
          <Flex align="center">
            <Input
              value={formData.size.depth || ''}
              onChange={handleDepthChange}
              width="60px"
              size="sm"
              borderRadius="md"
              fontSize="sm"
              mr={2}
              textAlign="center"
              type="number"
              min="0"
            />
            <Text fontSize="sm" color="gray.500">
              feet
            </Text>
          </Flex>
        </Box>
      </Flex>

      {/* Compass & Images - Same positioning as your original code */}
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