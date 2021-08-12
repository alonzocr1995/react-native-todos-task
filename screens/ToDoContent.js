import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { db } from "../lib/firebase";

const ToDoContent = ({ navigation, route }) => {
  const [todo, setTodo] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Todo Description",
      headerStyle: {
        backgroundColor: "#628395",
        color: "white",
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            style={{ marginLeft: 10 }}
            name="arrowleft"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = db
      .collection("todos")
      .onSnapshot((snapshot) =>
        setTodo(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return unsubscribe;
  }, []);

  const deleteTodo = (id) => {
    db.doc(`todos/${id}`)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
    navigation.navigate("Todo");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <Text>{todo[route.params.id]?.description}</Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTodo(todo[route.params.id].id)}
        >
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToDoContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#628395",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EAED",
    width: 250,
    height: 500,
    maxHeight: 200,
    borderRadius: 12,
  },
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 40,
  },
});
