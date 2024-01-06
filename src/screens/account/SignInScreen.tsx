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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((s) => s.signIn);

  const submit = async () => {
    setLoading(true);
    const { error } = await signIn({ username, password });
    setLoading(false);
    if (!error) {
      navigation.replace("HomeTab");
    } else {
      Alert.alert(error);
    }
  };

  const signUp = () => {
    navigation.replace("SignUp");
  };
  return (
    <Screen safeBottom>
      <Container>
        <Input
          placeholder={"Tên tài khoản"}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Input
          placeholder={"Mật khẩu"}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          preset="primary"
          disabled={!username || !password}
          loading={loading}
          label={"Đăng nhập"}
          onPress={submit}
        />
        <Button preset="secondary" label={"Đăng ký"} onPress={signUp} />
      </Container>
    </Screen>
  );
};
