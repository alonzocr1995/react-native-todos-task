import React, { useState, useEffect } from "react";
import {
  CheckBox,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../lib/firebase";

const ToDo = ({ navigation }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("todos")
      .onSnapshot((snapshot) =>
        setTodo(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return unsubscribe;
  }, []);
  const enterTodo = (id) => {
    navigation.navigate("Content", { id });
  };

  return (
    <FlatList
      data={todo}
      keyExtractor={(item, i) => item.id}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => enterTodo(index)}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setIsSelected}
                  style={styles.checkbox}
                />
                <Text>{item.title}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  itemText: {
    maxWidth: "80%",
  },

  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default ToDo;
