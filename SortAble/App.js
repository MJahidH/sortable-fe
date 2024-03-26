import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const name = `Jahid`;
const description = `this is my notes app`;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{description}</Text>

      <StatusBar style="auto" />
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
