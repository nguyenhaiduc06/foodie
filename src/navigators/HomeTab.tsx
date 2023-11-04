import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  Archive,
  BookOpenText,
  ClipboardList,
  ShoppingCart,
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
          title: "Cần mua",
          tabBarIcon: ({ color }) => <ShoppingCart color={color} />,
        }}
      />
      <Home.Screen
        name="Dishes"
        component={DishesScreen}
        options={{
          title: "Thực đơn",
          tabBarIcon: ({ color }) => <ClipboardList color={color} />,
        }}
      />
      <Home.Screen
        name="Storages"
        component={StoragesScreen}
        options={{
          title: "Lưu trữ",
          tabBarIcon: ({ color }) => <Archive color={color} />,
        }}
      />
      <Home.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          title: "Công thức",
          tabBarIcon: ({ color }) => <BookOpenText color={color} />,
        }}
      />
      <Home.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Home.Navigator>
  );
};
