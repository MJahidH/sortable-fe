import React, { useState, useEffect } from "react";
import {Button} from  "react-native"


export default function MoveToDonePile ({fileContent,setFileContent,doneItems,setDoneItems}) {

const handlePress = () => {
    // console.log(fileContent)
    // console.log(doneItems)
}


return (
    <Button title="Move To Done Pile" onPress={handlePress}/>
)

}