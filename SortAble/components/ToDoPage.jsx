import React from "react";
import { View, Text, Pressable } from "react-native";

export default function ToDoPage({ style, fileContent,buttonStyle }) {
  return (
    <View>
      {fileContent.map((toDoItem) => {
        return (
          <View>
            <Pressable style={buttonStyle}>

            </Pressable>
            <Text style={style}>{toDoItem.title}</Text>
          </View>
        );
      })}
    </View>
  );
}
