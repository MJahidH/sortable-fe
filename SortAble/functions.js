import {
  toDoItemFilePath,
  savedStateFilePath,
  doneItemsFilePath,
} from "./filePaths";
import * as FileSystem from "expo-file-system";




export function updateStates(fileContent, setDoneStatus, setProgressStatus) {
  const newDoneStatus = fileContent.map((item) => {
    return item.isDone;
  });

  const newProgressStatus = fileContent.map((item) => {
    return item.inProgress;
  });

  const newData = JSON.stringify({
    doneState: [...newDoneStatus],
    progressState: [...newProgressStatus],
  });
  FileSystem.writeAsStringAsync(savedStateFilePath, newData).then(() => {
    setDoneStatus([...newDoneStatus]);
    setProgressStatus([...newProgressStatus]);
  });
}

export function updateToDoItemTitle(fileContent, itemTitles, index) {
  const newFileContent = [...fileContent];
  newFileContent[index].title = itemTitles[index];
  FileSystem.writeAsStringAsync(
    toDoItemFilePath,
    JSON.stringify(newFileContent)
  );
}
