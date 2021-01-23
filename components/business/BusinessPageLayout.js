import Navbar from "../Navbar";

const links = [{title: 'Orders', href: '/business/orders'}, {title: 'Menu', href: '/business/menu'}, {
    title: 'Rewards',
    href: '/business/options'
}, {title: 'Customers', href: '/business/options'}, {title: 'Store Info', href: '/business/options'}]

export default function BusinessPageLayout({children}) {
    return <>
        <Navbar links={links}/>
        {children}
    </>
}