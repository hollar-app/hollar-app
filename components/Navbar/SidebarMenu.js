import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay, HStack,
    IconButton,
    VStack,
    Button
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {useRef, useState} from "react";
import {useRouter} from "next/router";

// A sidebar to display the links on mobile
export default function SidebarMenu({links = []}) {
    const btnRef = useRef()
    const [isOpen, toggleIsOpen] = useState(false)
    const router = useRouter()

    return <>
        <IconButton ref={btnRef} hidden={links.length < 1}
                    onClick={() => toggleIsOpen(true)}
                    aria-label="Search database" variant="ghost" icon={<HamburgerIcon fontSize="2xl"/>}/>
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={() => toggleIsOpen(false)}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader></DrawerHeader>

                    <DrawerBody>
                        <VStack w="100%">
                            {links.map((link, index) => <Button w="100%" justifyContent="flex-start" variant="ghost" key={index}
                                                                onClick={() => router.push(link.href)}>{link.title}</Button>)}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    </>
}