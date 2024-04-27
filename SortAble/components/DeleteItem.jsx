import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import * as FileSystem from "expo-file-system";
import { toDoItemFilePath, savedStateFilePath } from "../filePaths";
import { updateStates } from "../all-functions/update-functions";

export default function DeleteItem({
  id,
  fileContent,
  setFileContent,
  setDoneStatus,
  setProgressStatus,
}) {
  const handlePress = () => {
    const newFileContent = fileContent.filter((item, index) => {
      return index !== id;
    });
    FileSystem.writeAsStringAsync(
      toDoItemFilePath,
      JSON.stringify(newFileContent)
    ).then(() => {
      setFileContent([...newFileContent]);
      updateStates(newFileContent, setDoneStatus, setProgressStatus);
    }).catch((err) => {
        console.log(err)
    })
  };

  return <Button title="delete " onPress={handlePress} />;
}
