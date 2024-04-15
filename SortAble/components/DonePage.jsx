import React, {useState,useEffect} from "react";
import { View, Text } from "react-native";
import {doneItemsFilePath} from "../filePaths"
import * as FileSystem from "expo-file-system";

export default function DonePage({style}) {

const [doneContent,setDoneContent] = useState([])
const filePath = doneItemsFilePath


// useEffect(() => {
//   FileSystem.getInfoAsync(filePath).then((fileInfo) => {
//     if (!fileInfo.exists) {

//       const initialData = JSON.stringify([])
//       FileSystem.writeAsStringAsync(filePath, initialData).then(() => {
//         FileSystem.readAsStringAsync(filePath).then((content) => {
//           setDoneContent(JSON.parse(content));
//         });
//       });
//     } else {
//     return FileSystem.readAsStringAsync(filePath).then((content) => {
//         setDoneContent(JSON.parse(content));
  
//       });
//     }
//   });
// }, []);


  return (
    <View>
      <Text style={style}>this is the done page</Text>
    </View>
  );
}
