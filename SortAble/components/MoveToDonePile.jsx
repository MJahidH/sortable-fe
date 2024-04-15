import React, { useState, useEffect } from "react";
import {Button} from  "react-native"


export default function MoveToDonePile ({fileContent,seetFileContent}) {

const handlePress = () => {
    console.log("clicked")
}


return (
    <Button title="Move To Done Pile" onPress={handlePress}/>
)

}