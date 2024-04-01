import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import ToDoPage from "./components/ToDoPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DonePage from "./components/DonePage";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

const Tab = createMaterialTopTabNavigator();

const name = `Jahid`;
const description = `this is my notes app`;

export default function App() {
  const [toDoScreen, setToDoScreen] = useState(true);

  const [fileContent, setFileContent] = useState([]);
  const filePath = FileSystem.documentDirectory + "data.json";

  useEffect(() => {
    FileSystem.getInfoAsync(filePath)
      .then((fileInfo) => {
        if (!fileInfo.exists) {
          console.log("This file does not exist ");
          const initialData = JSON.stringify([
            {
              title: "Clean my room",
              isDone: false,
            },
            {
              title: "Buy eggs",
              isDone: false,
            },
          ]);
          return FileSystem.writeAsStringAsync(filePath, initialData).then(
            () => {
              initialData;
            }
          );
        } else {
          console.log("File exists, reading content");
          return FileSystem.readAsStringAsync(filePath);
        }
      })
      .then((content) => {
        setFileContent(JSON.parse(content));
      });
  }, []);

  const isToDoScreen = () => {
    setToDoScreen(!toDoScreen);
  };
  console.log(fileContent)
  return (
    <View style={styles.container}>
      <Button title="done" onPress={isToDoScreen} />
      {toDoScreen ? (
        <ToDoPage style={styles.text} fileContent={fileContent}/>
      ) : (
        <DonePage style={styles.text} />
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: `#FFF`,
  },
});
