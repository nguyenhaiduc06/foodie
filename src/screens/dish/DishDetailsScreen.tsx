import React, { FC } from "react";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { MainStackScreenProps } from "@/navigators";
import { DishItem, Screen } from "@/components";
import { theme } from "@/theme";
import { useDishStore } from "@/stores";

type ScreenProps = MainStackScreenProps<"DishDetails">;

const Section = styled.View`
  background-color: white;
  border-radius: 16px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  width: 100%;
`;

const Container = styled.View`
  padding: 16px;
`;

export const DishDetailsScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const dishes = useDishStore((s) => s.dishes);
  const fetchDishes = useDishStore((s) => s.fetchDishes);
  const fetching = useDishStore((s) => s.fetching);

  const viewDishDetails = (dish) => {
    navigation.navigate("DishDetails");
  };
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchDishes} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          <Section>
            {dishes.map((dish, index) => (
              <React.Fragment key={dish.id}>
                {index != 0 && <Divider />}
                <TouchableOpacity onPress={() => viewDishDetails(dish)}>
                  <DishItem dish={dish} />
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
