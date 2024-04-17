import {
  toDoItemFilePath,
  savedStateFilePath,
  doneItemsFilePath,
} from "./filePaths";
import * as FileSystem from "expo-file-system";

export function getToDoItems(setFileContent) {
  const filePath = toDoItemFilePath;

  FileSystem.getInfoAsync(filePath).then((fileInfo) => {
    if (!fileInfo.exists) {
      const initialData = JSON.stringify([
        {
          title: "Clean my room",
          isDone: false,
          inProgress: false,
        },
        {
          title: "Buy eggs",
          isDone: false,
          inProgress: false,
        },
      ]);
      FileSystem.writeAsStringAsync(filePath, initialData).then(() => {
        FileSystem.readAsStringAsync(filePath).then((content) => {
          setFileContent(JSON.parse(content));
        });
      });
    } else {
      return FileSystem.readAsStringAsync(filePath).then((content) => {
        setFileContent(JSON.parse(content));
      });
    }
  });
}

export function getSavedStates(setDoneStatus, setProgressStatus) {
  FileSystem.getInfoAsync(savedStateFilePath).then((fileInfo) => {
    if (!fileInfo.exists) {
      const initialData = JSON.stringify({
        doneState: Array(fileContent.length).fill(false),
        progressState: Array(fileContent.length).fill(false),
      });
      return FileSystem.writeAsStringAsync(savedStateFilePath, initialData)
        .then(() => {
          return initialData;
        })
        .then((content) => {
          const parsedData = JSON.parse(content);
          setDoneStatus([...parsedData.doneState]);
          setProgressStatus([...parsedData.progressState]);
        });
    } else {
      FileSystem.readAsStringAsync(savedStateFilePath).then((content) => {
        const parsedData = JSON.parse(content);
        setDoneStatus([...parsedData.doneState]);
        setProgressStatus([...parsedData.progressState]);
      });
    }
  });
}

export function getDoneItems(setDoneItems) {
  const filePath = doneItemsFilePath;

  FileSystem.getInfoAsync(filePath).then((fileInfo) => {
    if (!fileInfo.exists) {
      const initialData = JSON.stringify([]);
      FileSystem.writeAsStringAsync(filePath, initialData).then(() => {
        FileSystem.readAsStringAsync(filePath).then((content) => {
          setDoneItems(JSON.parse(content));
        });
      });
    } else {
      return FileSystem.readAsStringAsync(filePath).then((content) => {
        setDoneItems(JSON.parse(content));
      });
    }
  });
}

export function updateStates(fileContent, setDoneStatus, setProgressStatus) {
  const newDoneStatus = fileContent.map((item) => {
    if (item.isDone) {
      return true;
    } else {
      return false;
    }
  });

  const newProgressStatus = fileContent.map((item) => {
    if (item.inProgress) {
      return true;
    } else {
      return false;
    }
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
