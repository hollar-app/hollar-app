import BusinessPageLayout from "../../../components/business/BusinessPageLayout";
import {useContext, useEffect, useState} from "react";
import {Button} from "@chakra-ui/react"
import BusinessContext from "../../../util/BusinessContext";
import {AddIcon} from "@chakra-ui/icons"
import Section from "../../../components/business/menu/Section";
import fb from "../../../util/firebaseConfig";

function PageContent () {
    const storeData = useContext(BusinessContext)
    const [sections, setSections] = useState([])

    useEffect(() => {
        // Fetch menu
        const firestore = fb.firestore()
        firestore.collection('menu').doc(storeData.id).collection('sections')
            .onSnapshot(snapshot => setSections(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))))
    }, [storeData])


    return <>
        {sections.map(section => <Section key={section.id} section={section} menuID={storeData.id}/>)}
        <Button leftIcon={<AddIcon/>} size="sm">
            Add Section
        </Button>
    </>
}
export default function Menu() {


    return <BusinessPageLayout title="Menu">
        <PageContent/>
    </BusinessPageLayout>
}