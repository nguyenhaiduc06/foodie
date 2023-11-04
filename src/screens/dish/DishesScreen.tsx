import React, { FC } from "react";
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
import { Screen, DishItem, Text, Space, DateSelector } from "@/components";
import { theme } from "@/theme";
import { useDishStore } from "@/stores";

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
  padding: 16px;
`;

export const DishesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const dishes = useDishStore((s) => s.dishes);
  const fetchDishes = useDishStore((s) => s.fetchDishes);
  const fetching = useDishStore((s) => s.fetching);
  const date = useDishStore((s) => s.date);
  const setDate = useDishStore((s) => s.setDate);
  const dishesByMeal = dishes.reduce(
    (acc, dish) => {
      acc[dish.meal].push(dish);
      return acc;
    },
    [[], [], []]
  );

  const viewDishDetails = (dish) => {
    navigation.navigate("DishDetails", { dish });
  };

  return (
    <Screen>
      <Container>
        <DateSelector date={date} onChangeDate={setDate} />
      </Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchDishes} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Text preset="title">Bữa sáng</Text>
          <Space height={8} />
          <Section>
            {dishesByMeal[0].map((dish, index) => (
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
            {dishesByMeal[1].map((dish, index) => (
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
            {dishesByMeal[2].map((dish, index) => (
              <TouchableOpacity
                key={dish.id}
                onPress={() => viewDishDetails(dish)}
              >
                <DishItem size={DISH_ITEM_SIZE} dish={dish} />
              </TouchableOpacity>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
