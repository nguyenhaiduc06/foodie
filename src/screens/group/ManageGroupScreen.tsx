import {
  Button,
  GroupMemberItem,
  Input,
  Screen,
  Space,
  Text,
} from "@/components";
import { StyleSheet } from "react-native";

export const ManageGroupScreen = () => {
  return (
    <Screen style={styles.container} safeBottom>
      <Text>Group name</Text>
      <Space height={4} />
      <Input placeholder="Group name" />
      <Space height={16} />
      <Text>Members</Text>
      <Space height={4} />
      <GroupMemberItem />
      <Space height={8} />
      <GroupMemberItem />
      <Space />
      <Button label="Save" />
      <Space height={16} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
