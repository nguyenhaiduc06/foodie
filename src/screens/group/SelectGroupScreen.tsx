import {
  Button,
  GroupItem,
  GroupMemberItem,
  Input,
  Screen,
  Space,
  Text,
} from "@/components";
import { StyleSheet } from "react-native";

export const SelectGroupScreen = () => {
  return (
    <Screen style={styles.container} safeBottom>
      <Text>Your groups</Text>
      <Space height={4} />
      <GroupItem />
      <Space height={8} />
      <GroupItem />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
