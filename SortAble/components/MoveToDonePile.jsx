import React, { useState, useEffect } from "react";
import { toDoItemFilePath, doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";
import { Button, View, Pressable, Text } from "react-native";
import { getToDoItems, getDoneItems } from "../all-functions/get-functions";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MoveToDonePile({
  fileContent,
  setFileContent,
  doneItems,
  setDoneItems,
  setDoneStatus,
  setProgressStatus,
}) {
  const handlePress = () => {

    const organisedItems = {
      notDone: [],
      readyToMove: [],
    };

    for (const item of fileContent) {
      if (item.isDone) {
        organisedItems.readyToMove.push(item);
      } else {
        organisedItems.notDone.push(item);
      }
    }
    const newDoneItems = [...doneItems, ...organisedItems.readyToMove];

    FileSystem.writeAsStringAsync(
      toDoItemFilePath,
      JSON.stringify(organisedItems.notDone)
    ).then(() => {
      getToDoItems(setFileContent);
      setDoneStatus(Array(fileContent.length).fill(false));
      const filteredContent = fileContent.filter((item) => {
        return !item.isDone;
      });
      const newProgressStatus = filteredContent.map((item) => {
        return item.inProgress;
      });
      setProgressStatus([...newProgressStatus]);
    });

    FileSystem.writeAsStringAsync(
      doneItemsFilePath,
      JSON.stringify(newDoneItems)
    ).then(() => {
      getDoneItems(setDoneItems);
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        alignSelf: "center",
        // borderColor :  "#00FF00",
        // borderWidth : 5
      }}
    >
      {/* <Button title="Move To Done Pile" onPress={handlePress} /> */}

      <Pressable
        onPress={() => {
          handlePress();
        }}
        style={{ 
          padding: 20,
          flexDirection: "row", }}
      >
        <Text style={{ 
          color: "#00FF00",
          fontSize : 25
          }}> Move  </Text>
        <Icon 
        name="arrow-right"
        size={30}
        color="#00FF00"
        />
      </Pressable>
    </View>
  );
}
