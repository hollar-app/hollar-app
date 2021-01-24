import {
    Avatar,
    Box,
    HStack,
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Spacer,
    useColorMode,
    Progress
} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons"
import {useContext} from "react";
import SessionContext from "../../util/SessionContext";
import {useRouter} from "next/router";
import SidebarMenu from "./SidebarMenu";
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function Navbar({links = [], loading, showCart=false}) {
    const {status, user} = useContext(SessionContext)
    const router = useRouter()
    const {colorMode, toggleColorMode} = useColorMode()
    return <>

        <Box px={3} py={2} borderBottomWidth={0.2}>
            <HStack>
                {/*Render provided links*/}
                <HStack>
                    {/*Mobile Menu*/}
                    <Box display={{md: "none"}}>
                        <SidebarMenu links={links}/>
                    </Box>

                    {/*Desktop links*/}
                    <Box display={{base: 'none', md: "block"}}>
                        {links.map((link, index) => <Button key={index} onClick={() => router.push(link.href)}
                                                            variant="ghost">{link.title}</Button>)}
                    </Box>
                </HStack>
                <Spacer/>

                {showCart && localStorage.getItem("hollar-cart") != undefined && 
                    <Text>Items in cart: {localStorage.get("hollar-cart").length}</Text>
                }
                {showCart && localStorage.getItem("hollar-cart") == undefined && 
                    <> <AiOutlineShoppingCart size={25}/> <Text>No items in cart</Text></>
                }

                <HStack spacing={1}>
                    {/*Account menu if authenticated, otherwise displays LOGIN/SIGNUP buttons*/}
                    {(status === 'AUTHENTICATED') ? <>
                        <Menu>
                            <MenuButton as={Button}
                                        variant="ghost"
                                        leftIcon={<Avatar name={user.displayName} size="xs"/>}
                                        rightIcon={<ChevronDownIcon/>}>
                                <Text>{user.displayName}</Text>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={toggleColorMode}>
                                    {colorMode === 'dark' ? 'Disable' : 'Enable'} dark theme
                                </MenuItem>
                                <MenuItem onClick={() => router.push('/signout')}>Sign out</MenuItem>
                            </MenuList>
                        </Menu>
                    </> : <HStack>
                        <Button colorScheme="blue" variant="outline" onClick={() => router.push('/login')}>Log
                            in</Button>
                        <Button colorScheme="blue" variant="solid" onClick={() => router.push('/signup')}>Get
                            started</Button>
                    </HStack>}
                </HStack>
            </HStack>
        </Box>
        <Progress height="2px" opacity={loading ? 1 : 0} isIndeterminate />
    </>
}