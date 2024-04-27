import {
    toDoItemFilePath,
    savedStateFilePath,
    doneItemsFilePath,
  } from "../filePaths";
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


export function updateDoneStateByIndex (index,setDoneStatus,doneStatus, setFileContent) {
      const newDoneStatus = [...doneStatus];
    newDoneStatus[index] = !newDoneStatus[index];


  FileSystem.readAsStringAsync(toDoItemFilePath).then((content) => {
    const parsedData = JSON.parse(content);
    parsedData[index].isDone = !parsedData[index].isDone;
    const stringData = JSON.stringify(parsedData);
    FileSystem.writeAsStringAsync(toDoItemFilePath, stringData).then(() => {
      setDoneStatus(newDoneStatus);
      setFileContent([...parsedData]);
    });
  });

}

export function updateProgressStateByIndex (index,setProgressStatus,progressStatus, setFileContent) {
  const newProgressStatus = [...progressStatus];
  newProgressStatus[index] = !newProgressStatus[index];


FileSystem.readAsStringAsync(toDoItemFilePath).then((content) => {
const parsedData = JSON.parse(content);
parsedData[index].inProgress = !parsedData[index].inProgress;
const stringData = JSON.stringify(parsedData);
FileSystem.writeAsStringAsync(toDoItemFilePath, stringData).then(() => {
  setProgressStatus([...newProgressStatus]);
  setFileContent([...parsedData]);
});
});

}