import React, { FC, useState } from "react";
import { Alert } from "react-native";
import { Button, Input, Screen } from "@/components";
import { useAuthStore } from "@/stores";
import { MainStackScreenProps } from "@/navigators";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

export const SignUpScreen: FC<MainStackScreenProps<"SignUp">> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((s) => s.signUp);

  const submit = async () => {
    setLoading(true);
    const { error } = await signUp({ name, username, password });
    setLoading(false);
    if (error) {
      Alert.alert(error);
    } else {
      navigation.replace("HomeTab");
    }
  };

  const signIn = () => {
    navigation.replace("SignIn");
  };
  return (
    <Screen safeBottom>
      <Container>
        <Input
          placeholder={"Tên"}
          onChangeText={setName}
          autoCapitalize="words"
        />
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
          disabled={!name || !username || !password}
          loading={loading}
          label={"Đăng ký"}
          onPress={submit}
        />
        <Button preset="secondary" label={"Đăng nhập"} onPress={signIn} />
      </Container>
    </Screen>
  );
};
