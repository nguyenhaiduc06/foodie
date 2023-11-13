import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { CreateProfileScreen, SignInScreen } from "@/screens";

export type AuthenticateStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  CreateProfile: undefined;
};

export type AuthenticateStackScreenProps<
  T extends keyof AuthenticateStackParamList
> = NativeStackScreenProps<AuthenticateStackParamList, T>;

const Authenticate = createNativeStackNavigator<AuthenticateStackParamList>();

export const AuthenticateStack = () => {
  return (
    <Authenticate.Navigator>
      <Authenticate.Screen name="SignIn" component={SignInScreen} />
      <Authenticate.Screen name="SignUp" component={CreateProfileScreen} />
    </Authenticate.Navigator>
  );
};
