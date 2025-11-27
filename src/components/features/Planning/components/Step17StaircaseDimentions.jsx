// src/features/Planning/components/Step17StaircaseDimentions.jsx
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
import StaircaseDimentionsImg from "../../../../assets/Planning/StaircaseDimentions/StaircaseDimentions.png";
import RiserandThread from "../../../../assets/Planning/StaircaseDimentions/RiserandThread.mp4";

export default function Step17StaircaseDimentions({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const tread = formData?.tread ?? "";
  const riser = formData?.riser ?? "";

  const { isOpen: isVideoOpen, onOpen: onVideoOpen, onClose: onVideoClose } = useDisclosure();
  const { isOpen: isImageOpen, onOpen: onImageOpen, onClose: onImageClose } = useDisclosure();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (isLastStep) onSubmit();
    else onNext();
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
        <VStack spacing={4} align="stretch">
          {/* Heading */}
          <Text fontWeight="600" color="gray.700" fontSize="17px" mb={1} letterSpacing="-0.01em">
            Staircase Dimensions
          </Text>

          {/* Image Box - Clickable */}
          <Box
            bg="gray.50"
            borderRadius="12px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
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
              mb={2}
              p={2}
              bg="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="100%"
              mx="auto"
              h="180px"
              position="relative"
            >
              <Image
                src={StaircaseDimentionsImg}
                alt="Staircase"
                maxHeight="160px"
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

            {/* Play Button */}
            <Button
              leftIcon={<FiPlay />}
              colorScheme="cyan"
              size="sm"
              borderRadius="full"
              mt={2}
              onClick={(e) => {
                e.stopPropagation();
                onVideoOpen();
              }}
              _hover={{
                transform: "scale(1.05)",
              }}
              transition="all 0.2s ease"
            >
              Watch Tutorial
            </Button>
          </Box>

          {/* Inputs block */}
          <Box
            bg="white"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            p={4}
          >
            <VStack spacing={4} align="stretch">
              {/* Tread */}
              <Box>
                <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                  Tread (step depth)
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={tread}
                    onChange={(e) => handleChange("tread", e.target.value)}
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
                    inches
                  </Text>
                </Flex>
              </Box>

              {/* Riser */}
              <Box>
                <Text fontWeight="600" fontSize="14px" mb={2} color="gray.700">
                  Riser (step height)
                </Text>
                <Flex align="center" gap={2}>
                  <Input
                    value={riser}
                    onChange={(e) => handleChange("riser", e.target.value)}
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
                    inches
                  </Text>
                </Flex>
              </Box>
            </VStack>
          </Box>
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
            Staircase Dimensions - Enlarged View
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
              src={StaircaseDimentionsImg}
              alt="Staircase Dimensions - Enlarged"
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
        size="md"
        isCentered
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent 
          mx={4} 
          borderRadius="12px"
          maxW="400px"
        >
          <ModalHeader fontSize="16px" fontWeight="600" color="gray.700">
            Riser & Tread - Tutorial Video
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
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
                  height: "500px",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                }}
                src={RiserandThread}
              >
                Your browser does not support the video tag.
              </video>
            </Box>
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
