import { FC, useEffect, useRef, useState } from "react";
import {
  Button,
  Chip,
  GroupSelector,
  Screen,
  Space,
  Text,
  TodoItem,
} from "../components";
import {
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { styled } from "styled-components/native";
import { useTodoStore } from "../stores";
import { theme } from "../theme";
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

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  width: 100%;
`;

const DateContainer = styled.View`
  height: 40px;
  padding: 0 8px;
  gap: 4px;
  border-radius: 50%;
  background-color: ${theme.colors.foreground};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
`;

const PagerTab = styled.View<{ focused: boolean }>`
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

export const TodoScreen = (props) => {
  const [selected, setSelected] = useState("");
  const [showModal, setShowDateModal] = useState(false);
  const selectDateModal = useRef(null);
  const { navigation } = props;
  const todos = useTodoStore((state) => state.todos);
  const date = useTodoStore((state) => state.date);

  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const setDate = useTodoStore((state) => state.setDate);

  useEffect(() => {
    fetchTodos();
  }, []);

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

      {/* <Row>
        <Space />
        <DateContainer>
          <ChevronLeft />
          <TouchableOpacity onPress={() => setShowDateModal(true)}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          <ChevronRight />
        </DateContainer>
      </Row>

      <Space height={16} /> */}

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
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollViewContainer}>
            <View style={styles.todosContainer}>
              {todos.map((todo, index) => (
                <>
                  {index != 0 && <Divider />}
                  <TodoItem key={todo.id} todo={todo} />
                </>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
      </PagerView>

      <PlusButton onPress={addTodo}>
        <Text color={theme.colors.textInverted}>Add</Text>
        <Plus color={theme.colors.textInverted} size={20} />
      </PlusButton>

      <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowDateModal(false)}>
          <View style={styles.modalContainer}>
            <Space height={200} />
            <Calendar
              onDayPress={(day) => {
                setDate(day.timestamp);
                setShowDateModal(false);
              }}
              style={{
                padding: 8,
                borderRadius: 16,
              }}
              current={date.toString()}
              theme={{
                arrowColor: theme.colors.primary,
                textSectionTitleColor: theme.colors.primary,
                todayTextColor: theme.colors.primary,
                dayTextColor: theme.colors.text,
                textDisabledColor: theme.colors.textDim,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
