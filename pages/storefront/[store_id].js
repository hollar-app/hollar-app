import Navbar from "../../components/Navbar";
import { Container, Text, Heading, VStack, Input, Button, HStack, Spacer, Box, Select, useToast } from "@chakra-ui/react";
import stateNames from "../../util/stateNames";
import { useContext, useEffect, useReducer, useState } from "react";
import SessionContext from "../../util/SessionContext";
import { useRouter } from "next/router";
import fb from "../../util/firebaseConfig";
import Storefront from "../../components/Storefront";


export default function StoreFront() {
    const { status, user } = useContext(SessionContext)
    const router = useRouter()
    const axios = require("axios")

    const [loadingStatus, setStatus] = useState('LOADING')


    const { store_id } = router.query

    const [menuData, setMenuData] = useState({})

    useEffect(() => {
        var getMenuData = fb.functions().httpsCallable('getStoreFrontMenu');
        getMenuData({ storeId: store_id })
            .then((result) => {
                const results = result.data;
                console.log(results)
                setMenuData(results)
            });
    }, [])

    return <>
        <Navbar />
        
        {/* <Container maxWidth="lg" py={[12, null, 16]}>
            <p>Store Id {store_id}</p>
        </Container> */}

        <Storefront pageData={menuData}/>
    </>
}