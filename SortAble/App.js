import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import ToDoPage from "./components/ToDoPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DonePage from "./components/DonePage";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import {
  getToDoItems,
  getSavedStates,
  getDoneItems,
} from "./all-functions/get-functions";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";




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
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    getToDoItems(setFileContent);
  }, []);

  useEffect(() => {
    getSavedStates(setDoneStatus, setProgressStatus);
    getDoneItems(setDoneItems);
  }, [fileContent]);

  const isToDoScreen = () => {
    setToDoScreen(!toDoScreen);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonTrigger} onPress={isToDoScreen}>
        <View>
          <Text style={styles.text}>Done Pile</Text>
        </View>
      </Pressable>
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
        <View style={styles.parentDiv}>
          <DonePage
            style={styles.text}
            doneItems={doneItems}
            setDoneItems={setDoneItems}
          />
        </View>
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
    paddingTop: 20,
  },
  parentDiv: {
    flex: 1,
    marginTop: 80,
    width: "100%",
    marginBottom: 50,
  },
  text: {
    color: `#FFF`,
    fontSize: 17,
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
    right: 0,
    marginRight: 10,
    backgroundColor: `green`,
    padding: 10,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: 20,
    marginTop: 20,
  },
});
