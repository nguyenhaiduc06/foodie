import React, { FC, useEffect } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import {
  ActionButton,
  DateSelector,
  EmptyState,
  Header,
  Screen,
  Space,
  TodoItem,
} from "@/components";
import { theme } from "@/theme";
import { useTodoStore } from "@/stores";
import { Plus } from "lucide-react-native";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Todos">,
  NativeStackScreenProps<MainStackParamList>
>;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.palette.black[10]};
  width: 100%;
`;

const Container = styled.View`
  padding: 0 16px;
`;

const ActionButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
  align-items: flex-end;
`;

export const TodosScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const initTodoStore = useTodoStore((s) => s.initTodoStore);
  const todos = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const fetching = useTodoStore((s) => s.fetching);
  const date = useTodoStore((s) => s.date);
  const setDate = useTodoStore((s) => s.setDate);

  useEffect(() => {
    initTodoStore();
  }, []);

  const addTodo = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <Screen>
      <Container>
        <Space height={16} />
        <DateSelector date={date} onChangeDate={setDate} />
        <Space height={16} />
      </Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchTodos} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          {todos.length == 0 ? (
            <EmptyState label="Chưa có thực phẩm nào trong danh sách cần mua" />
          ) : (
            <Section>
              {todos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                  {index != 0 && <Divider />}
                  <TodoItem todo={todo} />
                </React.Fragment>
              ))}
            </Section>
          )}

          {/* Add a space with a height of 72px to avoid being covered by the floating action button */}
          <Space height={72} />
        </Container>
      </ScrollView>
      <ActionButtonContainer>
        <ActionButton
          label="Thêm"
          left={<Plus color={theme.colors.textInverted} size={22} />}
          onPress={addTodo}
        />
      </ActionButtonContainer>
    </Screen>
  );
};
