import Navbar from "../Navbar";

export default function NavbarComplete({showCart=false, loading=false}) {

  const links = [
      {title: 'Shops', href: '/storefront/'}, 
      {title: 'Orders', href: '/kiosk/B9BjBsZZ726zkoVAwHec/'}, 
      {title: 'Our Menu', href: '/storefront/B9BjBsZZ726zkoVAwHec'}, 
      {title: 'Edit Panel', href: '/business/B9BjBsZZ726zkoVAwHec/menu'}
    ];

  return <>
    <Navbar showCart={showCart} loading={loading} links={links}/>
  </>
}
