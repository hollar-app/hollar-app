import React, { useContext, useEffect, useReducer, useState } from "react";

import { getLocalStorageCartItems, setLocalStorageCartItems } from "../util/localStorage.js";


export default function clear(){
  useEffect(() => {
    localStorage.clear();
    var temp = getLocalStorageCartItems();

  }, [])

  return (
    <React.Fragment>
      hai
    </React.Fragment>
  );

}
