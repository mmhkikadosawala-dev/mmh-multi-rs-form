// src/features/Planning/components/StepWallDimensions.jsx
import {
  VStack,
  Text,
  Flex,
  Button,
  Box,
  Input,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlay } from "react-icons/fi";
import { useState } from "react";
import verticalbuildingsectionimg from "../../../../assets/Planning/WallDimentions/verticalbuildingsectionimg.png";

import PlinthlevelVideo from "../../../../assets/Planning/WallDimentions/infovideo/Plinthlevel.mp4";
import LinthandStillVideo from "../../../../assets/Planning/WallDimentions/infovideo/Still.mp4";
import FloorHeightVideo from "../../../../assets/Planning/WallDimentions/infovideo/FloorHeight.mp4";

export default function StepWallDimensions({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const plinthLevel = formData?.plinthLevel ?? "";
  const lintelLevel = formData?.lintelLevel ?? "";
  const sillLevel = formData?.sillLevel ?? "";
  const slabHeight = formData?.slabHeight ?? "";

  const { isOpen: isVideoOpen, onOpen: onVideoOpen, onClose: onVideoClose } = useDisclosure();
  const { isOpen: isImageOpen, onOpen: onImageOpen, onClose: onImageClose } = useDisclosure();
  const [activeVideo, setActiveVideo] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (isLastStep) onSubmit();
    else onNext();
  };

  const openVideoModal = (videoType) => {
    setActiveVideo(videoType);
    onVideoOpen();
  };

  const specBlocks = [
    {
      label: "Plinth Level",
      value: plinthLevel,
      field: "plinthLevel",
      videoUrl: PlinthlevelVideo,
      isPortrait: true,
    },
    {
      label: "Lintel Level",
      value: lintelLevel,
      field: "lintelLevel",
      videoUrl: LinthandStillVideo,
      isPortrait: true,
    },
    {
      label: "Sill Level",
      value: sillLevel,
      field: "sillLevel",
      videoUrl: LinthandStillVideo, // Same video as Lintel
      isPortrait: true,
    },
    {
      label: "Slab Height",
      value: slabHeight,
      field: "slabHeight",
      videoUrl: FloorHeightVideo,
      isPortrait: true,
    },
  ];

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
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#a0aec0",
          },
        }}
      >
        <VStack spacing={4} align="stretch">
          {/* Heading */}
          <Text
            fontWeight="600"
            color="gray.700"
            fontSize="17px"
            mb={1}
            letterSpacing="-0.01em"
          >
            Wall Dimensions
          </Text>

          {/* Single Top Image - Clickable */}
          <Box
            bg="gray.50"
            borderRadius="12px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
            mb={2}
            cursor="pointer"
            onClick={onImageOpen}
            transition="all 0.2s ease"
            _hover={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transform: "scale(1.02)",
            }}
          >
            <Box
              border="1px solid"
              borderColor="gray.200"
              borderRadius="10px"
              overflow="hidden"
              p={3}
              bg="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              h="200px"
              w="100%"
              position="relative"
            >
              <Image
                src={verticalbuildingsectionimg}
                alt="Vertical Building Section"
                maxHeight="180px"
                maxWidth="100%"
                objectFit="contain"
              />
              {/* Click to expand hint */}
              <Box
                position="absolute"
                bottom="2"
                right="2"
                bg="blackAlpha.700"
                color="white"
                px={2}
                py={1}
                borderRadius="md"
                fontSize="11px"
                fontWeight="500"
              >
                Click to enlarge
              </Box>
            </Box>
          </Box>

          {/* Input Sections with Play Buttons */}
          {specBlocks.map((spec, idx) => (
            <Box
              key={spec.field}
              bg="white"
              borderRadius="10px"
              border="1px solid"
              borderColor="gray.200"
              p={3}
            >
              <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                {spec.label}
              </Text>
              <Flex align="center" gap={2}>
                <Input
                  value={spec.value}
                  onChange={(e) => handleChange(spec.field, e.target.value)}
                  placeholder="0"
                  h="40px"
                  w="80px"
                  type="number"
                  min="0"
                  borderRadius="8px"
                  fontSize="14px"
                  fontWeight="500"
                  borderColor="gray.300"
                  textAlign="center"
                  _hover={{
                    borderColor: "cyan.400",
                  }}
                  _focus={{
                    borderColor: "cyan.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
                  }}
                />
                <Text color="gray.600" fontSize="14px" fontWeight="500">
                  feet
                </Text>

                {/* Play Button */}
                <IconButton
                  aria-label={`Play ${spec.label} video`}
                  icon={<FiPlay />}
                  colorScheme="cyan"
                  size="md"
                  borderRadius="full"
                  ml="auto"
                  onClick={() => openVideoModal(spec)}
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                  transition="all 0.2s ease"
                />
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Image Zoom Modal - Mobile Friendly */}
      <Modal 
        isOpen={isImageOpen} 
        onClose={onImageClose} 
        size={{ base: "full", md: "4xl" }}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent 
          mx={{ base: 0, md: 4 }}
          my={{ base: 0, md: 4 }}
          maxH={{ base: "100vh", md: "90vh" }}
          borderRadius={{ base: 0, md: "12px" }}
        >
          <ModalHeader 
            fontSize="16px" 
            fontWeight="600" 
            color="gray.700"
            bg="white"
          >
            Wall Dimensions - Enlarged View
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            p={{ base: 2, md: 4 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.50"
            overflowY="auto"
          >
            <Image
              src={verticalbuildingsectionimg}
              alt="Vertical Building Section - Enlarged"
              w="100%"
              h="auto"
              maxH={{ base: "calc(100vh - 80px)", md: "70vh" }}
              objectFit="contain"
              borderRadius="8px"
            />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Video Modal - Portrait Support */}
      <Modal 
        isOpen={isVideoOpen} 
        onClose={onVideoClose} 
        size={activeVideo?.isPortrait ? "md" : "lg"}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent 
          mx={4} 
          borderRadius="12px"
          maxW={activeVideo?.isPortrait ? "400px" : "800px"}
        >
          <ModalHeader fontSize="16px" fontWeight="600" color="gray.700">
            {activeVideo?.label} - Tutorial Video
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            {activeVideo && (
              <Box
                position="relative"
                width="100%"
                bg="black"
                borderRadius="8px"
                overflow="hidden"
              >
                <video
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: activeVideo.isPortrait ? "500px" : "auto",
                    maxHeight: "70vh",
                    objectFit: "contain",
                    display: "block",
                  }}
                  src={activeVideo.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Fixed Navigation Buttons */}
      <Flex justify="space-between" gap={3} mt={4} flexShrink={0}>
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
          {isLastStep ? "Submit" : "Next →"}
        </Button>
      </Flex>
    </Box>
  );
}
