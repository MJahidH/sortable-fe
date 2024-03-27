import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ToDoPage from "./components/ToDoPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import DonePage from "./components/DonePage";

const Tab = createMaterialTopTabNavigator();

const name = `Jahid`;
const description = `this is my notes app`;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo" component={ToDoPage} />
        <Tab.Screen name="Done" component={DonePage} />
      </Tab.Navigator>
    </NavigationContainer>
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
