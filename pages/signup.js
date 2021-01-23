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

export default function SignUp() {
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)
    const router = useRouter()
    const toast = useToast()
    const {status} = useContext(SessionContext)

    // Handle form submit and sign in to Firebase auth
    const signIn = (event) => {
        event.preventDefault()
        event.persist()

        // Toggle loading to true to display spinner and to disable submit button
        toggleLoading(true)
        const auth = fb.auth()
        auth.createUserWithEmailAndPassword(event.target.email.value, event.target.password.value)
            .then(() => {
                const currentUser = auth.currentUser
                currentUser.updateProfile({
                    displayName: event.target.name.value
                })
                    .then(() => {
                        // Account created; redirect to home page and clear active toasts
                        router.push('/')
                        toast.closeAll()
                    })
                    .catch(() => {
                        toast({
                            title: "There was a problem creating your account",
                            description: "Please check your information and try again.",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                        currentUser.delete()
                            .then(() => toggleLoading(false))
                    })
            })
            .catch(error => {
                // Handle errors; display an error toast to user
                console.log(error)
                toggleError(true)
                toggleLoading(false)
                toast({
                    title: "Error",
                    description: error.message,
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
                        <Heading as="h1" size="lg">Welcome to Hollar</Heading>
                        <Text>Get started by creating your Hollar account</Text>
                    </VStack>
                    <VStack w="100%" spacing={4}>
                        <Input isInvalid={error} id="name" required placeholder="Full Name" size="lg" autoComplete="name"/>
                        <Input isInvalid={error} id="email" required placeholder="Email Address" type="email" size="lg" autoComplete="email"/>
                        <Input isInvalid={error} id="password" required placeholder="Password" type="password" autoComplete="new-password"
                               size="lg"/>
                        <Input isInvalid={error} id="confirm_password" required placeholder="Confirm Password" type="password"
                               size="lg"/>
                        <HStack w="100%">
                            <Text fontSize="sm" opacity={0.75}>By clicking 'Create Account', you agree to our Terms of Service and our Privacy Policy.</Text>
                            <Spacer/>
                        </HStack>
                    </VStack>

                    <HStack pt={6} w="100%">
                        <Button onClick={() => {
                            toggleLoading(true)
                            router.push('/login')
                        }} colorScheme="blue" variant="link">Log in</Button>
                        <Spacer/>
                        <Button isLoading={loading} colorScheme="blue" type="submit">Create Account</Button>
                    </HStack>
                </VStack>
            </form>

        </Box>
    </ScaleFade>
}