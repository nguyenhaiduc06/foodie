import React, { FC } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { Screen, TodoItem } from "@/components";
import { theme } from "@/theme";
import { useTodoStore } from "@/stores";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Todo">,
  NativeStackScreenProps<MainStackParamList>
>;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  width: 100%;
`;

const Container = styled.View`
  padding: 16px;
`;

export const TodosScreen: FC<ScreenProps> = (props) => {
  const todos = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const fetching = useTodoStore((s) => s.fetching);

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchTodos} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Section>
            {todos.map((todo, index) => (
              <React.Fragment key={todo.id}>
                {index != 0 && <Divider />}
                <TodoItem todo={todo} />
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
