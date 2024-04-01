import React from "react";
import { View, Text, Pressable } from "react-native";

export default function ToDoPage({ style, fileContent }) {
  return (
    <View>
      {fileContent.map((toDoItem) => {
        return (
          <View>
            <Pressable>
              <Text style={style}>this is a button</Text>
            </Pressable>
            <Text style={style}>{toDoItem.title}</Text>
          </View>
        );
      })}
    </View>
  );
}
