import { useEffect } from "react";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  AddTodoScreen,
  ManageGroupScreen,
  RecipeDetailsScreen,
  SelectGroupScreen,
} from "@/screens";
import { useUserStore } from "@/stores";
import { HomeTab } from "./HomeTab";
import { AuthenticateStack } from "./AuthenticateStack";

export type MainStackParamList = {
  AuthenticateStack: undefined;
  HomeTab: undefined;

  SelectGroup: undefined;
  ManageGroup: undefined;

  AddTodo: undefined;
  RecipeDetails: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
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
