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
import { useStorageStore, useTodoStore } from "../../stores";
import { MainStackScreenProps } from "@/navigators";
import dayjs from "dayjs";
import { Alert, View } from "react-native";

type ScreenProps = MainStackScreenProps<"UpdateStorage">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const UpdateStorageScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [storedIn, setStoredIn] = useState("");
  const [expireDate, setExpireDate] = useState(dayjs().toDate());
  const [loading, setLoading] = useState(false);
  const createStorate = useStorageStore((s) => s.createStorage);

  const submit = async () => {
    setLoading(true);
    const { error } = await createStorate({
      name,
      amount,
      storedIn,
      expireDate,
    });
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
        <Input placeholder="Tên" onChangeText={setName} />
        <Input placeholder="Số lượng" onChangeText={setAmount} />
        <Input placeholder="Nơi cất" onChangeText={setStoredIn} />
        <View>
          <Text preset="body">Ngày hết hạn</Text>
          <Space height={8} />
          <DateSelector date={expireDate} onChangeDate={setExpireDate} />
        </View>
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
