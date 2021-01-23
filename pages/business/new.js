import Navbar from "../../components/Navbar";
import {Container, Text, Heading, VStack, Input, Button, HStack, Spacer, Box, Select, useToast} from "@chakra-ui/react";
import stateNames from "../../util/stateNames";
import {useContext, useEffect, useReducer, useState} from "react";
import SessionContext from "../../util/SessionContext";
import {useRouter} from "next/router";
import fb from "../../util/firebaseConfig";


export default function NewBusiness() {
    const {status, user} = useContext(SessionContext)
    const router = useRouter()
    const toast = useToast()
    const [loading, toggleLoading] = useState(true)

    // Redirects unauthenticated users to the login screen
    useEffect(() => {
        if (status !== 'AUTHENTICATED') {
            router.push('/login')
        } else {
            toggleLoading(false)
        }
    }, [status])


    // Form data state object
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.target.name]: event.target.value
        }
    }
    const [formData, setFormData] = useReducer(formReducer, {
        name: "",
        website: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: ""
    });

    // Function that creates new business using form data
    const addBusiness = (event) => {
        event.preventDefault()
        toggleLoading(true)
        const firestore = fb.firestore()
        const now = new Date()

        // Create store object
        firestore.collection('store').add({
            createdBy: user.uid,
            createdAt: now,
            businessName: formData.businessName,
            website: formData.website,
            phone: formData.phone,
            address: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zip
            }
        })
            .then(() => router.push('/'))
            .catch(() => {
                toast({
                    title: "There was a problem creating your store",
                    description: "Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
                toggleLoading(false)
            })
    }

    return <>
        <Navbar loading={loading}/>
        <Container opacity={loading ? 0.5 : 1} maxWidth="lg" py={[12, null, 16]}>
            {/*Page heading*/}
            <VStack textAlign="center" spacing={1}>
                <Text fontSize="xl" opacity={0.75}>
                    Tell us more about your business
                </Text>
                <Heading as="h1" size="2xl">
                    Set up shop on Hollar
                </Heading>
            </VStack>

            {/*Form*/}
            <form onSubmit={addBusiness}>
                <Box my={12}>
                    {/*Business info fields*/}
                    <VStack w="100%">
                        <Input
                            name="businessName"
                            value={formData.businessName}
                            onChange={setFormData}
                            placeholder="Business name *" required size="md"/>
                        <Input name="website"
                               value={formData.website}
                               onChange={setFormData} placeholder="Website" type="url" size="md"/>
                        <Input name="phone"
                               value={formData.phone}
                               onChange={setFormData} placeholder="Phone number" type="tel" size="md"/>
                    </VStack>

                    {/*Add first location*/}
                    <VStack w="100%" mt={12} justifyContent="flex-start">
                        <HStack w="100%" mb={2}>
                            <Heading size="sm" as="h2">Add your location</Heading>
                            <Spacer/>
                        </HStack>
                        <Input name="address"
                               value={formData.address}
                               onChange={setFormData} placeholder="Street Address *" required size="md"/>
                        <Input name="city"
                               value={formData.city}
                               onChange={setFormData} placeholder="City *" type="text" required size="md"/>
                        <HStack w="100%">
                            <Select name="state"
                                    value={formData.state} required
                                    onChange={setFormData} placeholder="State *">
                                {stateNames.map(state => <option value={state}>{state}</option>)}
                            </Select>
                            <Input name="zip"
                                   value={formData.zip}
                                   onChange={setFormData} placeholder="ZIP Code *" type="text" inputmode="numeric"
                                   pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" required size="md"/>
                        </HStack>
                        {/*<HStack w="100%" pt={2}>*/}
                        {/*    <Button variant="link" fontSize="sm" leftIcon={<AddIcon fontSize="sm"/>}>Set hours of*/}
                        {/*        operation</Button>*/}
                        {/*    <Spacer/>*/}
                        {/*</HStack>*/}
                    </VStack>
                </Box>
                <Button type="submit" colorScheme="blue" size="lg" w="100%" isLoading={loading}>
                    Continue
                </Button>
                <Text fontSize="sm" opacity={0.5} mt={4}>
                    By clicking 'Continue', you agree to the Terms of Service and our Privacy Policy. We may
                    occasionally
                    send important, account-related emails.
                </Text>
            </form>
        </Container>
    </>
}