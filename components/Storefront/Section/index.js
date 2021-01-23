import {Heading, Box} from "@chakra-ui/react";
import ListSection from "./ListSection";
import GridSection from "./GridSection";

import { useContext, useEffect, useReducer, useState } from "react";

export default function Section ({section}) {

    useEffect(() => {
        console.log("section data", section)
    }, [])

    return (<>
            {section.map((value, index, arr) => {
                return (<div>
                    <p>{value.title}</p>
                    <p>{value.price}</p>
                    <p>{value.description}</p>
                </div>)
            })}


            </>)
}