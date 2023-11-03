import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type {
  BottomTabNavigationProp,
  BottomTabScreenProps as RNBottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ProfileScreen,
  RecipesScreen,
  StorageScreen,
} from "@/screens";

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

const Home = createBottomTabNavigator<BottomTabParamList>();

export const HomeTab = () => {
  return (
    <Home.Navigator>
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Home.Screen name="Storage" component={StorageScreen} />
      <Home.Screen name="Recipes" component={RecipesScreen} />
      <Home.Screen name="Profile" component={ProfileScreen} />
    </Home.Navigator>
  );
};
