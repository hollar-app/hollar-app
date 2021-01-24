import Navbar from "../Navbar";

export default function NavbarComplete({showCart=false}) {

  return <>
    <Navbar showCart={showCart} links={[{title: 'Shops', href: '/storefront/'}, {title: 'Orders', href: '/business/orders'}, {title: 'Menu', href: '/business/menu'}, {title: 'Store Info', href: '/business/options'}]}/>

  </>
}
