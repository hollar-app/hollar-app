import Navbar from "../components/Navbar";

export default function Home() {
  return (
   <div>
     <Navbar links={[{title: 'Store Front', href: '/storefront/23'}, {title: 'Orders', href: '/business/orders'}, {title: 'Menu', href: '/business/menu'}, {title: 'Rewards', href: '/business/options'}, {title: 'Customers', href: '/business/options'}, {title: 'Store Info', href: '/business/options'}]}/>
   </div>
  )
}
