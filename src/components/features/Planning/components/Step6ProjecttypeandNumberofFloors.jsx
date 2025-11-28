// src/features/Planning/components/Step3ProjectTypeAndFloors.jsx
import {
  Box,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Button,
  VStack,
  Divider,
} from "@chakra-ui/react";

const projectTypes = [
  { 
    key: "residential", 
    label: "Residential",
    icon: "🏠",
    bgColor: "orange.100"
  },
  { 
    key: "commercial", 
    label: "Commercial",
    icon: "🏢",
    bgColor: "orange.100"
  },
];

const floorOptions = [
  { key: "ground", label: "Ground" },
  { key: "ground+1", label: "Ground+1" },
  { key: "ground+2", label: "Ground+2" },
  { key: "ground+3", label: "Ground+3" },
  { key: "ground+4", label: "Ground+4" },
  { key: "ground+5", label: "Ground+5" },
];

export default function Step3ProjectTypeAndFloors({ 
  formData, 
  setFormData, 
  onNext, 
  onSubmit, 
  onBack, 
  isLastStep 
}) {
  const updateProjectType = (value) => {
    setFormData({
      ...formData,
      projectType: value,
    });
  };

  const updateFloors = (value) => {
    setFormData({
      ...formData,
      numberOfFloors: value,
    });
  };

  // Validation: Check if both project type and floors are selected
  const isValid = () => {
    return formData.projectType && formData.numberOfFloors;
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
      {/* Scrollable Content Area */}
      <Box 
        flex="1" 
        overflowY="auto"
        overflowX="hidden"
        pr={2}
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cbd5e0',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a0aec0',
          },
        }}
      >
        <VStack spacing={5} align="stretch">
          
          {/* Project Type Section */}
          <Box>
            <Text 
              fontSize="14px" 
              fontWeight="600" 
              mb={3} 
              color="gray.700"
              letterSpacing="-0.01em"
            >
              Project Type <Text as="span" color="red.500">*</Text>
            </Text>
            
            <Box 
              border="1px" 
              borderColor="gray.200" 
              borderRadius="8px" 
              overflow="hidden"
              bg="white"
            >
              <RadioGroup
                onChange={updateProjectType}
                value={formData.projectType || ""}
              >
                <VStack spacing={0} align="stretch">
                  {projectTypes.map(({ key, label, icon, bgColor }, index) => (
                    <Box key={key}>
                      <Box 
                        px={4} 
                        py={3} 
                        bg={formData.projectType === key ? "cyan.50" : "white"}
                        _hover={{ bg: formData.projectType === key ? "cyan.50" : "gray.50" }}
                        transition="all 0.2s ease"
                        cursor="pointer"
                      >
                        <Radio 
                          value={key} 
                          colorScheme="cyan" 
                          size="md"
                          w="full"
                        >
                          <Flex align="center" gap={3}>
                            <Box 
                              w="24px" 
                              h="24px" 
                              bg={bgColor} 
                              borderRadius="6px" 
                              display="flex" 
                              alignItems="center" 
                              justifyContent="center"
                              fontSize="14px"
                            >
                              {icon}
                            </Box>
                            <Text fontSize="14px" color="gray.700" fontWeight="500">
                              {label}
                            </Text>
                          </Flex>
                        </Radio>
                      </Box>
                      {index < projectTypes.length - 1 && (
                        <Divider borderColor="gray.200" />
                      )}
                    </Box>
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
          </Box>

          {/* Number of Floors Section */}
          <Box>
            <Text 
              fontSize="14px" 
              fontWeight="600" 
              mb={3} 
              color="gray.700"
              letterSpacing="-0.01em"
            >
              Number of Floors <Text as="span" color="red.500">*</Text>
            </Text>
            
            <Box 
              border="1px" 
              borderColor="gray.200" 
              borderRadius="8px" 
              overflow="hidden"
              bg="white"
            >
              <RadioGroup
                onChange={updateFloors}
                value={formData.numberOfFloors || ""}
              >
                <VStack spacing={0} align="stretch">
                  {floorOptions.map(({ key, label }, index) => (
                    <Box key={key}>
                      <Box 
                        px={4} 
                        py={3} 
                        bg={formData.numberOfFloors === key ? "cyan.50" : "white"}
                        _hover={{ bg: formData.numberOfFloors === key ? "cyan.50" : "gray.50" }}
                        transition="all 0.2s ease"
                        cursor="pointer"
                      >
                        <Radio 
                          value={key} 
                          colorScheme="cyan" 
                          size="md"
                          w="full"
                        >
                          <Text fontSize="14px" color="gray.700" fontWeight="500">
                            {label}
                          </Text>
                        </Radio>
                      </Box>
                      {index < floorOptions.length - 1 && (
                        <Divider borderColor="gray.200" />
                      )}
                    </Box>
                  ))}
                </VStack>
              </RadioGroup>
            </Box>
          </Box>
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
