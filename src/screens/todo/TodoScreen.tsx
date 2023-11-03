import React, { FC } from "react";
import { BottomTabScreenProps, MainStackParamList } from "@/navigators";
import { RecipeItem, Screen, TodoItem } from "@/components";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTodoStore } from "@/stores";

type ScreenProps = CompositeScreenProps<
  BottomTabScreenProps<"Todo">,
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

export const TodoScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const todos = useTodoStore((s) => s.todos);
  const fetchStorages = useTodoStore((s) => s.fetchTodos);
  const fetching = useTodoStore((s) => s.fetching);

  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchStorages} refreshing={fetching} />
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
