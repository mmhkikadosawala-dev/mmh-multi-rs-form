// src/features/Planning/components/Step3ProjectTypeAndFloors.jsx
import {
    Box,
    Flex,
    Text,
    Radio,
    RadioGroup,
    Stack,
    useBreakpointValue,
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
    const containerMinHeight = useBreakpointValue({ base: "500px", md: "600px" });
  
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
  
    const handleAction = isLastStep ? onSubmit : onNext;
  
    return (
      <Box minHeight={containerMinHeight} px={4}>
        <VStack spacing={6} maxWidth="400px" mx="auto" align="stretch">
          
          {/* Project Type Section */}
          <Box>
            <Text 
              fontSize="md" 
              fontWeight="600" 
              mb={4} 
              color="gray.700"
            >
              Project Type
            </Text>
            
            <Box border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
              <RadioGroup
                onChange={updateProjectType}
                value={formData.projectType || ""}
              >
                <VStack spacing={0} align="stretch">
                  {projectTypes.map(({ key, label, icon, bgColor }, index) => (
                    <Box key={key}>
                      <Box px={4} py={3} bg="white" _hover={{ bg: "gray.50" }}>
                        <Radio 
                          value={key} 
                          colorScheme="teal" 
                          size="md"
                          w="full"
                        >
                          <Flex align="center" gap={3}>
                            <Box 
                              w="20px" 
                              h="20px" 
                              bg={bgColor} 
                              borderRadius="sm" 
                              display="flex" 
                              alignItems="center" 
                              justifyContent="center"
                              fontSize="xs"
                            >
                              {icon}
                            </Box>
                            <Text fontSize="sm" color="gray.700" fontWeight="500">
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
              fontSize="md" 
              fontWeight="600" 
              mb={4} 
              color="gray.700"
            >
              Numbers of Floors
            </Text>
            
            <Box border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
              <RadioGroup
                onChange={updateFloors}
                value={formData.numberOfFloors || ""}
              >
                <VStack spacing={0} align="stretch">
                  {floorOptions.map(({ key, label }, index) => (
                    <Box key={key}>
                      <Box px={4} py={3} bg="white" _hover={{ bg: "gray.50" }}>
                        <Radio 
                          value={key} 
                          colorScheme="teal" 
                          size="md"
                          w="full"
                        >
                          <Text fontSize="sm" color="gray.700" fontWeight="500">
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
  
        {/* Navigation Buttons */}
        <Flex 
          justifyContent="space-between" 
          mt={8} 
          maxWidth="400px" 
          mx="auto"
        >
          <Button
            onClick={onBack}
            variant="outline"
            colorScheme="gray"
            size="md"
            fontWeight="500"
            px={6}
          >
            ← Previous
          </Button>
          <Button
            onClick={handleAction}
            colorScheme="teal"
            size="md"
            fontWeight="500"
            px={8}
          >
            {isLastStep ? 'Submit' : 'Next →'}
          </Button>
        </Flex>
      </Box>
    );
  }
  