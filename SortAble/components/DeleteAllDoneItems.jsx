import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, Pressable } from "react-native";
import { doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";

export function DeleteAllDoneItems({ style,setDoneItems }) {
  const deleteAllItems = () => {

    FileSystem.writeAsStringAsync(doneItemsFilePath, JSON.stringify([])).then(
      () => {
        setDoneItems([]);
      }
    );
  };

  const handlePress = () => {
    Alert.alert("Delete all items", "Do you want to continue?", [
      {
        text: "cancel",
        onPress: () => {
          console.log("cancel button has been pressed");
        },
      },
      {
        text: "ok",
        onPress: () => {
          deleteAllItems();
        },
      },
      {
        cancelable: true,
      },
    ]);
  };

  const handleLongPress = () => {
    deleteAllItems();
  }

  return (
<Pressable
      onPress={() => {
        handlePress();
      }}
      onLongPress={handleLongPress}>
        <Text
        style={style}>delte all  </Text>
      </Pressable>


  );
}