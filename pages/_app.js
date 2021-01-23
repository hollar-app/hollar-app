import {ChakraProvider} from "@chakra-ui/react"
import {useEffect, useState} from "react";
import fb from "../util/firebaseConfig";
import SessionContext from "../util/SessionContext";

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState({status: 'LOADING', user: undefined})

    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                setSession({status: 'AUTHENTICATED', user: user})
            } else {
                // User is signed out.
                setSession({status: 'ANON', user: undefined})
            }
        });
    }, [])

    // Waits until the session is loaded before loading the page
    if (session.status === 'LOADING') return null

    return <SessionContext.Provider value={session}>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    </SessionContext.Provider>
}

export default MyApp
