import { FC, useEffect, useState } from "react";
import {
  Button,
  DateSelector,
  Input,
  Options,
  Screen,
  Space,
  Text,
} from "@/components";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";
import dayjs from "dayjs";
import { useDishStore } from "@/stores";
import { Alert, TouchableOpacity } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { CoverImagePicker } from "./CoverImagePicker";
import { theme } from "@/theme";

type ScreenProps = MainStackScreenProps<"UpdateDish">;

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

export const UpdateDishScreen: FC<ScreenProps> = (props) => {
  const { navigation, route } = props;
  const { dish } = route.params;
  const [name, setName] = useState(dish.name);
  const [meal, setMeal] = useState(dish.meal);
  const [date, setDate] = useState(dayjs(dish.date).toDate());
  // @ts-ignore
  const [image, setImage] = useState<ImageResult>({ uri: dish.image_url });
  const [updating, setUpdating] = useState(false);
  const updateDish = useDishStore((s) => s.updateDish);
  const deleteDish = useDishStore((s) => s.deleteDish);

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
      "Xóa món ăn",
      "Bạn có chắc muốn xóa món ăn này khỏi thực đơn?",
      [
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            deleteDish(dish.id);
            navigation.pop();
          },
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
    updateDish(dish.id, {
      name,
      date,
      image,
      meal,
    });
    setUpdating(false);
    navigation.goBack();
  };

  const shouldDisableSubmitButton =
    name == dish.name &&
    dayjs(dish.date).isSame(dayjs(date)) &&
    meal == dish.meal;
  return (
    <Screen safeBottom>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
        <CoverImagePicker image={image} onImagePicked={setImage} />
        <Input
          placeholder="Tên món ăn"
          onChangeText={setName}
          defaultValue={dish.name}
        />
        <Options
          options={MEAL_OPTIONS}
          selectedValue={meal}
          onChangeValue={setMeal}
        />
        <Space />
        <Button
          preset="primary"
          label="Cập nhật"
          onPress={submitUpdate}
          disabled={shouldDisableSubmitButton}
          loading={updating}
        />
      </Container>
    </Screen>
  );
};
