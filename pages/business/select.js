import BusinessPageLayout from "../../components/business/BusinessPageLayout";
import Navbar from "../../components/Navbar";
import {Box, Button, Container, Heading, HStack, Input, Select, Spacer, Text, VStack} from "@chakra-ui/react";
import stateNames from "../../util/stateNames";
import {useEffect, useState} from "react";
import fb from "../../util/firebaseConfig";

export default function SelectBusiness() {
    const [loading, toggleLoading] = useState(false)
    const [stores, setStores] = useState([])
    useEffect(() => {
        fb.firestore().collection('store').onSnapshot((snapshots) => setStores(
            snapshots.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))))
    }, [])
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
                {JSON.stringify(stores)}
            </VStack>
        </Container>
    </>
}