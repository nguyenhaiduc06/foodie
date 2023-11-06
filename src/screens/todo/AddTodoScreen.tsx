import { FC, useState } from "react";
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
import { Alert } from "react-native";

type ScreenProps = MainStackScreenProps<"AddTodo">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const AddTodosScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [date, setDate] = useState(dayjs().toDate());
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const addTodo = useTodoStore((s) => s.addTodo);

  const submit = async () => {
    setLoading(true);
    const { error } = await addTodo({ name, amount, date });
    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.goBack();
  };
  return (
    <Screen safeBottom>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
        <Input placeholder="Tên" onChangeText={setName} />
        <Input placeholder="Số lượng" onChangeText={setAmount} />
        <Space />
        <Button
          preset="primary"
          label="Thêm"
          disabled={!name || !amount}
          loading={loading}
          onPress={submit}
        />
      </Container>
    </Screen>
  );
};
