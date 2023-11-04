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
  StoragesScreen,
  TodosScreen,
} from "@/screens";

export type HomeTabParamList = {
  Todos: undefined;
  Dishes: undefined;
  Storages: undefined;
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
        name="Todos"
        component={TodosScreen}
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
        name="Storages"
        component={StoragesScreen}
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
