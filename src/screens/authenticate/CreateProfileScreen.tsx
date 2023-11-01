import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Screen, Space, Text } from "@/components";
import { useUserStore } from "@/stores";

export const CreateProfileScreen = () => {
  const session = useUserStore((s) => s.session);
  console.log(session?.user);
  const profile = useUserStore((s) => s.profile);
  const createProfile = useUserStore((s) => s.createProfile);
  const [name, setName] = useState("");
  const submit = () => {
    createProfile(name);
  };
  return (
    <Screen style={styles.container} safeBottom>
      <Space height={16} />
      <Text preset="heading">Create your profile</Text>
      <Space height={24} />
      <Text>Name</Text>
      <Space height={4} />
      <Input placeholder={"Your name"} onChangeText={setName} />
      <Space />
      <Button disabled={!name} label={"Continue"} onPress={submit} />
      <Space height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
