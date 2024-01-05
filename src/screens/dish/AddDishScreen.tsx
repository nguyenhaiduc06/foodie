import { FC, useState } from "react";
import {
  Button,
  DateSelector,
  Input,
  Options,
  Screen,
  Space,
} from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import dayjs from "dayjs";
import { useDishStore } from "@/stores";
import { Alert } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { CoverImagePicker } from "./CoverImagePicker";

type ScreenProps = MainStackScreenProps<"AddDish">;

const MEAL_OPTIONS = [
  { value: "breakfast", label: "Bữa sáng" },
  { value: "lunch", label: "Bữa trưa" },
  { value: "dinner", label: "Bữa tối" },
];

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const AddDishScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [meal, setMeal] = useState("breakfast");
  const [date, setDate] = useState(dayjs().toDate());
  const [image, setImage] = useState<ImageResult>();
  const [creating, setCreating] = useState(false);
  const createDish = useDishStore((s) => s.createDish);

  const submitCreate = async () => {
    setCreating(true);
    await createDish({
      name,
      date,
      image,
      meal,
    });
    setCreating(false);
    navigation.pop();
  };
  return (
    <Screen safeBottom>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input placeholder="Tên món ăn" onChangeText={setName} />
        <Options
          options={MEAL_OPTIONS}
          selectedValue={meal}
          onChangeValue={setMeal}
        />
        <Space />
        <Button
          preset="primary"
          label="Thêm"
          onPress={submitCreate}
          disabled={!name || !date || !meal}
          loading={creating}
        />
      </Container>
    </Screen>
  );
};
