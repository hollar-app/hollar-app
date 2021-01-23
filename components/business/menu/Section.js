import {
    Box,
    HStack,
    Editable,
    EditablePreview,
    EditableInput,
    ButtonGroup,
    IconButton,
    Flex,
    VStack,
    Text
} from "@chakra-ui/react"
import {CheckIcon, CloseIcon, EditIcon, DeleteIcon, AddIcon} from "@chakra-ui/icons"
import fb from "../../../util/firebaseConfig";

export default function SectionCard({section, menuID}) {
    const firestore = fb.firestore()
    const sectionRef = firestore.collection('menu').doc(menuID).collection('sections').doc(section.id)

    function EditableTitle({value, onChange}) {
        /* Here's a custom control */
        function EditableControls({isEditing, onSubmit, onCancel, onEdit}) {
            return isEditing ? (
                <ButtonGroup justifyContent="center" size="sm">
                    <IconButton icon={<CheckIcon/>} onClick={onSubmit}/>
                    <IconButton icon={<CloseIcon/>} onClick={onCancel}/>
                </ButtonGroup>
            ) : (
                <Flex justifyContent="center">
                    <IconButton size="sm" icon={<EditIcon/>} onClick={onEdit}/>
                </Flex>
            )
        }

        return (
            <Editable
                textAlign="center"
                defaultValue={value}
                onSubmit={onChange}
                fontSize="xl"
                fontWeight={600}
                isPreviewFocusable={false}
                submitOnBlur={false}
            >
                {(props) => (
                    <HStack>
                        <EditablePreview/>
                        <EditableInput/>
                        <EditableControls {...props} />
                    </HStack>
                )}
            </Editable>
        )
    }

    const changeTitle = (newTitle) => {
        sectionRef.update({sectionTitle: newTitle})
    }

    const deleteSection = () => {
        sectionRef.delete()
    }

    return <Box w="100%" borderWidth={0.25} borderRadius={8} mb={4}>
        <HStack justifyContent="space-between" p={3}>
            <EditableTitle value={section.sectionTitle} onChange={value => changeTitle(value)}/>
            <HStack>
                <IconButton icon={<AddIcon/>}/>
                <IconButton onClick={deleteSection} icon={<DeleteIcon/>}/>
            </HStack>

        </HStack>

        <VStack p={3}>
            {section.items.map((item, index) => <HStack w="100%" justifyContent="space-between" pb={2} px={2}
                                                        borderBottomWidth={(index !== (section.items.length - 1)) && 0.25}>
                <HStack>
                    <Box key={index}>
                        <Text fontWeight={600}>{item.title} (${item.cost})</Text>
                        <Text fontSize="sm">Item Description</Text>
                    </Box>
                </HStack>
            </HStack>)}
        </VStack>

    </Box>
}