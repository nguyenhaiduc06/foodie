import React, { FC, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import {
  Screen,
  DishItem,
  Text,
  Space,
  DateSelector,
  ActionButton,
  EmptyState,
} from "@/components";
import { theme } from "@/theme";
import { useDishStore } from "@/stores";
import { Plus } from "lucide-react-native";

const SCREEN_PADDING = 16;
const GAP = 16;
const COLUMN_COUNT = 2;
const DISH_ITEM_SIZE =
  (Dimensions.get("window").width -
    2 * SCREEN_PADDING -
    (COLUMN_COUNT - 1) * GAP) /
  COLUMN_COUNT;

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Dishes">,
  NativeStackScreenProps<MainStackParamList>
>;

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  width: 100%;
`;

const Container = styled.View`
  padding: 0 16px;
`;

const ActionButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
  align-items: flex-end;
`;

export const DishesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const initDishStore = useDishStore((s) => s.initDishStore);
  const dishes = useDishStore((s) => s.dishes);
  const fetchDishes = useDishStore((s) => s.fetchDishes);
  const fetching = useDishStore((s) => s.fetching);
  const date = useDishStore((s) => s.date);
  const setDate = useDishStore((s) => s.setDate);

  useEffect(() => {
    initDishStore();
  }, []);

  const dishesByMeal = dishes.reduce(
    (acc, dish) => {
      acc[dish.meal].push(dish);
      return acc;
    },
    {
      breakfast: [],
      lunch: [],
      dinner: [],
    }
  );

  const viewDishDetails = (dish) => {
    navigation.navigate("UpdateDish", { dish });
  };

  const addDish = () => {
    navigation.navigate("AddDish");
  };

  return (
    <Screen>
      <Container>
        <Space height={16} />
        <DateSelector date={date} onChangeDate={setDate} />
        <Space height={16} />
      </Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchDishes} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          {dishes.length == 0 ? (
            <EmptyState label="Chưa có món ăn nào trong thực đơn" />
          ) : (
            <>
              <Text preset="title">Bữa sáng</Text>
              <Space height={8} />
              <Section>
                {dishesByMeal.breakfast.map((dish, index) => (
                  <TouchableOpacity
                    key={dish.id}
                    onPress={() => viewDishDetails(dish)}
                  >
                    <DishItem size={DISH_ITEM_SIZE} dish={dish} />
                  </TouchableOpacity>
                ))}
              </Section>
              <Space height={16} />
              <Text preset="title">Bữa trưa</Text>
              <Space height={8} />
              <Section>
                {dishesByMeal.lunch.map((dish, index) => (
                  <TouchableOpacity
                    key={dish.id}
                    onPress={() => viewDishDetails(dish)}
                  >
                    <DishItem size={DISH_ITEM_SIZE} dish={dish} />
                  </TouchableOpacity>
                ))}
              </Section>
              <Space height={16} />
              <Text preset="title">Bữa tối</Text>
              <Space height={8} />
              <Section>
                {dishesByMeal.dinner.map((dish, index) => (
                  <TouchableOpacity
                    key={dish.id}
                    onPress={() => viewDishDetails(dish)}
                  >
                    <DishItem size={DISH_ITEM_SIZE} dish={dish} />
                  </TouchableOpacity>
                ))}
              </Section>
            </>
          )}

          {/* Add a space with a height of 72px to avoid being covered by the floating action button */}
          <Space height={72} />
        </Container>
      </ScrollView>
      <ActionButtonContainer>
        <ActionButton
          left={<Plus size={22} color={theme.colors.textInverted} />}
          label="Thêm"
          onPress={addDish}
        />
      </ActionButtonContainer>
    </Screen>
  );
};
