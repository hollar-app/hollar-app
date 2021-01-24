import Navbar from "../Navbar";
import NavbarComplete from "../NavbarComplete";
import {useEffect, useState} from "react";
import fb from "../../util/firebaseConfig";
import {useRouter} from "next/router";
import BusinessContext from "../../util/BusinessContext";
import {Fade, Box, Container, Heading, Text, Button, HStack, Center} from "@chakra-ui/react";

const links = [{title: 'Orders', href: '/business/orders'}, {title: 'Menu', href: '/business/menu'}, {
    title: 'Rewards',
    href: '/business/options'
}, {title: 'Customers', href: '/business/options'}, {title: 'Store Info', href: '/business/options'}]

export default function BusinessPageLayout({children, title}) {
    const [loading, toggleLoading] = useState(true)
    const [storeData, setStoreData] = useState({})

    const router = useRouter()
    const {businessID} = router.query

    useEffect(() => {
        // Fetch the current store from Firebase
        const firestore = fb.firestore()
        firestore.collection('store').doc(businessID).get()
            .then(res => {
                setStoreData({id: res.id, ...res.data()})
                toggleLoading(false)
            })
            .catch(error => setStoreData(error.message))
    }, [])

    return <BusinessContext.Provider value={storeData}>
        <NavbarComplete loading={loading}/>

        <Fade in={!loading}>
            <HStack w="100%" my={3} mx={[null, null, 9]} justifyContent={["center", null, "flex-start"]}>
                <Text>You're currently editing </Text>
                <Button onClick={() => {
                    toggleLoading(true)
                    router.push('/business/select')
                        .then(() => toggleLoading(false))
                }} ml={2} variant="link" colorScheme="blue">
                    {storeData.businessName}
                </Button>
            </HStack>
            <Container maxWidth="5xl" mt={4}>
                <Heading mb={4}>{title}</Heading>
                {children}
            </Container>
        </Fade>
    </BusinessContext.Provider>
}
