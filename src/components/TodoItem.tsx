import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Todo } from "../types";
import { Text } from "./Text";
import { Space } from "./Space";
import { Check } from "lucide-react-native";
import { theme } from "../theme";
import { useTodoStore } from "../stores";

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: FC<TodoItemProps> = (props) => {
  const { todo } = props;
  const [checked, setChecked] = useState(todo.checked);
  const setTodoChecked = useTodoStore((s) => s.setTodoChecked);
  const toggleChecked = () => {
    setChecked((checked) => !checked);
  };
  useEffect(() => {
    setTodoChecked(todo.id, checked);
  }, [checked]);
  return (
    <TouchableOpacity
      onPress={toggleChecked}
      style={[styles.container, { opacity: checked ? 0.4 : 1 }]}
    >
      <View style={styles.checkbox}>
        {checked && <Check size={14} color={theme.colors.text} />}
      </View>
      {/*<Image source={{ uri: "" }} style={styles.icon} />*/}
      <Text preset="title">{todo.name}</Text>
      <Space />
      <Text preset="body">{todo.amount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "black",
    opacity: 0.1,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
  },
});
