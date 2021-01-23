import {
    VStack,
    Input,
    Box,
    Heading,
    HStack,
    Button,
    Spacer,
    useToast,
    Text,
    Progress,
    ScaleFade
} from "@chakra-ui/react"
import {useContext, useEffect, useState} from "react";
import fb from "../util/firebaseConfig";
import {useRouter} from "next/router";
import SessionContext from "../util/SessionContext";

export default function Login() {
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)
    const router = useRouter()
    const toast = useToast()
    const {status} = useContext(SessionContext)

    // Handle form submit and sign in to Firebase auth
    const signIn = (event) => {
        event.preventDefault()

        // Toggle loading to true to display spinner and to disable submit button
        toggleLoading(true)
        fb.auth().signInWithEmailAndPassword(event.target.email.value, event.target.password.value)
            .then(() => {
                // Sign in successful; redirect to home page and clear active toasts
                router.push('/')
                toast.closeAll()
            })
            .catch(error => {
                // Handle errors; display an error toast to user
                console.log(error)
                toggleError(true)
                toggleLoading(false)
                toast({
                    title: "Error",
                    description: "Invalid email or password.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    // Check if user is already logged in, redirect home if they are
    useEffect(() => {
        if (status === 'AUTHENTICATED') {
            router.push('/')
        }
    }, [status])

    return <ScaleFade initialScale={0.9} in={status === 'ANON'}>
        <Box mt={[null, null, 48]} mx="auto" maxWidth={[null, null, "lg"]} borderWidth={[null, null, 0.25]}
             borderRadius={[null, null, 8]} overflow="hidden">
            <Progress size="xs" isIndeterminate opacity={+loading}/>
            <form onSubmit={signIn}>
                {/*When loading, form fades out and becomes unclickable*/}
                <VStack opacity={loading ? 0.25 : 1} pointerEvents={loading && "none"} p={8} py={12} spacing={4}>
                    <VStack spacing={2} mb={6} textAlign="center">
                        <Heading>Log in</Heading>
                        <Text>Continue with your Hollar Account</Text>
                    </VStack>
                    <VStack w="100%" spacing={4}>
                        <Input isInvalid={error} id="email" required placeholder="Email" size="lg"/>
                        <Input isInvalid={error} id="password" required placeholder="Password" type="password"
                               size="lg"/>
                        <HStack w="100%">
                            <Button onClick={() => router.push('/signup')} colorScheme="blue" variant="link" size="sm">Forgot
                                password?</Button>
                            <Spacer/>
                        </HStack>
                    </VStack>

                    <HStack pt={6} w="100%">
                        <Button onClick={() => {
                            toggleLoading(true)
                            router.push('/signup')
                        }} colorScheme="blue" variant="link">Create
                            account</Button>
                        <Spacer/>
                        <Button isLoading={loading} colorScheme="blue" type="submit">Log in</Button>
                    </HStack>
                </VStack>
            </form>

        </Box>
    </ScaleFade>
}