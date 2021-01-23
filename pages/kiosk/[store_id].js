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

  const [data, setData] = useState([
    {
      completed: true, 
      customer: {
        name: "kevin", 
        rewardPoints: 3
      }, 
      storeID: "B9BjBsZZ726zkoVAwHec", 
          totalCost: 6, 
      items: [
        {
          cost: 2,
          imageURL: "https://images.unsplash.com/photo-1524904237821-786af6d620ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
          quantity: 3, 
          title: "fruit cup"
        }, 
        {
          cost: 2,
          imageURL: "https://images.unsplash.com/photo-1524904237821-786af6d620ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
          quantity: 3, 
          title: "coffee"
        }
      ], 
    }, 
    {
      completed: true, 
      customer: {
        name: "kevin", 
        rewardPoints: 3
      }, 
      storeID: "B9BjBsZZ726zkoVAwHec", 
      totalCost: 6, 
      items: [
        {
          cost: 2,
          imageURL: "https://images.unsplash.com/photo-1524904237821-786af6d620ca?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
          quantity: 3, 
          title: "fruit cup"
        }
      ], 
    }
  ]);

  useEffect(() => {
    var getOrders = fb.functions().httpsCallable('getOrders');
    getOrders({ storeId: store_id })
      .then((result) => {
        setPendingOrders(result.data.pendingOrders);
        setCompletedOrders(result.data.completedOrders);
      });
  })

  function renderOrderList(isPending, dataList){
    return dataList.map((sectionObject, index) => {

      return (
        <OrderView 
          isPending={isPending}
          order={sectionObject}
        />
      );
    })
  }

  return(
    <>
      <Center bg="white" color="black" h="100px">
        <Heading>
          STOREEEEEE ID: {store_id}
        </Heading>
      </Center>

      <Center>
        <Tabs isFitted>
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
