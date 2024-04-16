import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { doneItemsFilePath } from "../filePaths";
import * as FileSystem from "expo-file-system";

export default function DonePage({ style, doneItems, setDoneItems }) {
  return (
    <View>
      {doneItems.length === 0 ? (
        <View>
          <Text style={style}>No items have been done yet </Text>
        </View>
      ) : (
        doneItems.map((item) => {
          return (
            <View>
              <Text style={style}> {item.title}</Text>
            </View>
          );
        })
      )}
    </View>
  );
}
