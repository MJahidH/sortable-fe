import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, Pressable } from "react-native";
import { DeleteAllDoneItems } from "./DeleteAllDoneItems";
import { styles } from "../styleSheets";
import {
  GestureDetector,
  GestureHandlerRootView,
  Gesture,
} from "react-native-gesture-handler";
import textToSpeech from "../all-functions/text-to-speech";

export default function DonePage({ style, doneItems, setDoneItems }) {
  return (
    <View>
      {doneItems.length === 0 ? (
        <View>
          <Text style={style}>No items have been done yet </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <DeleteAllDoneItems setDoneItems={setDoneItems} style={style} />
          <View style={styles.mappedContainers}>
            {doneItems.map((item, index) => {
              const doubleTap = Gesture.Tap()
                .numberOfTaps(2)
                .onEnd((_event, success) => {
                  if (success) {
                    console.log(`hello`);
                    textToSpeech(item.title)
                  }
                });
              return (
                <View
                  key={index}
                  style={[styles.toDoItemContainer, { paddingBottom: 10 }]}
                >
                  <Pressable
                    style={{
                      height: 40,
                      width: 40,
                      padding: 10,
                      borderRadius: 50,
                      backgroundColor: `green`,
                      borderColor: `green`,
                      borderWidth: 4,
                    }}
                  ></Pressable>
                  <GestureHandlerRootView style={styles.itemContainer}>
                    <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
                      <View style={styles.itemContainer}>
                        <Text
                          style={[
                            style,
                            { paddingTop : 10,paddingLeft : 15 },
                          ]}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </GestureDetector>
                  </GestureHandlerRootView>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
