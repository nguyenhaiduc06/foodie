import React, { FC, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Input, Screen, Space, Text } from "@/components";
import { useAuthStore } from "@/stores";
import { MainStackScreenProps } from "@/navigators";

type ScreenProps = MainStackScreenProps<"CreateProfile">;

export const CreateProfileScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const createProfile = useAuthStore((s) => s.createProfile);
  const submit = async () => {
    setLoading(true);
    const { error } = await createProfile({ name });
    setLoading(false);
    if (error) {
      Alert.alert(error.message);
      return;
    }
    navigation.replace("HomeTab");
  };
  return (
    <Screen style={styles.container} safeBottom>
      <Space height={16} />
      <Text preset="heading">Create your profile</Text>
      <Space height={24} />
      <Text>Name</Text>
      <Space height={4} />
      <Input placeholder={"Tên của bạn"} onChangeText={setName} />
      <Space />
      <Button
        preset="primary"
        disabled={!name}
        loading={loading}
        label={"Tiếp tục"}
        onPress={submit}
      />
      <Space height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
