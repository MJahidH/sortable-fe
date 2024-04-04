import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function AddNewToDoItem({ style }) {
  const [newDoneItem, setNewDoneItem] = useState({
    title: "",
    isDone: false,
  });
  useEffect(() => {
    console.log(newDoneItem);
  }, [newDoneItem]);

  
  const handleChange = (event) => {
    setNewDoneItem({
        ...newDoneItem,
        title : event
    })
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
