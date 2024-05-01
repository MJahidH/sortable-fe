import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexWrap: "wrap",
    borderColor: `green`,
  },
  toDoItemContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    marginBottom: 5,
  },
  textPressable: {
    flex: 1,
    justifyContent: "center",
    marginRight: 30,
    marginTop: 10,
    marginLeft: 4,
  },
  textInputStyle: {
    justifyContent: "center",
    marginRight: 30,
    flexWrap: `wrap`,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
    backgroundColor: "#000",
    marginLeft: 5,
    marginRight: 5,
    flexWrap: "wrap",
  },
  mappedContainers: { 
    paddingTop: 40, 
    marginRight: 40,
     marginTop: 20 },
});
