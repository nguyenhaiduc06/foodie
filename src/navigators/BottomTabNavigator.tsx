import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps as RNBottomTabScreenProps,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  DishesScreen,
  HomeScreen,
  ProfileScreen,
  RecipesScreen,
  StorageScreen,
  TodoScreen,
} from "@/screens";
import { Plus } from "lucide-react-native";

export type BottomTabParamList = {
  Home: undefined;
  Dishes: undefined;
  Storage: undefined;
  Recipes: undefined;
  Profile: undefined;
};

export type BottomTabNavigatorProp =
  BottomTabNavigationProp<BottomTabParamList>;

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  RNBottomTabScreenProps<BottomTabParamList, T>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen name="Storage" component={StorageScreen} />
      <BottomTab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          headerRight: () => <Plus />,
        }}
      />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};
