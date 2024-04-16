import React, { useState, useEffect } from "react";
import { toDoItemFilePath, savedStateFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native";

import { getToDoItems } from "../functions";

export default function MoveToDonePile({
  fileContent,
  setFileContent,
  doneItems,
  setDoneItems,
  doneStatus,
  setDoneStatus,
  progressStatus,
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

    FileSystem.writeAsStringAsync(
      toDoItemFilePath,
      JSON.stringify(organisedItems.notDone)
    )
      .then(() => {
        getToDoItems(setFileContent);
        const newDoneStatus = fileContent.map((item) => {
          return item.isDone;
        });
        setDoneStatus(Array(fileContent.length).fill(false));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return <Button title="Move To Done Pile" onPress={handlePress} />;
}
