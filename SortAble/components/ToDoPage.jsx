import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, SwitchBase } from "react-native";

export default function ToDoPage({ style, fileContent }) {
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
  };

  return (
    <View>
      {fileContent.map((toDoItem, index) => {
        return (
          <View key={index}>
            <Pressable
              style={
                doneStatus[index] ? buttonStyles.isDone : buttonStyles.notDone
              }
              onPress={() => {
                toggleIsDone(index);
              }}
            ></Pressable>
            <Pressable
              style={
                progressStatus[index]
                  ? buttonStyles.inProgress
                  : buttonStyles.notDone
              }
              onPress={() => {
                toggleInProgress(index);
              }}
            ></Pressable>
            <Text style={style}>{toDoItem.title}</Text>
          </View>
        );
      })}
    </View>
  );
}
const buttonStyles = StyleSheet.create({
  notDone: {
    height: 38,
    width: 38,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderColor: `#FFF`,
    borderWidth: 4,
  },
  isDone: {
    height: 38,
    width: 38,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "",
    backgroundColor: "#00FF00",
    borderWidth: 4,
  },
  inProgress: {
    height: 38,
    width: 38,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "",
    backgroundColor: "#FFA500",
    borderWidth: 4,
  },
});
