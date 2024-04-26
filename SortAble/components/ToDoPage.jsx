import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  SwitchBase,
  KeyboardAvoidingView,
  Platform,
  Button,
  Animated,
} from "react-native";
import AddNewToDoItem from "./AddNewToDoItem";
import * as FileSystem from "expo-file-system";
import { toDoItemFilePath, savedStateFilePath } from "../filePaths";
import MoveToDonePile from "./MoveToDonePile";
import DeleteItem from "./DeleteItem";
import { updateToDoItemTitle } from "../functions";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

export default function ToDoPage({
  style,
  fileContent,
  setFileContent,
  doneItems,
  setDoneItems,
  doneStatus,
  setDoneStatus,
  progressStatus,
  setProgressStatus,
}) {
  const [editModeStatus, setEditModeStatus] = useState([]);

  const [itemTitles, setItemTitles] = useState([]);

  const translateX = useRef(new Animated.Value(9)).current;
  const [itemBackgroundColor, setItemBackgroundColor] = useState(`black`);
  const [itemBackgroundColor2, setItemBackgroundColor2] = useState(
    Array(fileContent.length).fill(false)
  );

  useEffect(() => {
    setItemTitles(
      fileContent.map((item) => {
        return item.title;
      })
    );
    setItemBackgroundColor2(Array(fileContent.length).fill(`black`));
  }, [fileContent]);

  useEffect(() => {
    if (fileContent.length > 0) {
      const dataToSave = JSON.stringify({
        doneState: [...doneStatus],
        progressState: [...progressStatus],
      });

      FileSystem.writeAsStringAsync(savedStateFilePath, dataToSave).then(() => {
        FileSystem.readAsStringAsync(savedStateFilePath).then((content) => {});
      });
    }
  }, [doneStatus, progressStatus]);

  const toggleIsDone = (index) => {
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
  };

  const toggleInProgress = (index) => {
    const newProgressStatus = [...progressStatus];
    newProgressStatus[index] = !newProgressStatus[index];

    FileSystem.readAsStringAsync(toDoItemFilePath).then((content) => {
      const parsedData = JSON.parse(content);
      parsedData[index].inProgress = !parsedData[index].inProgress;
      const stringData = JSON.stringify(parsedData);
      FileSystem.writeAsStringAsync(toDoItemFilePath, stringData).then(() => {
        setProgressStatus(newProgressStatus);
        setFileContent([...parsedData]);
      });
    });
  };

  const handleColor = (index) => {
    if (doneStatus[index]) {
      return buttonStyles.isDone;
    } else if (progressStatus[index]) {
      return buttonStyles.inProgress;
    } else {
      return buttonStyles.notDone;
    }
  };

  const handleEditModePress = (index) => {
    const newEditModeStatus = editModeStatus.length
      ? [...editModeStatus]
      : Array(fileContent.length).fill(false);

    newEditModeStatus[index] = !newEditModeStatus[index];

    setEditModeStatus(newEditModeStatus);
  };

  const handleEditChangeText = (event, index) => {
    const newItemTitles = itemTitles;
    newItemTitles[index] = event;
    setItemTitles([...newItemTitles]);
  };

  const handleEditSubmit = (index) => {
    updateToDoItemTitle(fileContent, itemTitles, index);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandleStateChange = (event,index) => {
    const { translationX, state } = event.nativeEvent;
const newItemBackgroundColor2 = [...itemBackgroundColor2]
newItemBackgroundColor2[index] = "black"
console.log(newItemBackgroundColor2)


    if (state === State.END) {      // setItemBackgroundColor(translationX > 0 ? `green` : `red`);
     translationX > 0 ? newItemBackgroundColor2[index] = "green" :  newItemBackgroundColor2[index] = "red"
     setItemBackgroundColor2([...newItemBackgroundColor2])
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        stiffness: 500, // Increased stiffness
        damping: 490,
      }).start(() => {
        setTimeout(() => {
          setItemBackgroundColor2(Array(fileContent.length).fill(`black`));
        }, 500);
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <MoveToDonePile
          fileContent={fileContent}
          setFileContent={setFileContent}
          doneItems={doneItems}
          setDoneItems={setDoneItems}
          doneStatus={doneStatus}
          setDoneStatus={setDoneStatus}
          progressStatus={progressStatus}
          setProgressStatus={setProgressStatus}
        />
        {fileContent.map((toDoItem, index) => {
          return (
            <View key={index} style={styles.toDoItemContainer}>
              <Pressable
                style={handleColor(index)}
                onPress={() => {
                  toggleIsDone(index);
                }}
                onLongPress={() => {
                  toggleInProgress(index);
                }}
              ></Pressable>

              <GestureHandlerRootView style={styles.itemContainer}>
                <PanGestureHandler
                  onGestureEvent={onGestureEvent}
                  onHandlerStateChange={(event) => {
                    onHandleStateChange(event,index)
                  }}
                >
                  <Animated.View
                    style={[
                      styles.itemContainer,
                      {
                        backgroundColor: itemBackgroundColor2[index],
                        transform: [{ translateX }],
                      },
                    ]}
                  >
                    <Pressable
                      onPress={() => {
                        handleEditModePress(index);
                      }}
                      style={styles.textPressable}
                    >
                      {editModeStatus[index] ? (
                        <TextInput
                          style={[style, styles.textInputStyle]}
                          value={itemTitles[index]}
                          keyboardAppearance="dark"
                          onChangeText={(text) => {
                            handleEditChangeText(text, index);
                          }}
                          onEndEditing={() => {
                            handleEditModePress(index);
                          }}
                          autoFocus={true}
                          onSubmitEditing={() => {
                            handleEditSubmit(index);
                          }}
                        ></TextInput>
                      ) : (
                        <Text style={style}>{toDoItem.title}</Text>
                      )}
                    </Pressable>
                  </Animated.View>
                </PanGestureHandler>
              </GestureHandlerRootView>

              <DeleteItem
                id={index}
                fileContent={fileContent}
                setFileContent={setFileContent}
                setDoneStatus={setDoneStatus}
                setProgressStatus={setProgressStatus}
              />
            </View>
          );
        })}
        <AddNewToDoItem
          style={style}
          fileContent={fileContent}
          setFileContent={setFileContent}
          setDoneStatus={setDoneStatus}
          setProgressStatus={setProgressStatus}
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

  subContainer: {
    padding: 30,
    borderColor: "#FFF",
    borderWidth: 1,
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
    paddingHorizontal: 20,
    flexWrap: "wrap",
    borderColor: `green`,
  },
  toDoItemContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,

    flexDirection: "row",
  },
  textPressable: {
    flex: 1,
    justifyContent: "center",
  },
  textInputStyle: {
    flexShrink: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
    backgroundColor: "#000",
    marginLeft: 5,
    marginRight: 5,
    flexWrap: "wrap",
  },
});
