import React, { useState, useEffect } from "react";
import { ScrollView,View, Text, Button, Pressable } from "react-native";
import { DeleteAllDoneItems } from "./DeleteAllDoneItems";
import {styles} from "../styleSheets"


export default function DonePage({ style, doneItems, setDoneItems }) {
  return (
    <View>
      {doneItems.length === 0 ? (
        <View>
          <Text style={style}>No items have been done yet </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer} >
          <DeleteAllDoneItems setDoneItems={setDoneItems} style={style} />
          <View style={styles.mappedContainers}>
            {doneItems.map((item, index) => {
              return (
                <View style={[styles.toDoItemContainer,{paddingBottom : 10}]}>
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

                  <Text key={index} style={[style,{paddingLeft : 20,marginRight : 10,paddingTop : 10}]}>
                    {item.title}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
