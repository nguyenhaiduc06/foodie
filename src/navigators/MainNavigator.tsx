import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import {
  AddTodoScreen,
  ManageGroupScreen,
  RecipeDetailsScreen,
  SelectGroupScreen,
} from "@/screens";
import { useUserStore } from "@/stores";
import { useEffect } from "react";
import { AuthenticateStack } from "./AuthenticateStack";

export type MainStackParamList = {
  AuthenticateStack: undefined;
  BottomTab: undefined;
  AddTodo: undefined;
  RecipeDetails: undefined;
};

export type MainStackNavigatorProp =
  NativeStackNavigationProp<MainStackParamList>;

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  const session = useUserStore((s) => s.session);
  const profile = useUserStore((s) => s.profile);
  const initUserStore = useUserStore((s) => s.initUserStore);

  console.log({ profile });

  useEffect(() => {
    initUserStore();
  }, []);

  const shouldShowAppContent = session && session.user && profile;

  return (
    <Main.Navigator
      initialRouteName={
        shouldShowAppContent ? "BottomTab" : "AuthenticateStack"
      }
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
            name="BottomTab"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Main.Screen
            name="AddTodo"
            component={AddTodoScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Main.Screen
            name="ManageGroup"
            component={ManageGroupScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Main.Screen
            name="SelectGroup"
            component={SelectGroupScreen}
            options={{
              presentation: "modal",
            }}
          />
          <Main.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        </>
      )}
    </Main.Navigator>
  );
};
