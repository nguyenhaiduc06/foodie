import { useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  AddTodosScreen,
  DishDetailsScreen,
  RecipeDetailsScreen,
  StorageDetailsScreen,
} from "@/screens";
import { useUserStore } from "@/stores";
import { HomeTab } from "./HomeTab";
import { AuthenticateStack } from "./AuthenticateStack";
import { Dish, Recipe, Storage } from "@/lib";

export type MainStackParamList = {
  AuthenticateStack: undefined;
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
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  const session = useUserStore((s) => s.session);
  const profile = useUserStore((s) => s.profile);
  const initUserStore = useUserStore((s) => s.initUserStore);

  useEffect(() => {
    initUserStore();
  }, []);

  const shouldShowAppContent = session && session.user && profile;

  return (
    <Main.Navigator
      initialRouteName={shouldShowAppContent ? "HomeTab" : "AuthenticateStack"}
    >
      {!shouldShowAppContent ? (
        <Main.Screen
          name="AuthenticateStack"
          component={AuthenticateStack}
          options={{ headerShown: false }}
        />
      ) : (
        <>
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
              presentation: "modal",
            }}
          />
          <Main.Screen name="DishDetails" component={DishDetailsScreen} />
          <Main.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
          <Main.Screen name="StorageDetails" component={StorageDetailsScreen} />
        </>
      )}
    </Main.Navigator>
  );
};
