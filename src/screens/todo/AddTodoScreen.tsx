import { StyleSheet, View } from "react-native";
import { Button, Input, Screen, Space, Text } from "../../components";
import { useRef, useState } from "react";
import { useTodoStore } from "../../stores";

export const AddTodosScreen = (props) => {
  const { navigation } = props;
  const selectDateModal = useRef();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  return (
    <Screen style={styles.container} safeBottom>
      <Space height={16} />
      <Input placeholder="Name" onChangeText={setName} />
      <Space height={8} />
      <Input placeholder="Amount" onChangeText={setAmount} />
      <Space />
      <Button
        label="Add"
        disabled={!name || !amount}
        onPress={() => {
          addTodo(name, parseFloat(amount));
          navigation.goBack();
        }}
      />
      <Space height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
