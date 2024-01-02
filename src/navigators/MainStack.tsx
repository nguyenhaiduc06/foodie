import { useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  AddDishScreen,
  AddTodosScreen,
  DishDetailsScreen,
  RecipeDetailsScreen,
  StorageDetailsScreen,
  UpdateDishScreen,
  AddStorageScreen,
  AddRecipeScreen,
  SignInScreen,
  SignUpScreen,
  GroupDetailsScreen,
  ListGroupsScreen,
  AddGroupScreen,
  UpdateRecipeScreen,
  UpdateStorageScreen,
  UpdateTodoScreen,
} from "@/screens";
import { useAuthStore } from "@/stores";
import { HomeTab } from "./HomeTab";
import { AuthenticateStack } from "./AuthenticateStack";
import { Dish, Group, Recipe, Storage, Todo } from "@/lib";
import { UpdateGroupScreen } from "@/screens/group/UpdateGroupScreen";

export type MainStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  CreateProfile: undefined;

  HomeTab: undefined;

  AddTodo: undefined;
  UpdateTodo: {
    todo: Todo;
  };

  AddDish: undefined;
  DishDetails: {
    dish: Dish;
  };
  UpdateDish: {
    dish: Dish;
  };

  AddStorage: undefined;
  StorageDetails: {
    storage: Storage;
  };
  UpdateStorage: {
    storage: Storage;
  };

  AddRecipe: undefined;
  RecipeDetails: {
    recipe: Recipe;
  };
  UpdateRecipe: {
    recipe: Recipe;
  };

  AddGroup: undefined;
  ListGroups: undefined;
  GroupDetails: {
    group: Group;
  };
  UpdateGroup: {
    group: Group;
  };
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const authed = useAuthStore((s) => s.authed);

  const initialRouteName = authed ? "HomeTab" : "SignIn";

  return (
    <Main.Navigator initialRouteName={initialRouteName}>
      <Main.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: "Đăng nhập",
        }}
      />
      <Main.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "Đăng Ký",
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
      <Main.Screen
        name="UpdateTodo"
        component={UpdateTodoScreen}
        options={{
          title: "Chỉnh sửa",
          presentation: "modal",
        }}
      />

      <Main.Screen
        name="AddDish"
        component={AddDishScreen}
        options={{
          title: "Thêm món ăn vào thực đơn",
          presentation: "modal",
        }}
      />
      <Main.Screen
        name="DishDetails"
        component={DishDetailsScreen}
        options={{
          title: "Chi tiết",
        }}
      />
      <Main.Screen
        name="UpdateDish"
        component={UpdateDishScreen}
        options={{
          title: "Chỉnh sửa",
          presentation: "modal",
        }}
      />

      <Main.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          title: "Thêm công thức nấu ăn",
          presentation: "modal",
        }}
      />
      <Main.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{
          title: "Chi tiết",
        }}
      />
      <Main.Screen
        name="UpdateRecipe"
        component={UpdateRecipeScreen}
        options={{
          title: "Chỉnh sửa",
          presentation: "modal",
        }}
      />

      <Main.Screen
        name="AddStorage"
        component={AddStorageScreen}
        options={{
          title: "Thêm thực phẩm đang lưu trữ",
          presentation: "modal",
        }}
      />
      <Main.Screen
        name="StorageDetails"
        component={StorageDetailsScreen}
        options={{
          title: "Chi tiết",
        }}
      />
      <Main.Screen
        name="UpdateStorage"
        component={UpdateStorageScreen}
        options={{
          title: "Chỉnh sửa",
          presentation: "modal",
        }}
      />

      <Main.Screen
        name="AddGroup"
        component={AddGroupScreen}
        options={{
          title: "Tạo nhóm mới",
          presentation: "modal",
        }}
      />
      <Main.Screen
        name="ListGroups"
        component={ListGroupsScreen}
        options={{
          title: "Chọn nhóm",
        }}
      />
      <Main.Screen
        name="GroupDetails"
        component={GroupDetailsScreen}
        options={{
          title: "Chi tiết",
        }}
      />
      <Main.Screen
        name="UpdateGroup"
        component={UpdateGroupScreen}
        options={{
          title: "Chỉnh sửa",
          presentation: "modal",
        }}
      />
    </Main.Navigator>
  );
};
