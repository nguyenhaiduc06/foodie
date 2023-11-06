import { useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  AccountScreen,
  AddDishScreen,
  AddTodosScreen,
  CreateProfileScreen,
  DishDetailsScreen,
  ManageGroupScreen,
  RecipeDetailsScreen,
  SelectGroupScreen,
  StorageDetailsScreen,
} from "@/screens";
import { useAuthStore } from "@/stores";
import { HomeTab } from "./HomeTab";
import { AuthenticateStack } from "./AuthenticateStack";
import { Dish, Recipe, Storage } from "@/lib";

export type MainStackParamList = {
  Authenticate: undefined;
  CreateProfile: undefined;

  HomeTab: undefined;

  AddTodo: undefined;

  DishDetails: {
    dish: Dish;
  };
  AddDish: undefined;
  UpdateDish: undefined;

  StorageDetails: {
    storage: Storage;
  };
  AddStorage: undefined;
  UpdateStorage: undefined;

  RecipeDetails: {
    recipe: Recipe;
  };
  AddRecipe: undefined;
  UpdateRecipe: undefined;

  SelectGroup: undefined;
  ManageGroup: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const session = useAuthStore((s) => s.session);
  const profile = useAuthStore((s) => s.profile);
  const initUserStore = useAuthStore((s) => s.initUserStore);

  useEffect(() => {
    initUserStore();
  }, []);

  console.log(profile);

  const initialRouteName = profile
    ? "HomeTab"
    : session && session.user
    ? "CreateProfile"
    : "Authenticate";

  return (
    <Main.Navigator initialRouteName={initialRouteName}>
      <Main.Screen name="Authenticate" component={AccountScreen} />
      <Main.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Main.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Main.Screen
        name="AddTodo"
        component={AddTodosScreen}
        options={{
          title: "Thêm thực phẩm cần mua",
          presentation: "modal",
        }}
      />
      <Main.Screen name="DishDetails" component={DishDetailsScreen} />
      <Main.Screen
        name="AddDish"
        component={AddDishScreen}
        options={{
          title: "Thêm món ăn vào thực đơn",
          presentation: "modal",
        }}
      />

      <Main.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      <Main.Screen name="StorageDetails" component={StorageDetailsScreen} />

      <Main.Screen
        name="SelectGroup"
        component={SelectGroupScreen}
        options={{
          title: "Chọn nhóm",
        }}
      />
      <Main.Screen
        name="ManageGroup"
        component={ManageGroupScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Main.Navigator>
  );
};
