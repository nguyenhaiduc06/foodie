import React, { FC } from "react";
import { ScrollView, RefreshControl } from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { Screen, DishItem } from "@/components";
import { theme } from "@/theme";
import { useDishStore } from "@/stores";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Dishes">,
  NativeStackScreenProps<MainStackParamList>
>;

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

export const DishesScreen: FC<ScreenProps> = (props) => {
  const dishes = useDishStore((s) => s.dishes);
  const fetchDishes = useDishStore((s) => s.fetchDishes);
  const fetching = useDishStore((s) => s.fetching);

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
                <DishItem dish={dish} />
              </React.Fragment>
            ))}
          </Section>
        </Container>
      </ScrollView>
    </Screen>
  );
};
