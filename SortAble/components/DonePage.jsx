import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";
import { DeleteAllDoneItems } from "./DeleteAllDoneItems";

export default function DonePage({ style, doneItems, setDoneItems }) {
  return (
    <View>
      {doneItems.length === 0 ? (
        <View>
          <Text style={style}>No items have been done yet </Text>
        </View>
      ) : (
        <View>
          <DeleteAllDoneItems setDoneItems={setDoneItems} />
          {doneItems.map((item, index) => {
            return (
              <View>
                <Text key={index} style={style}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
