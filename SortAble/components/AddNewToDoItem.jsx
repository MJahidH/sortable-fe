import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import { toDoItemFilePath } from "../filePaths";

export default function AddNewToDoItem({ style, fileContent, setFileContent }) {
  const [newDoneItem, setNewDoneItem] = useState({
    title: "",
    isDone: false,
    inProgress : false,
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
    <View>
      <Text style={style}>this is the add new item </Text>
      <TextInput
        style={[style, styles.textInputcontainer]}
        keyboardAppearance="dark"
        placeholder="add new item"
        placeholderTextColor="#FFFF00"
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        value={newDoneItem.title}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  textInputcontainer: {
    borderColor: "#FFFF00",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
});
