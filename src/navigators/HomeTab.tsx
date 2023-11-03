import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  Archive,
  BookOpenText,
  ClipboardList,
  User,
} from "lucide-react-native";
import {
  DishesScreen,
  ProfileScreen,
  RecipesScreen,
  StorageScreen,
  TodoScreen,
} from "@/screens";

export type HomeTabParamList = {
  Todo: undefined;
  Dishes: undefined;
  Storage: undefined;
  Recipes: undefined;
  Profile: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  BottomTabScreenProps<HomeTabParamList, T>;

const Home = createBottomTabNavigator<HomeTabParamList>();

export const HomeTab = () => {
  return (
    <Home.Navigator>
      <Home.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarIcon: ({ color }) => <ClipboardList color={color} />,
        }}
      />
      <Home.Screen
        name="Dishes"
        component={DishesScreen}
        options={{
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
