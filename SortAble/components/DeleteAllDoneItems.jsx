import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";

export function DeleteAllDoneItems({ setDoneItems }) {
  const deleteAllItems = () => {
    FileSystem.writeAsStringAsync(doneItemsFilePath, JSON.stringify([])).then(
      () => {
        setDoneItems([]);
      }
    );
  };

  const handelPress = () => {
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

  return (
    <Button
      title="delete all "
      onPress={() => {
        handelPress();
      }}
    />
  );
}
