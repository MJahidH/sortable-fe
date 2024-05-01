import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import * as FileSystem from "expo-file-system";
import { toDoItemFilePath } from "../filePaths";

export default function AddNewToDoItem({ style, fileContent, setFileContent }) {
  const [newDoneItem, setNewDoneItem] = useState({
    title: "",
    isDone: false,
    inProgress: false,
  });

  const handleSubmit = () => {
    const filePath = toDoItemFilePath;
    FileSystem.readAsStringAsync(filePath).then((content) => {
      const parsedData = JSON.parse(content);
      parsedData.push(newDoneItem);
      const stringData = JSON.stringify(parsedData);
      FileSystem.writeAsStringAsync(filePath, stringData);
      setFileContent([...fileContent, newDoneItem]);
      setNewDoneItem({
        title: "",
        isDone: false,
        inProgress: false,
      });
    });
  };

  const handleChange = (event) => {
    setNewDoneItem({
      ...newDoneItem,
      title: event,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable style={styles.whiteCircle}></Pressable>
      <TextInput
        style={[style, styles.textInputcontainer]}
        keyboardAppearance="dark"
        placeholder="add new item"
        placeholderTextColor="#FFF"
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        value={newDoneItem.title}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textInputcontainer: {
    flex: 1,
    borderColor: `#FFF`,
    borderWidth: 1,
    padding: 10,
    marginLeft: 15,
    borderRadius: 50,
  },
  mainContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    marginBottom: 5,
    borderColor: `#FFF`,
  },
  whiteCircle: {
    height: 40,
    width: 40,
    padding: 10,
    borderRadius: 50,
    backgroundColor: `#FFF`,
    borderColor: `#FFF`,
    borderWidth: 4,
  },
});
