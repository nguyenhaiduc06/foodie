import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CreateProfileScreen, AccountScreen } from "@/screens";
import { useAuthStore } from "@/stores";

export type AuthenticateStackParamList = {
  Account: undefined;
  CreateProfile: undefined;
};

export type AuthenticateStackScreenProps<
  T extends keyof AuthenticateStackParamList
> = NativeStackScreenProps<AuthenticateStackParamList, T>;

const Authenticate = createNativeStackNavigator<AuthenticateStackParamList>();

export const AuthenticateStack = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <Authenticate.Navigator
      initialRouteName={user ? "CreateProfile" : "Account"}
    >
      <Authenticate.Screen name="Account" component={AccountScreen} />
      <Authenticate.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
      />
    </Authenticate.Navigator>
  );
};
