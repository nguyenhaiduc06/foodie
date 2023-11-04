import React, { FC, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import { theme } from "@/theme";
import { Text } from "./Text";
import { Space } from "./Space";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

type DateSelectorProps = {
  date: Date;
  onChangeDate: (date: Date) => void;
};

const Container = styled.View`
  height: 56px;
  border-radius: 16px;
  background-color: ${theme.colors.foreground};
  gap: 8px;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const Button = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
`;

const CalendarButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const CalenderContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DateSelector: FC<DateSelectorProps> = (props) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { date, onChangeDate, ...rest } = props;
  const nextDate = () => {
    const nextDate = dayjs(date).add(1, "day");
    onChangeDate(nextDate.toDate());
  };

  const previousDate = () => {
    const previousDate = dayjs(date).subtract(1, "day");
    onChangeDate(previousDate.toDate());
  };

  const selectDate = (date: Date) => {
    onChangeDate(date);
  };

  return (
    <Container>
      <Button onPress={previousDate}>
        <ChevronLeft size={28} color={theme.colors.primary} />
      </Button>
      <Space />
      <CalendarButton onPress={() => setDatePickerVisible(true)}>
        <CalendarIcon size={20} color={theme.colors.text} />
        <Text preset="title">
          {dayjs(date).calendar(dayjs(), {
            sameDay: "[Hôm nay], DD/MM",
            nextDay: "[Ngày mai], DD/MM",
            nextWeek: "[Ngày] DD/MM",
            lastDay: "[Hôm qua], DD/MM",
            lastWeek: "[Ngày] DD/MM",
            sameElse: "[Ngày] DD/MM",
          })}
        </Text>
      </CalendarButton>
      <Space />
      <Button onPress={nextDate}>
        <ChevronRight size={28} color={theme.colors.primary} />
      </Button>

      <Modal
        visible={datePickerVisible}
        transparent={true}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setDatePickerVisible(false)}>
          <CalenderContainer>
            <Space height={200} />
            <Calendar
              onDayPress={(day) => {
                selectDate(new Date(day.timestamp));
                setDatePickerVisible(false);
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
          </CalenderContainer>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
};
