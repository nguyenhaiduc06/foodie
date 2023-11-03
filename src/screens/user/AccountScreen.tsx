import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Screen, Space, Text } from "@/components";
import { useUserStore } from "@/stores";
import { AuthenticateStackScreenProps } from "@/navigators";

export const AccountScreen: FC<AuthenticateStackScreenProps<"Account">> = (
  props
) => {
  const { navigation } = props;
  const [email, setEmail] = useState("nguyenhaiduc06@gmail.com");
  const [password, setPassword] = useState("123456");
  const signInWithEmail = useUserStore((s) => s.signInWithEmail);
  const submit = async () => {
    const { data: profile, error } = await signInWithEmail(email, password);
    if (!profile) {
      navigation.navigate("CreateProfile");
    }
  };
  return (
    <Screen style={styles.container} safeBottom>
      <Space height={16} />
      <Text preset="heading">Continue with Email</Text>
      <Space height={24} />
      <Text>Email</Text>
      <Space height={4} />
      <Input placeholder={"Email Address"} onChangeText={setEmail} />
      <Space height={16} />
      <Text>Password</Text>
      <Space height={4} />
      <Input placeholder={"Password"} onChangeText={setPassword} />
      <Space />
      <Button
        disabled={!email || !password}
        label={"Continue"}
        onPress={submit}
      />
      <Space height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
