import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import ToDoPage from "./components/ToDoPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DonePage from "./components/DonePage";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { getToDoItems, getSavedStates, getDoneItems } from "./all-functions/get-functions";

const Tab = createMaterialTopTabNavigator();

const name = `Jahid`;
const description = `this is my notes app`;

export default function App() {
  const [toDoScreen, setToDoScreen] = useState(true);
  const [fileContent, setFileContent] = useState([]);
  const [doneStatus, setDoneStatus] = useState(
    Array(fileContent.length).fill(false)
  );
  const [progressStatus, setProgressStatus] = useState(
    Array(fileContent.length).fill(false)
  );
const [doneItems,setDoneItems] = useState([])

  useEffect(() => {
    getToDoItems(setFileContent)
    
  }, []);

  useEffect(() => {
    getSavedStates(setDoneStatus, setProgressStatus);
    getDoneItems(setDoneItems)
  }, [fileContent]);

  const isToDoScreen = () => {
    setToDoScreen(!toDoScreen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonTrigger}>
        <Button title="done" onPress={isToDoScreen} />
      </View>
      {toDoScreen ? (
        <View style={styles.parentDiv}>
          <ToDoPage
            buttonStyle={styles.button}
            style={styles.text}
            fileContent={fileContent}
            setFileContent={setFileContent}
            doneItems={doneItems}
            setDoneItems={setDoneItems}
            doneStatus={doneStatus}
            setDoneStatus={setDoneStatus}
            progressStatus={progressStatus}
            setProgressStatus={setProgressStatus}
          />
        </View>
      ) : (
        <DonePage 
        style={styles.text}
        doneItems={doneItems}
        setDoneItems={setDoneItems} />
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
  parentDiv: {
    flex: 1,
    marginTop: 80,
    width: "100%",
    marginBottom: 50,
  },
  text: {
    color: `#FFF`,
  },
  button: {
    // To create a circle, you need to make sure the height and width are equal
    height: 38,
    width: 38,

    padding: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderColor: `#FFF`,
    borderWidth: 4,
  },
  buttonTrigger: {
    position: "absolute",
    top: StatusBar.currentHeight || 40,
    zIndex: 10,
    width: 100,
    alignSelf: "center",
  },
});
