import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, TodoItem, Space, DishItem } from "@/components";
import { useTodoStore } from "@/stores";
import styled from "styled-components/native";
import { theme } from "@/theme";

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  width: 100%;
`;

export const ListDishes = () => {
  const todos = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          <Text>Breakfast</Text>
          <Space height={8} />
          <View style={styles.todosContainer}>
            {todos.map((todo, index) => (
              <>
                {index != 0 && <Divider />}
                <DishItem key={todo.id} />
              </>
            ))}
          </View>
          <Space height={16} />
          <Text>Lunch</Text>
          <Space height={8} />
          <View style={styles.todosContainer}>
            {todos.map((todo, index) => (
              <>
                {index != 0 && <Divider />}
                <DishItem key={todo.id} />
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  scrollViewContainer: {
    paddingHorizontal: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  todosContainer: {
    backgroundColor: "white",
    borderRadius: 16,
  },
});
