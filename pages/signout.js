import {
    VStack,
    Box,
    Heading,
    Button,
    useToast,
    Text,
    ScaleFade
} from "@chakra-ui/react"
import {useContext, useEffect, useState} from "react";
import fb from "../util/firebaseConfig";
import {useRouter} from "next/router";
import SessionContext from "../util/SessionContext";

export default function Login() {
    const [loading, toggleLoading] = useState(true)
    const router = useRouter()
    const toast = useToast()
    const {status} = useContext(SessionContext)

    // Check if user is already logged in, redirect home if they are
    useEffect(() => {
        if (status === 'ANON') {
            router.push('/')
        } else {
            fb.auth().signOut()
                .then(() => toggleLoading(false))
                .catch(() => toast({
                    title: "There was a problem signing you out",
                    description: "Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                }))
        }
    }, [])

    // Helper function that enables the loading state before routing the user
    const routePage = (href) => {
        toggleLoading(true)
        router.push(href)
    }

    return <ScaleFade initialScale={0.9} in={!loading}>
        <Box mt={[null, null, 48]} mx="auto" maxWidth={[null, null, "lg"]} borderWidth={[null, null, 0.25]}
             borderRadius={[null, null, 8]} overflow="hidden">
            <VStack p={8} py={12} spacing={4}>
                <VStack spacing={2} mb={4} textAlign="center">
                    <Heading>You're signed out</Heading>
                    <Text>You have signed out of your Hollar account. You may now close this window.</Text>
                </VStack>
                <VStack w="100%" spacing={4}>
                    <Button colorScheme="blue" onClick={() => routePage('/')} w="100%">Done</Button>
                    <Button colorScheme="blue" variant="link" onClick={() => routePage('/login')} w="100%">Log
                        back in</Button>
                </VStack>
            </VStack>
        </Box>
    </ScaleFade>
}