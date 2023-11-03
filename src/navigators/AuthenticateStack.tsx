import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CreateProfileScreen, AccountScreen } from "@/screens";

export type AuthenticateStackParamList = {
  Account: undefined;
  CreateProfile: undefined;
};

export type AuthenticateStackScreenProps<
  T extends keyof AuthenticateStackParamList
> = NativeStackScreenProps<AuthenticateStackParamList, T>;

const Authenticate = createNativeStackNavigator<AuthenticateStackParamList>();

export const AuthenticateStack = () => {
  return (
    <Authenticate.Navigator>
      <Authenticate.Screen name="Account" component={AccountScreen} />
      <Authenticate.Screen
        name="CreateProfile"
        component={CreateProfileScreen}
      />
    </Authenticate.Navigator>
  );
};
