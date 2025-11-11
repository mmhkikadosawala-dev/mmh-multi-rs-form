// src/features/Planning/components/StepAttachPlotImage.jsx
import {
  Box,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function StepAttachPlotImage({
  formData,
  setFormData,
  onNext,
  onBack,
  isLastStep,
  onSubmit,
}) {
  const attach = formData?.attachPlotImage ?? "";
  const file = formData?.plotFile ?? null;
  const fileInputRef = useRef();

  const handleRadio = (value) => {
    setFormData({ ...formData, attachPlotImage: value });
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, plotFile: file });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    setFormData({ ...formData, plotFile: droppedFile });
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
          <Box>
            <Text fontWeight="600" color="gray.700" fontSize="17px" letterSpacing="-0.01em">
              Attach Plot Image / Registry Copy
            </Text>
            <Text fontWeight="400" color="cyan.600" fontSize="14px" mt={1}>
              (if available)
            </Text>
          </Box>

          {/* Radio Options - Card Style */}
          <Box
            bg="white"
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.200"
            p={4}
          >
            <Text fontWeight="600" fontSize="14px" mb={3} color="gray.700">
              Do you want to attach files?
            </Text>
            <RadioGroup value={attach} onChange={handleRadio}>
              <Flex gap={6}>
                <Box
                  flex="1"
                  p={3}
                  bg={attach === "yes" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={attach === "yes" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  onClick={() => handleRadio("yes")}
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="yes" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">Yes</Text>
                  </Radio>
                </Box>
                <Box
                  flex="1"
                  p={3}
                  bg={attach === "no" ? "cyan.50" : "white"}
                  border="1px solid"
                  borderColor={attach === "no" ? "cyan.500" : "gray.200"}
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  cursor="pointer"
                  onClick={() => handleRadio("no")}
                  _hover={{
                    borderColor: "cyan.300",
                    bg: "cyan.50",
                  }}
                >
                  <Radio value="no" colorScheme="cyan" size="md">
                    <Text fontSize="14px" fontWeight="500" color="gray.700">No</Text>
                  </Radio>
                </Box>
              </Flex>
            </RadioGroup>
          </Box>

          {/* File Drop Zone - show only if 'Yes' */}
          {attach === "yes" && (
            <Box
              border="1.5px dashed"
              borderColor="cyan.400"
              borderRadius="12px"
              p={6}
              display="flex"
              alignItems="center"
              flexDirection="column"
              bg="cyan.50"
              textAlign="center"
              cursor="pointer"
              minH="140px"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              transition="all 0.2s ease"
              _hover={{
                borderColor: "cyan.500",
                bg: "cyan.100",
              }}
            >
              <Box fontSize="48px" mb={2}>📁</Box>
              <Text fontSize="15px" color="gray.700" mb={1} fontWeight="500">
                Drag & drop files or{" "}
                <Text
                  as="span"
                  color="cyan.600"
                  fontWeight="600"
                  textDecoration="underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse
                </Text>
              </Text>
              <Text fontSize="13px" color="gray.500">
                Supported: Images, PDF
              </Text>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFile}
                accept="image/*,.pdf"
              />
              {file && (
                <Box
                  mt={3}
                  p={2}
                  bg="white"
                  borderRadius="6px"
                  border="1px solid"
                  borderColor="cyan.300"
                >
                  <Text color="cyan.700" fontSize="13px" fontWeight="500">
                    📄 {file.name}
                  </Text>
                </Box>
              )}
            </Box>
          )}
        </VStack>
      </Box>

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
