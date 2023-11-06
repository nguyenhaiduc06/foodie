import { useUserStore } from "@/stores";
import { Text, Screen, Space, Button, GroupItem } from "@/components";
import styled from "styled-components/native";
import { theme } from "@/theme";
import { useState } from "react";

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
`;

export const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const signOut = useUserStore((s) => s.signOut);

  return (
    <Screen>
      <Container>
        <Avatar />
        <Space height={8} />
        <Text preset="title">Nguyen Hai Duc</Text>
        <GroupItem />
        <GroupItem active />
        <GroupItem />
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
          }}
        />
      </ButtonContainer>
    </Screen>
  );
};
