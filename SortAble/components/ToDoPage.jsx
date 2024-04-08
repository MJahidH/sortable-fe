import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  SwitchBase,
} from "react-native";
import AddNewToDoItem from "./AddNewToDoItem";

export default function ToDoPage({ style, fileContent, setFileContent }) {
  const [doneStatus, setDoneStatus] = useState(
    Array(fileContent.length).fill(false)
  );
  const [progressStatus, setProgressStatus] = useState(
    Array(fileContent.length).fill(false)
  );

  const toggleIsDone = (index) => {
    const newDoneStatus = [...doneStatus];
    newDoneStatus[index] = !newDoneStatus[index];
    setDoneStatus(newDoneStatus);
  };
  const toggleInProgress = (index) => {
    const newProgressStatus = [...progressStatus];
    newProgressStatus[index] = !newProgressStatus[index];
    setProgressStatus(newProgressStatus);
    console.log("in prgoress has bene tooggled");
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
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {fileContent.map((toDoItem, index) => {
        return (
          <View key={index}>
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
});
