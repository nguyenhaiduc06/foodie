import { useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  AuthenticateScreen,
  AddDishScreen,
  AddTodosScreen,
  CreateProfileScreen,
  DishDetailsScreen,
  ManageGroupScreen,
  RecipeDetailsScreen,
  SelectGroupScreen,
  StorageDetailsScreen,
  EditDishScreen,
  AddStorageScreen,
  AddRecipeScreen,
} from "@/screens";
import { useAuthStore } from "@/stores";
import { HomeTab } from "./HomeTab";
import { AuthenticateStack } from "./AuthenticateStack";
import { Dish, Group, Recipe, Storage } from "@/lib";

export type MainStackParamList = {
  Authenticate: undefined;
  CreateProfile: undefined;

  HomeTab: undefined;

  AddTodo: undefined;

  DishDetails: {
    dish: Dish;
  };
  AddDish: undefined;
  EditDish: {
    dish: Dish;
  };

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
  ManageGroup: {
    groupId: number;
  };
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

  const initialRouteName = profile
    ? "HomeTab"
    : session && session.user
    ? "CreateProfile"
    : "Authenticate";

  return (
    <Main.Navigator initialRouteName={initialRouteName}>
      <Main.Screen
        name="Authenticate"
        component={AuthenticateScreen}
        options={{
          title: "Đăng nhập",
        }}
      />
      <Main.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
        options={{
          title: "Thông tin cá nhân",
        }}
      />
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
      <Main.Screen name="EditDish" component={EditDishScreen} />

      <Main.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      <Main.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          title: "Thêm công thức nấu ăn",
          presentation: "modal",
        }}
      />
      <Main.Screen name="StorageDetails" component={StorageDetailsScreen} />
      <Main.Screen
        name="AddStorage"
        component={AddStorageScreen}
        options={{
          title: "Thêm thực phẩm đang lưu trữ",
          presentation: "modal",
        }}
      />

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
          title: "Thông tin nhóm",
          presentation: "modal",
        }}
      />
    </Main.Navigator>
  );
};
