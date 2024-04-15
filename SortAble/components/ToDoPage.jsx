import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  SwitchBase,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
} from "react-native";
import AddNewToDoItem from "./AddNewToDoItem";
import * as FileSystem from "expo-file-system";
import { ToDoItemFilePath, savedStateFilePath } from "../ToDoItemFilePath";
import MoveToDonePile from "./MoveToDonePile";

export default function ToDoPage({ style, fileContent, setFileContent }) {
  const [doneStatus, setDoneStatus] = useState(
    Array(fileContent.length).fill(false)
  );

const [progressStatus, setProgressStatus] = useState(
    Array(fileContent.length).fill(false)
  );

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {



    FileSystem.getInfoAsync(savedStateFilePath)
      .then((fileInfo) => {
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
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRefresh(false);
      });
  }, [fileContent]);

  useEffect(() => {
    if (fileContent.length > 0) {
      const dataToSabe = JSON.stringify({
        doneState: [...doneStatus],
        progressState: [...progressStatus],
      });

      FileSystem.writeAsStringAsync(savedStateFilePath, dataToSabe);
    } else {

    }
  }, [doneStatus, progressStatus]);

  const toggleIsDone = (index) => {
    const newDoneStatus = [...doneStatus];

    newDoneStatus[index] = !newDoneStatus[index];

    setDoneStatus(newDoneStatus);

    FileSystem.readAsStringAsync(ToDoItemFilePath).then((content) => {
      const parsedData = JSON.parse(content);
      parsedData[index].isDone = !parsedData[index].isDone;
      const stringData = JSON.stringify(parsedData);

      FileSystem.writeAsStringAsync(ToDoItemFilePath, stringData).then(() => {
        setFileContent([...parsedData]);
      });
    });
  };

  const toggleInProgress = (index) => {
    const newProgressStatus = [...progressStatus];
    newProgressStatus[index] = !newProgressStatus[index];
    setProgressStatus(newProgressStatus);

  };

  const handleColor = (index) => {
    if (progressStatus[index]) {
      return buttonStyles.inProgress;
    } else if (doneStatus[index]) {
      return buttonStyles.isDone;
    } else {
      return buttonStyles.notDone;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <MoveToDonePile/>
        {fileContent.map((toDoItem, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Pressable
                style={handleColor(index)}
                onPress={() => {
                  toggleIsDone(index);
                }}
                onLongPress={() => {
                  toggleInProgress(index);
                }}
              ></Pressable>

              <Text style={style}>{toDoItem.title}</Text>
            </View>
          );
        })}
        <AddNewToDoItem
          style={style}
          fileContent={fileContent}
          setFileContent={setFileContent}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const buttonStyles = StyleSheet.create({
  notDone: {
    height: 55,
    width: 55,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderColor: `#FFF`,
    borderWidth: 4,
  },
  isDone: {
    height: 55,
    width: 55,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "",
    backgroundColor: "#00FF00",
    borderWidth: 4,
  },
  inProgress: {
    height: 55,
    width: 55,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "",
    backgroundColor: "#FFA500",
    borderWidth: 4,
  },
});
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
