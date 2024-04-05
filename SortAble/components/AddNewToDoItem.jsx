import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

export default function AddNewToDoItem({ style }) {
  const [newDoneItem, setNewDoneItem] = useState({
    title: "",
    isDone: false,
  });

  const handleSubmit = () => {
    const filePath = FileSystem.documentDirectory + "data.json";
    FileSystem.readAsStringAsync(filePath)
      .then((content) => {
        const parsedData = JSON.parse(content);
        parsedData.push(newDoneItem);
        return parsedData;
      })
      .then((updatedData) => {
        const stringData = JSON.stringify(updatedData);
        return FileSystem.writeAsStringAsync(filePath, stringData);
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
