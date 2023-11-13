import {
  createBottomTabNavigator,
  type BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  Archive,
  Bell,
  BookOpenText,
  ClipboardList,
  ShoppingCart,
  User,
  Users2,
} from "lucide-react-native";
import {
  AccountScreen,
  DishesScreen,
  ProfileScreen,
  RecipesScreen,
  StoragesScreen,
  TodosScreen,
} from "@/screens";
import { GroupSelector, Text } from "@/components";
import { TouchableOpacity } from "react-native";
import { theme } from "@/theme";

export type HomeTabParamList = {
  Todos: undefined;
  Dishes: undefined;
  Storages: undefined;
  Recipes: undefined;
  Account: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  BottomTabScreenProps<HomeTabParamList, T>;

const Home = createBottomTabNavigator<HomeTabParamList>();

export const HomeTab = () => {
  return (
    <Home.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: () => <GroupSelector />,
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerTitleAlign: "left",
        headerRight({}) {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectGroup")}
            >
              <Bell size={22} color={theme.colors.text} />
            </TouchableOpacity>
          );
        },
      })}
    >
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
        name="Account"
        component={AccountScreen}
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Home.Navigator>
  );
};
