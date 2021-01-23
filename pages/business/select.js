import BusinessPageLayout from "../../components/business/BusinessPageLayout";
import Navbar from "../../components/Navbar";
import {Box, Button, Container, Heading, HStack, Input, Select, Spacer, Text, VStack} from "@chakra-ui/react";
import stateNames from "../../util/stateNames";
import {useState} from "react";

export default function SelectBusiness() {
    const [loading, toggleLoading] = useState(false)

    return <>
        <Navbar loading={loading}/>
        <Container opacity={loading ? 0.5 : 1} maxWidth="lg" py={[12, null, 16]}>
            {/*Page heading*/}
            <VStack textAlign="center" spacing={1}>
                <Heading as="h1" size="2xl">
                    Select a business
                </Heading>
                <Text fontSize="xl" opacity={0.75}>
                    Choose a business to continue to the business console
                </Text>
            </VStack>

            <VStack>
                
            </VStack>
        </Container>
    </>
}