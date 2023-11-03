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
import {
  AlignJustify,
  Archive,
  BookOpenText,
  ClipboardList,
  User,
} from "lucide-react-native";

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
          tabBarIcon: ({ color }) => <ClipboardList color={color} />,
        }}
      />
      <Home.Screen
        name="Storage"
        component={StorageScreen}
        options={{
          tabBarIcon: ({ color }) => <Archive color={color} />,
        }}
      />
      <Home.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color }) => <BookOpenText color={color} />,
        }}
      />
      <Home.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Home.Navigator>
  );
};
