
import NavbarComplete from "../../components/NavbarComplete";
import React, {useContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import { Heading, Container, Box } from "@chakra-ui/react";
import OrderView from "../../components/kiosk/OrderView";
import { Center, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import fb from "../../util/firebaseConfig";

export default function() {

  const router = useRouter();
  const {store_id} = router.query;

  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    var getOrders = fb.functions().httpsCallable('getOrders');
    getOrders({ storeId: store_id })
      .then((result) => {
        console.log(JSON.stringify(result.data, null, 2));
        setPendingOrders(result.data.pendingOrders);
        setCompletedOrders(result.data.completedOrders);
      });
  }, [])

  function renderOrderList(isPending, dataList){
    return dataList.map((sectionObject, index) => 
      <OrderView 
        key={index}
        isPending={isPending}
        order={sectionObject}
      />
    )
  }

  return(
    <>
      <NavbarComplete />
      <Center bg="white" color="black" h="180px" w="100%">
        <Heading>
          Store Id: {store_id}
        </Heading>
      </Center>

      <Center my={5}>
        <Tabs isFitted w="50%">
          <TabList>
            <Tab>Pending</Tab>
            <Tab>Completed</Tab>
            <Tab>Revenue</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              { renderOrderList(true, pendingOrders) }
            </TabPanel>
            <TabPanel>
              { renderOrderList(false, completedOrders) }
            </TabPanel>
            <TabPanel>
              Hello
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </>
  );
}
