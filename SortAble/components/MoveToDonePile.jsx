import React, { useState, useEffect } from "react";
import { toDoItemFilePath, doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native";

import { getToDoItems, getDoneItems } from "../functions";

export default function MoveToDonePile({
  fileContent,
  setFileContent,
  doneItems,
  setDoneItems,
  setDoneStatus,
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
const newDoneItems = [...doneItems,...organisedItems.readyToMove]

    FileSystem.writeAsStringAsync(
      toDoItemFilePath,
      JSON.stringify(organisedItems.notDone)
    )
      .then(() => {
        getToDoItems(setFileContent);
        setDoneStatus(Array(fileContent.length).fill(false));
      })
      .catch((err) => {
        console.error(err);
      });

    FileSystem.writeAsStringAsync(
      doneItemsFilePath,
      JSON.stringify(newDoneItems)
    ).then(() => {
      getDoneItems(setDoneItems)
      console.log("items have been moved to the done pile")
    });
  };

  return <Button title="Move To Done Pile" onPress={handlePress} />;
}
