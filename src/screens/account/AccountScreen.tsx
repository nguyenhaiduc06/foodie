import { useAuthStore } from "@/stores";
import { Text, Screen, Space, Button } from "@/components";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { FC, useState } from "react";
import { HomeTabScreenProps, MainStackParamList } from "@/navigators";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AvatarPicker } from "./AvatarPicker";
import { ProfileReport } from "./ProfileReport";

type ScreenProps = CompositeScreenProps<
  HomeTabScreenProps<"Account">,
  NativeStackScreenProps<MainStackParamList>
>;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 16px;
`;

const ButtonContainer = styled.View`
  padding: 16px;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${theme.colors.foreground};
  align-self: center;
`;

export const AccountScreen: FC<ScreenProps> = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const account = useAuthStore((s) => s.account);
  const signOut = useAuthStore((s) => s.signOut);

  return (
    <Screen>
      <Container>
        <Avatar />
        <Text preset="title" style={{ textAlign: "center" }}>
          {account?.name}
        </Text>
        <ProfileReport />
        <Space />
      </Container>
      <ButtonContainer>
        <Button
          preset="secondary"
          label="Đăng xuất"
          loading={loading}
          onPress={async () => {
            setLoading(false);
            await signOut();
            setLoading(true);
            navigation.replace("SignIn");
          }}
        />
      </ButtonContainer>
    </Screen>
  );
};
