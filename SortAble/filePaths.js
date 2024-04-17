import * as FileSystem from "expo-file-system";

export const toDoItemFilePath = FileSystem.documentDirectory + "data-1002.json";

export const savedStateFilePath =
  FileSystem.documentDirectory + "saved-state-2000.json";

export const doneItemsFilePath =
  FileSystem.documentDirectory + "done-data.json";
