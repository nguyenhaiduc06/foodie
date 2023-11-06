import { FC, useState } from "react";
import { Button, DateSelector, Input, Screen, Space, Text } from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { Plus } from "lucide-react-native";
import dayjs from "dayjs";

type ScreenProps = MainStackScreenProps<"AddDish">;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

const ImagePlacholder = styled.TouchableOpacity`
  height: 200px;
  width: 100%;
  border-radius: 16px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  flex-direction: row;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const AddDishScreen: FC<ScreenProps> = (props) => {
  const [date, setDate] = useState(dayjs().toDate());
  return (
    <Screen safeBottom>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
        <ImagePlacholder>
          <Plus size={18} color={theme.colors.textDim} />
          <Text dim>Chọn ảnh</Text>
        </ImagePlacholder>
        <Input placeholder="Tên món ăn" />
        <Space />
        <Button preset="primary" label="Thêm" />
      </Container>
    </Screen>
  );
};
