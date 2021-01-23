import React, {useContext, useState, useEffect} from "react";
import {useRouter} from "next/router";

export default function() {

  const router = useRouter();
  const {store_id} = router.query;
  // const {status} = useContext(SessionContext)

  // useEffect(() => {
  //     router.push('/')
  // })

  return(
    <React.Fragment>
      <h1>storeID for kiosk: { store_id }</h1>
    </React.Fragment>
  );
}

