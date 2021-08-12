import React, { useEffect, useLayoutEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import ToDo from "../components/ToDo";
import "../lib/firebase";
import { db } from "../lib/firebase";

export default function ToDoScreen({ navigation, route }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Todos App",
      headerStyle: {
        backgroundColor: "#628395",
        color: "white",
      },
    });
  }, [navigation]);

  const handleAddTodo = async () => {
    try {
      Keyboard.dismiss();
      if (todoTitle.trim() === "" && todoDescription.trim() === "") return;
      await db.collection("todos").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        title: todoTitle,
        description: todoDescription,
      });
      setTodoTitle("");
      setTodoDescription("");
      setIsEditing(false);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <View style={styles.items}>
            <ToDo navigation={navigation} route={route} />
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder={"Write to-do title"}
              value={todoTitle}
              onChangeText={(text) => setTodoTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder={"Write to-do description"}
              value={todoDescription}
              onChangeText={(text) => setTodoDescription(text)}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => handleAddTodo()}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>Add</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
