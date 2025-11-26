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
  const handleWidthChange = e => setFormData({ ...formData, size: { ...formData.size, width: e.target.value } });
  const handleDepthChange = e => setFormData({ ...formData, size: { ...formData.size, depth: e.target.value } });

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
        {/* Top Input Section */}
        <Flex 
          gap={5} 
          mb={5} 
          justify="center" 
          align="center"
          bg="white"
          p={4}
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.200"
        >
          <Box>
            <Text 
              fontSize="13px" 
              mb={2} 
              color="gray.600"
              fontWeight="600"
              letterSpacing="-0.01em"
            >
              Plot Width
            </Text>
            <Flex align="center" gap={2}>
              <Input
                value={formData.size.width || ''}
                onChange={handleWidthChange}
                width="70px"
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
            </Flex>
          </Box>

          <Box>
            <Text 
              fontSize="13px" 
              mb={2} 
              color="gray.600"
              fontWeight="600"
              letterSpacing="-0.01em"
            >
              Plot Depth
            </Text>
            <Flex align="center" gap={2}>
              <Input
                value={formData.size.depth || ''}
                onChange={handleDepthChange}
                width="70px"
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
            </Flex>
          </Box>
        </Flex>

        {/* Compass & Images - सिर्फ यही हिस्सा बदला है */}
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
          {/* बड़ा Compass */}
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

          {/* Bottom Road - बाहर शिफ्ट */}
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

      {/* Fixed Navigation Buttons - बिल्कुल वैसे ही जैसे पहले थे */}
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