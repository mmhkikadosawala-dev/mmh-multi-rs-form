// src/features/Planning/pages/PlanningFormPage.jsx
import { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import Step1PlotShape from "../components/Step1PlotShape";
import Step2PlotDirection from "../components/Step2Direction";
import Step3Peripheries from "../components/Step3Peripheries";
import Step4PlotSize from "../components/Step4PlotSize";
import Step4PlotSizeNonRectangular from "../components/Step4PlotSizeNonRectengular";
import Step6ProjectType from "../components/Step6ProjecttypeandNumberofFloors";
import Step7MarkSetbacks from "../components/Step7MarkSetbacks";
import Step8PlotLevelInformation from "../components/Step8PlotLevelInformation";
import Step9StairType from "../components/Step9StairType";
import Step10ParkingRequirement from "../components/Step10ParkingRequirement";
import Step11GroundFloorRequirement from "../components/Step11GroundFloorRequirement";
import Step12ExistingSiteElements from "../components/Step12ExistingSiteElements";
import Step13StructureType from "../components/Step13StructureType";
import Step14ConstructionPrefrences from "../components/Step14ConstructionPrefrences";
import Step15WallDimentions from "../components/Step15WallDimentions";
import Step16WallDimentions from "../components/Step16WallDimentions";
import Step17StaircaseDimentions from "../components/Step17StaircaseDimentions";
import Step18BalconySlab from "../components/Step18BalconySlab";
import Step19AttachRegistryCopy from "../components/Step19AttachRegistryCopy";
import Step20ApproximateBudget from "../components/Step20ApproximateProjectBudget";

export default function PlanningFormPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    shape: "rectangular",
    direction: "north",
    peripheries: { right: "", back: "", left: "" },
    size: { width: "", depth: "", front: "", back: "", left: "", right: "" },
    projectType: "", // Added for new step
  });

  const containerWidth = useBreakpointValue({ base: "100%", md: "400px" });

  const steps = [
    { title: "Plot shape" },
    { title: "Direction" },
    { title: "Select peripheries" },
    { title: "Plot size" },
    { title: "Project Type" },
    { title: "Mark Setbacks" },
    { title: "Plot Level Information" },
    { title: "Stair Case" },
    { title: "Parking Requirement" },
    { title: "Floor Requirement" },
    { title: "Exisiting Site Elements" },
    { title: "Structure Type" },
    { title: "Construction Prefrences" },
    { title: "Construction Prefrences" },
    { title: "Wall Dimentions" },
    { title: "Wall Dimentions" },
    { title: "Staircase Dimentions" },
    { title: "Balcony Slab" },
    { title: "Attach Registry Copy" },
    { title: "Approximate Project Budget" },
    // Add future steps here, e.g., { title: "New Step" },
  ];

  const storeData = async (data) => {
    console.log('Storing data to database:', data);
    // Check if running in browser
    if (typeof window !== 'undefined') {
      localStorage.setItem('formData', JSON.stringify(data));
    }
  };

  const nextStep = async () => {
    await storeData(formData); // Store on next click
    console.log(`Form data after step ${step}:`, formData);
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    await storeData(formData); // Store on submit
    console.log("Form submitted:", formData);
    // In future, based on API response, show next page
    // e.g., const response = await fetch('/api/submit'); then navigate based on response
  };

  const isLastStep = (currentStep) => currentStep === steps.length - 1;

  const renderStep = () => {
    const props = {
      formData,
      setFormData,
      onBack: prevStep,
      onNext: nextStep,
      onSubmit: handleSubmit,
      isLastStep: isLastStep(step),
    };

    switch (step) {
      case 0:
        return <Step1PlotShape {...props} />;
      case 1:
        return <Step2PlotDirection {...props} />;
      case 2:
        return <Step3Peripheries {...props} />;
      case 3:
        const Component = formData.shape === "rectangular" ? Step4PlotSize : Step4PlotSizeNonRectangular;
        return <Component {...props} />;
      case 4:
        return <Step6ProjectType {...props} />;
      case 5:
        return <Step7MarkSetbacks {...props} />;
      case 6:
        return <Step8PlotLevelInformation {...props} />;
      case 7:
        return <Step9StairType {...props} />;
      case 8:
        return <Step10ParkingRequirement {...props} />;
      case 9:
        return <Step11GroundFloorRequirement {...props} />;
      case 10:
        return <Step12ExistingSiteElements {...props} />;
      case 11:
        return <Step13StructureType {...props} />;
      case 12:
        return <Step14ConstructionPrefrences {...props} />;
      case 13:
        return <Step15WallDimentions {...props} />;
      case 14:
        return <Step16WallDimentions {...props} />;
      case 15:
        return <Step17StaircaseDimentions {...props} />;
      case 16:
        return <Step18BalconySlab {...props} />;
      case 17:
        return <Step19AttachRegistryCopy {...props} />;
      case 18:
        return <Step20ApproximateBudget {...props} />;
      case 19:
        return <Step20ApproximateBudget {...props} />;
      // Add future cases here, e.g., case 5: return <NewStepComponent {...props} />;
      default:
        return null;
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box
        w={containerWidth}
        bg={useColorModeValue("gray.50", "gray.800")}
        px={6}
        py={6}
        borderRadius="lg"
        boxShadow="lg"
        display="flex"
        flexDirection="column"
      >
        {/* Progress Bar */}
        <Box mb={4} px={2}>
          <Box 
            h="6px" 
            bg="gray.300" 
            borderRadius="full" 
            overflow="hidden"
            position="relative"
          >
            <Box
              h="100%"
              bg="teal.500"
              borderRadius="full"
              transition="width 0.3s ease"
              width={`${((step + 1) / steps.length) * 100}%`}
            />
          </Box>
          <Flex justify="space-between" mt={2} fontSize="xs" color="gray.600">
            <Box>Step {step + 1} of {steps.length}</Box>
            <Box>{Math.round(((step + 1) / steps.length) * 100)}%</Box>
          </Flex>
        </Box>

        <Heading size="md" mb={6} textAlign="left" fontWeight="semibold">
          Planning Form
        </Heading>

        <Box flex="1">{renderStep()}</Box>
      </Box>
    </Flex>
  );
}