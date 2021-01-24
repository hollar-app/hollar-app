import BusinessPageLayout from "../../../components/business/BusinessPageLayout";
import {useContext, useEffect, useState} from "react";
import {HStack, CloseIcon, Button, Popover, PopoverTrigger, Input, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody} from "@chakra-ui/react"
import BusinessContext from "../../../util/BusinessContext";
import {AddIcon} from "@chakra-ui/icons"
import Section from "../../../components/business/menu/Section";
import fb from "../../../util/firebaseConfig";

function PageContent () {
    const storeData = useContext(BusinessContext)
    const [sections, setSections] = useState([])
    const firestore = fb.firestore()
    const sectionsRef = firestore.collection('menu').doc(storeData.id).collection('sections')

    const [addButtonIsOpen, toggleAddButtonIsOpen] = useState(false)

    useEffect(() => {
        // Fetch menu
        sectionsRef.onSnapshot(snapshot => setSections(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))))
    }, [storeData])

    const createSection = (event) => {
        event.preventDefault()
        toggleAddButtonIsOpen(false)
        sectionsRef.add({
            sectionTitle: event.target.sectionName.value
        })
    }

    return <>
        {sections.map(section => <Section key={section.id} section={section} menuID={storeData.id}/>)}
        <Popover onOpen={() => toggleAddButtonIsOpen(true)} isOpen={addButtonIsOpen} onClose={() => toggleAddButtonIsOpen(false)}>
            <PopoverTrigger>
                <Button leftIcon={<AddIcon/>} size="sm">
                    Add Section
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Create a new section</PopoverHeader>
                <PopoverBody>
                    <form onSubmit={createSection}>
                        <HStack>
                            <Input placeholder="New section title" id="sectionName"/>
                            <Button size="sm" variant="link" type="submit">Create</Button>
                        </HStack>
                    </form>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </>
}
export default function Menu() {


    return <BusinessPageLayout title="Menu">
        <PageContent/>
    </BusinessPageLayout>
}