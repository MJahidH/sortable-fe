import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, Pressable } from "react-native";
import { doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/Ionicons";

export function DeleteAllDoneItems({ style, setDoneItems }) {
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
  };

  return (
    <Pressable
      style={{
        position: "absolute",
        alignSelf: "center",
      }}
      onPress={() => {
        handlePress();
      }}
      onLongPress={handleLongPress}
    >
      <View

        style={{ padding: 20, flexDirection: "row" }}
      >
        <Text style={[style, { fontSize: 20, color: "red" }]}>Delete All </Text>
        <Icon
          name="trash-bin"
          color="red"
          size={25}
          style={{ paddingLeft: 5 }}
        />
      </View>
    </Pressable>
  );
}
