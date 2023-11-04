import { useUserStore } from "@/stores";
import { Text, Screen, Space, Button } from "@/components";
import styled from "styled-components/native";
import { theme } from "@/theme";

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 16px;
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
  const signOut = useUserStore((s) => s.signOut);
  return (
    <Screen>
      <Container>
        <Avatar />
        <Space height={8} />
        <Text preset="title">Nguyen Hai Duc</Text>
        <Space />
      </Container>
      <ButtonContainer>
        <Button label="Sign out" />
      </ButtonContainer>
    </Screen>
  );
};
