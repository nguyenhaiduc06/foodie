import React, { FC, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Input, Screen, Space, Text } from "@/components";
import { useAuthStore } from "@/stores";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const AuthenticateScreen: FC<MainStackScreenProps<"Authenticate">> = (
  props
) => {
  const { navigation } = props;
  const [email, setEmail] = useState("nguyenhaiduc06@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const signInWithEmail = useAuthStore((s) => s.signInWithEmail);
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);

  const submitSignIn = async () => {
    setLoadingSignIn(true);
    const { profile, error } = await signInWithEmail(email, password);
    setLoadingSignIn(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    if (!profile) {
      navigation.navigate("CreateProfile");
      return;
    }
    navigation.replace("HomeTab");
  };
  const submitSignUp = async () => {
    setLoadingSignUp(true);
    const { error } = await signUpWithEmail(email, password);
    setLoadingSignUp(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.navigate("CreateProfile");
  };
  return (
    <Screen safeBottom>
      <Container>
        <Input placeholder={"Email"} onChangeText={setEmail} />
        <Input placeholder={"Mật khẩu"} onChangeText={setPassword} />
        <Space height={16} />
        <Button
          preset="primary"
          disabled={!email || !password}
          loading={loadingSignIn}
          label={"Đăng nhập"}
          onPress={submitSignIn}
        />
        {/* <Button
          preset="secondary"
          disabled={!email || !password}
          loading={loadingSignUp}
          label={"Đăng ký"}
          onPress={submitSignUp}
        /> */}
      </Container>
    </Screen>
  );
};
