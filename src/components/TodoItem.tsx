import { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { CheckCircle2, Circle } from "lucide-react-native";
import { useTodoStore } from "@/stores";
import { Todo } from "@/lib";
import { Text } from "./Text";
import { Space } from "./Space";
import { theme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "@/navigators";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type TodoItemProps = {
  todo: Todo;
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;
`;

export const TodoItem: FC<TodoItemProps> = (props) => {
  const navigation = useNavigation();
  const { todo } = props;
  const [checked, setChecked] = useState(todo.checked);

  const setTodoChecked = useTodoStore((s) => s.setTodoChecked);

  const toggleChecked = () => {
    setChecked((checked) => !checked);
  };

  useEffect(() => {
    setTodoChecked(todo.id, checked);
  }, [checked]);

  const openUpdateTodoScreen = () => {
    navigation.navigate("UpdateTodo", {
      todo,
    });
  };

  return (
    <Container
      onPress={toggleChecked}
      onLongPress={openUpdateTodoScreen}
      style={{ opacity: checked ? 0.4 : 1 }}
    >
      {checked ? (
        <CheckCircle2 color={theme.colors.text} />
      ) : (
        <Circle color={theme.colors.text} />
      )}
      <Text preset="title">{todo.name}</Text>
      <Space />
      <Text preset="body">{todo.amount}</Text>
    </Container>
  );
};
