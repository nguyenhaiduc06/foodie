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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
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

export const DateSelector = () => {
  const [showModal, setShowDateModal] = useState(false);

  return (
    <>
      <Row>
        <Space />
        <DateContainer>
          <ChevronLeft />
          <TouchableOpacity onPress={() => setShowDateModal(true)}>
            <Text>Today</Text>
          </TouchableOpacity>
          <ChevronRight />
        </DateContainer>
      </Row>

      <Space height={16} />
      <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowDateModal(false)}>
          <View style={styles.modalContainer}>
            <Space height={200} />
            <Calendar
              onDayPress={(day) => {
                // setDate(day.timestamp);
                setShowDateModal(false);
              }}
              style={{
                padding: 8,
                borderRadius: 16,
              }}
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
    </>
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
