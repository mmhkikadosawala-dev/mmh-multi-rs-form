// src/features/Planning/components/Step1PlotShape.jsx
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import RectangularImage from "../../../../assets/Planning/Step1PlotShape/rectangular 1.png";
import NonRectangular from "../../../../assets/Planning/Step1PlotShape/ir-rectungalar 1.png";

export default function Step1PlotShape({ formData, setFormData, onNext, onPrevious, onSubmit, isLastStep, isFirstStep }) {
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
        <RadioGroup
          onChange={(value) => setFormData({ ...formData, shape: value })}
          value={formData.shape}
        >
          <Stack direction="column" spacing={6}>
            {/* Rectangular Option */}
            <Box>
              <Radio
                value="rectangular"
                colorScheme="cyan"
                mb={3}
                size="md"
              >
                <Text fontSize="16px" fontWeight="600" color="gray.700" letterSpacing="-0.01em">
                  Rectangular / Regular
                </Text>
              </Radio>
              <Flex
                align="center"
                justify="center"
                border="2px solid"
                borderColor={formData.shape === "rectangular" ? "cyan.500" : "gray.200"}
                bg={formData.shape === "rectangular" ? "cyan.50" : "white"}
                p={4}
                borderRadius="12px"
                height="200px"
                width="180px"
                mx="auto"
                transition="all 0.2s ease"
                _hover={{
                  borderColor: "cyan.300",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={RectangularImage}
                  alt="Rectangular Plot"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </Flex>
            </Box>

            {/* Irregular Option */}
            <Box>
              <Radio
                value="irregular"
                colorScheme="cyan"
                mb={3}
                size="md"
              >
                <Text fontSize="16px" fontWeight="600" color="gray.700" letterSpacing="-0.01em">
                  Non-Rectangular
                </Text>
              </Radio>
              <Flex
                align="center"
                justify="center"
                border="2px solid"
                borderColor={formData.shape === "irregular" ? "cyan.500" : "gray.200"}
                bg={formData.shape === "irregular" ? "cyan.50" : "white"}
                p={4}
                borderRadius="12px"
                height="200px"
                width="180px"
                mx="auto"
                transition="all 0.2s ease"
                _hover={{
                  borderColor: "cyan.300",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={NonRectangular}
                  alt="Irregular Plot"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </Flex>
            </Box>
          </Stack>
        </RadioGroup>
      </Box>

      {/* Fixed Navigation Buttons */}
      <Flex justify="space-between" gap={3}>
        {!isFirstStep && (
          <Button
            onClick={onPrevious}
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
        )}
        
        <Button
          onClick={handleAction}
          isDisabled={!formData.shape}
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
