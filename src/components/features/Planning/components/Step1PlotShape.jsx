// src/features/Planning/components/Step1PlotShape.jsx
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import RectangularImage from "../../../../assets/Planning/Step1PlotShape/rectangular 1.png";
import NonRectangular from "../../../../assets/Planning/Step1PlotShape/ir-rectungalar 1.png";

export default function Step1PlotShape({ formData, setFormData, onNext, onSubmit, isLastStep }) {
  const imageBoxHeight = useBreakpointValue({ base: "160px", md: "200px" });
  const imageBoxWidth = useBreakpointValue({ base: "140px", md: "180px" });
  const containerMinHeight = useBreakpointValue({ base: "420px", md: "480px" });

  const rectangularImage = (
    <img
      src={RectangularImage}
      alt="Rectangular Plot"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
    />
  );

  const irregularImage = (
    <img
      src={NonRectangular}
      alt="Irregular Plot"
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
    />
  );

  const handleAction = isLastStep ? onSubmit : onNext;

  return (
    <Box minHeight={containerMinHeight} display="flex" flexDirection="column" justifyContent="space-between" px={4}>
      <RadioGroup
        onChange={(value) => setFormData({ ...formData, shape: value })}
        value={formData.shape}
      >
        <Stack direction="column" spacing={6}>
          {/* Rectangular Option */}
          <Box>
            <Radio
              value="rectangular"
              colorScheme="teal"
              mb={2}
              size="sm"
            >
              <Text fontSize="sm" fontWeight="500" color="gray.700">
                Rectangular / Regular
              </Text>
            </Radio>
            <Flex
              align="center"
              justify="center"
              direction="column"
              border="1px"
              borderColor={formData.shape === "rectangular" ? "teal.500" : "gray.200"}
              borderWidth={formData.shape === "rectangular" ? "2px" : "1px"}
              p={3}
              rounded="md"
              height={imageBoxHeight}
              width={imageBoxWidth}
              mx="auto"
            >
              {rectangularImage}
            </Flex>
          </Box>

          {/* Irregular Option */}
          <Box>
            <Radio
              value="irregular"
              colorScheme="teal"
              mb={2}
              size="sm"
            >
              <Text fontSize="sm" fontWeight="500" color="gray.700">
                Non-Rectangular
              </Text>
            </Radio>
            <Flex
              align="center"
              justify="center"
              direction="column"
              border="1px"
              borderColor={formData.shape === "irregular" ? "teal.500" : "gray.200"}
              borderWidth={formData.shape === "irregular" ? "2px" : "1px"}
              p={3}
              rounded="md"
              height={imageBoxHeight}
              width={imageBoxWidth}
              mx="auto"
            >
              {irregularImage}
            </Flex>
          </Box>
        </Stack>
      </RadioGroup>

      {/* Navigation */}
      <Flex justify="flex-end" mt={6}>
        <Button
          colorScheme="teal"
          onClick={handleAction}
          isDisabled={!formData.shape}
          size="sm"
          fontWeight="500"
        >
          {isLastStep ? 'Submit' : 'Next →'}
        </Button>
      </Flex>
    </Box>
  );
}