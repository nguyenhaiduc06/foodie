import { Button, View } from "react-native";
import { useUserStore } from "../stores";

export const ProfileScreen = () => {
  const signOut = useUserStore((s) => s.signOut);
  return (
    <View>
      <Button title={"Sign out"} onPress={() => signOut()} />
    </View>
  );
};
