import { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import { CheckCircle2, Circle } from "lucide-react-native";
import { useTodoStore } from "@/stores";
import { Todo } from "@/lib";
import { Text } from "./Text";
import { Space } from "./Space";
import { theme } from "@/theme";

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
    <Container onPress={toggleChecked} style={{ opacity: checked ? 0.4 : 1 }}>
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
