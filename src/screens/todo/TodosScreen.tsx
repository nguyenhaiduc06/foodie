import React, { FC } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import {
  ActionButton,
  DateSelector,
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
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.palette.black[10]};
  width: 100%;
`;

const Container = styled.View`
  padding: 16px;
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
  const todos = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const fetching = useTodoStore((s) => s.fetching);
  const date = useTodoStore((s) => s.date);
  const setDate = useTodoStore((s) => s.setDate);

  const addTodo = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <Screen>
      {/* <Header title="Danh sách cần mua" /> */}
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
      </Container>
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
