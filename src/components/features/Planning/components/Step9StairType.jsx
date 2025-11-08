import {
    Box,
    Flex,
    Text,
    Radio,
    Button,
    VStack,
    Image,
} from "@chakra-ui/react";
import InteriorStair from "../../../../assets/Planning/StairType/InteriorStair.png";
import ExteriorImage from "../../../../assets/Planning/StairType/ExteriorStair.png";

export default function Step9StairType({
    formData,
    setFormData,
    onNext,
    onSubmit,
    onBack,
    isLastStep,
}) {
    const stairType = formData.stairType ?? "internal";

    const updateStairType = (value) => {
        setFormData({ ...formData, stairType: value });
    };

    const handleAction = isLastStep ? onSubmit : onNext;

    return (
        <Box minHeight="500px" px={4}>
            <VStack spacing={4} maxWidth="400px" mx="auto" align="stretch">

                {/* Title just like the screenshot */}
                <Text fontSize="lg" fontWeight="bold" color="blue.700" mb={1}>
                    Stair Type
                </Text>

                {/* Internal stair option */}
                <Box
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="sm"
                    border={stairType === "internal" ? "2px solid #319795" : "1px solid #E2E8F0"}
                >
                    <Image
                        src={InteriorStair}
                        alt="Internal Stair"
                        width="100%"
                        height="160px"
                        objectFit="cover"
                        borderTopRadius="lg"
                    />
                    <Flex align="center" py={2} px={3}>
                        <Radio
                            value="internal"
                            colorScheme="teal"
                            isChecked={stairType === "internal"}
                            onChange={() => updateStairType("internal")}
                            mr={2}
                        />
                        <Text fontSize="md" color="gray.700" ml={2}>Internal</Text>
                    </Flex>
                </Box>

                {/* External stair option */}
                <Box
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="sm"
                    border={stairType === "external" ? "2px solid #319795" : "1px solid #E2E8F0"}
                >
                    <Image
                        src={ExteriorImage}
                        alt="External Stair"
                        width="100%"
                        height="160px"
                        objectFit="cover"
                        borderTopRadius="lg"
                    />
                    <Flex align="center" py={2} px={3}>
                        <Radio
                            value="external"
                            colorScheme="teal"
                            isChecked={stairType === "external"}
                            onChange={() => updateStairType("external")}
                            mr={2}
                        />
                        <Text fontSize="md" color="gray.700" ml={2}>External</Text>
                    </Flex>
                </Box>
            </VStack>

            {/* Navigation Buttons, just like screenshot */}
            <Flex justifyContent="space-between" mt={8} maxWidth="400px" mx="auto">
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
                <Button onClick={handleAction} colorScheme="teal" size="md" fontWeight="500" px={8}>
                    {isLastStep ? "Submit" : "Next →"}
                </Button>
            </Flex>
        </Box>
    );
}
