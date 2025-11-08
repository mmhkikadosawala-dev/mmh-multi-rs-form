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
      <VStack minH="500px" px={4} maxW="400px" mx="auto" align="stretch">
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.100"
          p={5}
          mb={0}
        >
          {/* Heading */}
          <Text fontWeight="bold" color="blue.700" fontSize="lg" mb={2}>
            Attach Plot Image / Registry Copy <br /> <span style={{fontWeight: 400, color: "#1e90ff"}}>(if available)</span>
          </Text>
  
          {/* Radio */}
          <RadioGroup value={attach} onChange={handleRadio} mb={4} mt={2}>
            <Flex gap={8}>
              <Radio value="yes" colorScheme="cyan">Yes</Radio>
              <Radio value="no" colorScheme="cyan">No</Radio>
            </Flex>
          </RadioGroup>
          
          {/* File Drop Zone - show only if 'Yes' */}
          {attach === "yes" && (
            <Box
              mt={2}
              mb={1}
              border="1.5px dashed #32B2FF"
              borderRadius="lg"
              p={6}
              display="flex"
              alignItems="center"
              flexDirection="column"
              bg="gray.50"
              textAlign="center"
              cursor="pointer"
              minH="100px"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
            >
              <Box fontSize="38px" color="cyan.400" mb={1}>⛅</Box>
              <Text fontSize="md" color="gray.500" mb={1}>
                Drag &amp; drop files or{' '}
                <span
                  style={{ color: "#2196f3", cursor: "pointer", fontWeight: 500, textDecoration: "underline" }}
                  onClick={e => {e.stopPropagation(); fileInputRef.current?.click();}}
                >Browse</span>
              </Text>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFile}
                accept="image/*,.pdf"
              />
              {file && <Text color="teal.600" fontSize="sm" mt={1}>{file.name}</Text>}
            </Box>
          )}
        </Box>
  
        {/* Navigation Buttons */}
        <Flex
          justify="space-between"
          mt={8}
          maxW="400px"
          mx="auto"
          gap={3}
        >
          <Button
            onClick={onBack}
            variant="outline"
            borderColor="cyan.300"
            color="cyan.700"
            size="md"
            fontWeight="500"
            px={7}
          >
            &#xab; Previous
          </Button>
          <Button
            onClick={handleNext}
            colorScheme="cyan"
            size="md"
            fontWeight="500"
            px={8}
          >
            {isLastStep ? "Submit" : "Next \u00bb"}
          </Button>
        </Flex>
      </VStack>
    );
  }
  