import React, { FC, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input, Screen, Space, Text } from "@/components";
import { useAuthStore } from "@/stores";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const SignInScreen: FC<MainStackScreenProps<"SignIn">> = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("nguyenhaiduc06@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((s) => s.signIn);

  const submit = async () => {
    setLoading(true);
    const { account, error } = await signIn({ email, password });
    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    if (!account) {
      Alert.alert("No account");
      return;
    }
    navigation.replace("HomeTab");
  };

  const signUp = () => {
    navigation.replace("SignUp");
  };
  return (
    <Screen safeBottom>
      <Container>
        <Input
          placeholder={"Email"}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input placeholder={"Mật khẩu"} onChangeText={setPassword} />
        <Button
          preset="primary"
          disabled={!email || !password}
          loading={loading}
          label={"Đăng nhập"}
          onPress={submit}
        />
        <Button preset="secondary" label={"Đăng ký"} onPress={signUp} />
      </Container>
    </Screen>
  );
};
