import React, { useState } from "react";
import { View,Text, TextInput } from "react-native";

export default function AddNewToDoItem ({style}) {
    return (
        <View>
            <Text style={style}>this is the add new item </Text>
            <TextInput
            placeholder="add new item"/>
        </View>
    )
}