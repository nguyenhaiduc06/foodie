import React, { FC, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import {
  Screen,
  RecipeItem,
  Input,
  Space,
  ActionButton,
  EmptyState,
} from "@/components";
import { useRecipeStore } from "@/stores";
import { Plus, Search } from "lucide-react-native";
import { theme } from "@/theme";

const SCREEN_PADDING = 16;
const GAP = 16;
const COLUMN_COUNT = 2;
const RECIPE_ITEM_SIZE =
  (Dimensions.get("window").width -
    2 * SCREEN_PADDING -
    (COLUMN_COUNT - 1) * GAP) /
  COLUMN_COUNT;

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Recipes">,
  NativeStackScreenProps<MainStackParamList>
>;

const Container = styled.View`
  padding: 0 16px;
`;

const Section = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  border-radius: 16px;
`;

const ActionButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
  align-items: flex-end;
`;

export const RecipesScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const initRecipeStore = useRecipeStore((s) => s.initRecipeStore);
  const recipes = useRecipeStore((s) => s.recipes);
  const fetchRecipes = useRecipeStore((s) => s.fetchRecipes);
  const fetching = useRecipeStore((s) => s.fetching);

  const filteredRecipes = recipes.filter(
    (r) => r.name.toLowerCase().indexOf(search.toLowerCase().trim()) >= 0
  );

  useEffect(() => {
    initRecipeStore();
  }, []);

  const viewRecipeDetails = (recipe) => {
    navigation.navigate("UpdateRecipe", {
      recipe,
    });
  };

  const addRecipe = () => {
    navigation.navigate("AddRecipe");
  };
  return (
    <Screen>
      <Container>
        <Space height={16} />
        <Input
          placeholder="Tìm kiếm theo tên"
          left={<Search color={theme.colors.textDim} />}
          onChangeText={setSearch}
        />
        <Space height={16} />
      </Container>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={fetchRecipes} refreshing={fetching} />
        }
      >
        <Container onStartShouldSetResponder={() => true}>
          {filteredRecipes.length == 0 && (
            <EmptyState label="Chưa có công thức nấu ăn nào" />
          )}
          <Section>
            {filteredRecipes.map((recipe, index) => (
              <TouchableOpacity
                key={recipe.id}
                onPress={() => viewRecipeDetails(recipe)}
              >
                <RecipeItem size={RECIPE_ITEM_SIZE} recipe={recipe} />
              </TouchableOpacity>
            ))}
          </Section>
        </Container>
      </ScrollView>
      <ActionButtonContainer>
        <ActionButton
          label="Thêm"
          left={<Plus color={theme.colors.textInverted} size={22} />}
          onPress={addRecipe}
        />
      </ActionButtonContainer>
    </Screen>
  );
};
