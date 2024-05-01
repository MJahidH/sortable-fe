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
import {
  updateToDoItemTitle,
  updateProgressStateByIndex,
  updateDoneStateByIndex,
} from "../all-functions/update-functions";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import { updateStates } from "../all-functions/update-functions";
import * as Speech from "expo-speech"

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
    updateDoneStateByIndex(index, setDoneStatus, doneStatus, setFileContent);
  };

  const toggleInProgress = (index) => {
    updateProgressStateByIndex(
      index,
      setProgressStatus,
      progressStatus,
      setFileContent
    );
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

  const onHandleStateChange = (event, index) => {
    const { translationX, state } = event.nativeEvent;
    const newItemBackgroundColor2 = [...itemBackgroundColor2];
    newItemBackgroundColor2[index] = "black";

    if (state === State.END) {
      if (translationX > 0) {
        newItemBackgroundColor2[index] = "green";
        setItemBackgroundColor2([...newItemBackgroundColor2]);
        setTimeout(() => {
          updateDoneStateByIndex(
            index,
            setDoneStatus,
            doneStatus,
            setFileContent
          );
        }, 300);
      } else {
        newItemBackgroundColor2[index] = "red";
        setItemBackgroundColor2([...newItemBackgroundColor2]);
        setTimeout(() => {
          const newFileContent = fileContent.filter((item, id) => {
            return id !== index;
          });
          FileSystem.writeAsStringAsync(
            toDoItemFilePath,
            JSON.stringify(newFileContent)
          )
            .then(() => {
              setFileContent([...newFileContent]);
              updateStates(newFileContent, setDoneStatus, setProgressStatus);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 300);
      }

      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setItemBackgroundColor2(Array(fileContent.length).fill(`black`));
        }, 500);
      });
    }
  };


  const textToSpeech = (text) => {
    Speech.stop()
    Speech.speak(text,{
      language : `en-UK`,
      rate : 1.1,
      pitch : 1.2
    })
  }




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
<View
style={{paddingTop: 30,marginRight : 40}}>
{fileContent.map((toDoItem, index) => {
          const doubleTap = Gesture.Tap()
            .numberOfTaps(2)
            .onEnd((_event, success) => {
              if (success) {
                textToSpeech(toDoItem.title)
              }
            });

          const singleTap = Gesture.Tap().onEnd((_event, success) => {
            if (success) handleEditModePress(index);
          });
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
                <GestureDetector
                  gesture={Gesture.Exclusive(doubleTap, singleTap)}
                >
                  <PanGestureHandler
                    onHandlerStateChange={(event) => {
                      onHandleStateChange(event, index);
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
                      <View
                        // }}
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
                      </View>
                    </Animated.View>
                  </PanGestureHandler>
                </GestureDetector>
              </GestureHandlerRootView>

            </View>
          );
        })}

</View>
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
    height: 40,
    width: 40,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderColor: `#FFF`,
    borderWidth: 4,
  },
  isDone: {
    height: 40,
    width: 40,
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
    height: 40,
    width: 40,
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
    paddingHorizontal: 20,
    flexDirection: "row",
    marginBottom : 5

  },
  textPressable: {
    flex: 1,
    justifyContent: "center",
    marginRight : 30,
    marginTop : 10,
    marginLeft : 4
  },
  textInputStyle: {

    justifyContent: "center",
    borderColor :  "#FFA500",
    borderWidth : 5,
    marginRight : 30,
    flexWrap : `wrap`
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
