// src/features/Planning/components/Step4PlotSize.jsx
import {
  Box,
  Flex,
  Text,
  Input,
  Image,
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
  const handleWidthFeetChange = e => setFormData({ 
    ...formData, 
    size: { ...formData.size, widthFeet: e.target.value } 
  });
  
  const handleWidthInchesChange = e => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 11)) {
      setFormData({ 
        ...formData, 
        size: { ...formData.size, widthInches: value } 
      });
    }
  };
  
  const handleDepthFeetChange = e => setFormData({ 
    ...formData, 
    size: { ...formData.size, depthFeet: e.target.value } 
  });
  
  const handleDepthInchesChange = e => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 11)) {
      setFormData({ 
        ...formData, 
        size: { ...formData.size, depthInches: value } 
      });
    }
  };

  const rightImage = getSideImage("right", formData.peripheries);
  const backImage = getSideImage("back", formData.peripheries);
  const leftImage = getSideImage("left", formData.peripheries);

  // Validation: Check if both width and depth feet are provided
  const isValid = () => {
    const widthFeet = parseFloat(formData.size?.widthFeet);
    const depthFeet = parseFloat(formData.size?.depthFeet);
    return widthFeet > 0 && depthFeet > 0;
  };

  const handleAction = () => {
    if (!isValid()) return; // Don't proceed if validation fails
    if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

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
        {/* Top Input Section */}
        <Box
          mb={5}
          bg="white"
          p={4}
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.200"
        >
          {/* Plot Width */}
          <Box mb={4}>
            <Text 
              fontSize="13px" 
              mb={2} 
              color="gray.600"
              fontWeight="600"
              letterSpacing="-0.01em"
            >
              Plot Width <Text as="span" color="red.500">*</Text>
            </Text>
            <Flex align="center" gap={2} justify="center">
              <Input
                value={formData.size.widthFeet || ''}
                onChange={handleWidthFeetChange}
                width="80px"
                h="40px"
                borderRadius="8px"
                fontSize="14px"
                textAlign="center"
                type="number"
                min="0"
                fontWeight="500"
                borderColor="gray.300"
                _hover={{
                  borderColor: "cyan.400",
                }}
                _focus={{
                  borderColor: "cyan.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                }}
              />
              <Text fontSize="13px" color="gray.600" fontWeight="500">
                feet
              </Text>
              <Input
                value={formData.size.widthInches || ''}
                onChange={handleWidthInchesChange}
                width="70px"
                h="40px"
                borderRadius="8px"
                fontSize="14px"
                textAlign="center"
                type="number"
                min="0"
                max="11"
                fontWeight="500"
                borderColor="gray.300"
                _hover={{
                  borderColor: "cyan.400",
                }}
                _focus={{
                  borderColor: "cyan.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                }}
              />
              <Text fontSize="13px" color="gray.600" fontWeight="500">
                inches
              </Text>
            </Flex>
          </Box>

          {/* Plot Depth */}
          <Box>
            <Text 
              fontSize="13px" 
              mb={2} 
              color="gray.600"
              fontWeight="600"
              letterSpacing="-0.01em"
            >
              Plot Depth <Text as="span" color="red.500">*</Text>
            </Text>
            <Flex align="center" gap={2} justify="center">
              <Input
                value={formData.size.depthFeet || ''}
                onChange={handleDepthFeetChange}
                width="80px"
                h="40px"
                borderRadius="8px"
                fontSize="14px"
                textAlign="center"
                type="number"
                min="0"
                fontWeight="500"
                borderColor="gray.300"
                _hover={{
                  borderColor: "cyan.400",
                }}
                _focus={{
                  borderColor: "cyan.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                }}
              />
              <Text fontSize="13px" color="gray.600" fontWeight="500">
                feet
              </Text>
              <Input
                value={formData.size.depthInches || ''}
                onChange={handleDepthInchesChange}
                width="70px"
                h="40px"
                borderRadius="8px"
                fontSize="14px"
                textAlign="center"
                type="number"
                min="0"
                max="11"
                fontWeight="500"
                borderColor="gray.300"
                _hover={{
                  borderColor: "cyan.400",
                }}
                _focus={{
                  borderColor: "cyan.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                }}
              />
              <Text fontSize="13px" color="gray.600" fontWeight="500">
                inches
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* Compass & Images */}
        <Box 
          position="relative" 
          height="200px" 
          mb={4} 
          mx="auto" 
          maxWidth="280px"
          bg="gray.50"
          borderRadius="12px"
          p={4}
        >
          {/* Compass */}
          <Image
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            src={CompassImage}
            width="150px"
            height="150px"
            zIndex={10}
          />

          {/* Bottom Road */}
          <Image
            position="absolute"
            bottom="4px"
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
              top="4px"
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
              left="-8px"
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
              right="-8px"
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
          isDisabled={!isValid()}
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
            opacity: 0.6,
          }}
        >
          {isLastStep ? 'Submit' : 'Next →'}
        </Button>
      </Flex>
    </Box>
  );
}
