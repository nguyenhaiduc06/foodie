import { FC, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Button,
  DateSelector,
  Input,
  Screen,
  Space,
  Text,
} from "../../components";
import { useTodoStore } from "../../stores";
import { MainStackScreenProps } from "@/navigators";
import dayjs from "dayjs";
import { Alert, TouchableOpacity } from "react-native";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"UpdateTodo">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const UpdateTodoScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { todo } = route.params;
  const [date, setDate] = useState(dayjs(todo.date).toDate());
  const [name, setName] = useState(todo.name);
  const [amount, setAmount] = useState(todo.amount);
  const [updating, setUpdating] = useState(false);
  const addTodo = useTodoStore((s) => s.addTodo);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={promptDelete}>
          <Text color={theme.colors.danger} weight={500}>
            Xóa
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const promptDelete = () => {
    Alert.alert(
      "Xóa thực phẩm",
      "Bạn có chắc muốn xóa thực phẩm này khỏi danh sách cần mua?",
      [
        {
          text: "Xóa",
          style: "destructive",
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ]
    );
  };

  const submitUpdate = async () => {
    setUpdating(true);
    const { error } = await addTodo({ name, amount, date });
    setUpdating(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.goBack();
  };

  const shouldDisableSubmitButton =
    name == todo.name &&
    amount == todo.amount &&
    dayjs(date).isSame(dayjs(todo.date));

  return (
    <Screen safeBottom>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
        <Input
          placeholder="Tên"
          onChangeText={setName}
          defaultValue={todo.name}
        />
        <Input
          placeholder="Số lượng"
          onChangeText={setAmount}
          defaultValue={todo.amount}
        />
        <Space />
        <Button
          preset="primary"
          label="Thêm"
          disabled={shouldDisableSubmitButton}
          loading={updating}
          onPress={submitUpdate}
        />
      </Container>
    </Screen>
  );
};
