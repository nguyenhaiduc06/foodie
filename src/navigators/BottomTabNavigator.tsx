import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  DishesScreen,
  ProfileScreen,
  RecipesScreen,
  StorageScreen,
  TodoScreen,
} from "@/screens";

export type BottomTabParamList = {
  Todo: undefined;
  Dishes: undefined;
  Storage: undefined;
  Recipes: undefined;
  Profile: undefined;
};

export type BottomTabNavigatorProp =
  BottomTabNavigationProp<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen name="Dishes" component={DishesScreen} />
      <BottomTab.Screen name="Storage" component={StorageScreen} />
      <BottomTab.Screen name="Recipes" component={RecipesScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};
