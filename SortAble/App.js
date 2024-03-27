import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import ToDoPage from "./components/ToDoPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DonePage from "./components/DonePage";
import { useState } from "react";

const Tab = createMaterialTopTabNavigator();

const name = `Jahid`;
const description = `this is my notes app`;

export default function App() {
  const [toDoScreen, setToDoScreen] = useState(true);

  const isToDoScreen = () => {
    setToDoScreen(!toDoScreen);
  };

  return (
    <View style={styles.container}>
      <Button title="done" onPress={isToDoScreen} />
      {toDoScreen ? (
        <ToDoPage style={styles.text} />
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
