import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Chip,
  GroupSelector,
  Screen,
  Space,
  Text,
  TodoItem,
} from "@/components";
import {
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { styled } from "styled-components/native";
import { useTodoStore } from "@/stores";
import { theme } from "@/theme";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Settings,
  Settings2,
} from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import PagerView from "react-native-pager-view";
import { boolean } from "yargs";
import { ListTodos } from "./ListTodos";
import { DateSelector } from "./DateSelector";
import { ListDishes } from "./ListDishes";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
`;

const PagerTab = styled.View<{ focused?: boolean }>`
  flex: 1;
  border-bottom-width: 2px;
  border-block-color: ${(p) => (p.focused ? "black" : "transparent")};
  align-items: center;
  justify-content: center;
  padding: 8px 0px;
`;

const PlusButton = styled.TouchableOpacity`
  height: 48px;
  padding: 0 24px;
  gap: 4px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 16px;
  right: 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const HomeScreen = (props) => {
  const { navigation } = props;
  const date = useTodoStore((state) => state.date);

  const addTodo = () => {
    navigation.navigate("AddTodo");
  };

  const openManageGroupScreen = () => {
    navigation.navigate("ManageGroup");
  };

  return (
    <Screen style={styles.container} safeTop>
      <Row>
        <GroupSelector />
        <Space />
        <TouchableOpacity onPress={openManageGroupScreen}>
          <Settings2 />
        </TouchableOpacity>
      </Row>

      <Space height={16} />

      <DateSelector />

      <Space height={16} />

      <Row>
        <PagerTab focused>
          <Text preset="title">Todos</Text>
        </PagerTab>
        <PagerTab>
          <Text>Dishes</Text>
        </PagerTab>
      </Row>

      <Space height={16} />

      <PagerView style={styles.viewPager} initialPage={0}>
        <ListTodos />

        <ListDishes />
      </PagerView>

      <PlusButton onPress={addTodo}>
        <Text color={theme.colors.textInverted}>Add</Text>
        <Plus color={theme.colors.textInverted} size={20} />
      </PlusButton>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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
  button: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 16,
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.palette.black[50],
    paddingHorizontal: 16,
    width: "100%",
  },

  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
