import React, { FC, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import {
  ActionButton,
  DateSelector,
  DishItem,
  Header,
  Screen,
  Space,
  Text,
  TodoItem,
} from "@/components";
import { theme } from "@/theme";
import { useDishStore, useTodoStore } from "@/stores";
import { Bell, ChevronRight, Plus } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_PADDING = 16;
const GAP = 16;
const COLUMN_COUNT = 2;
const DISH_ITEM_SIZE =
  (Dimensions.get("window").width -
    2 * SCREEN_PADDING -
    (COLUMN_COUNT - 1) * GAP) /
  COLUMN_COUNT;

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Plan">,
  NativeStackScreenProps<MainStackParamList>
>;

const SectionTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.05);
`;

const DishSection = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.palette.black[10]};
  width: 100%;
`;

const Container = styled.View`
  padding: 16px;
`;

const IconButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${theme.colors.primary};

  box-shadow: 0 4px 4px rgba(249, 115, 22, 0.5);
`;

const ActionButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
  align-items: flex-end;
`;

export const PlanScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const initTodoStore = useTodoStore((s) => s.initTodoStore);
  const todos = useTodoStore((s) => s.todos);
  const dishes = useDishStore((s) => s.dishes);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const fetching = useTodoStore((s) => s.fetching);
  const date = useTodoStore((s) => s.date);
  const setDate = useTodoStore((s) => s.setDate);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    initTodoStore();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Bell />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const addTodo = () => {
    navigation.navigate("AddTodo");
  };

  return (
    <Screen>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
      </Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchTodos} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <SectionTitle>
            <Text preset="title">Danh sách cần mua</Text>
            <ChevronRight color={theme.colors.text} size={20} />
          </SectionTitle>
          <Space height={16} />
          <Section>
            {todos.map((todo, index) => (
              <React.Fragment key={todo.id}>
                {index != 0 && <Divider />}
                <TodoItem todo={todo} />
              </React.Fragment>
            ))}
          </Section>
          <Space height={24} />

          <SectionTitle>
            <Text preset="title">Thực đơn</Text>
            <ChevronRight color={theme.colors.text} size={20} />
          </SectionTitle>
          <Space height={16} />
          <DishSection>
            {dishes.map((dish, index) => (
              <TouchableOpacity
                key={dish.id}
                // onPress={() => viewDishDetails(dish)}
              >
                <DishItem size={DISH_ITEM_SIZE} dish={dish} />
              </TouchableOpacity>
            ))}
          </DishSection>

          {/* Add a space with a height of 72px to avoid being covered by the floating action button */}
          <Space height={72} />
        </Container>
      </ScrollView>
    </Screen>
  );
};
