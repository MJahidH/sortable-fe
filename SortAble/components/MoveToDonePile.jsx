import React, { useState, useEffect } from "react";
import { toDoItemFilePath, doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";
import { Button, View } from "react-native";
import { getToDoItems, getDoneItems } from "../all-functions/get-functions";

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
        paddingRight: 111,
        paddingBottom: 20,
        alignItems: `center`,
      }}
    >
      <Button title="Move To Done Pile" onPress={handlePress} />
    </View>
  );
}
