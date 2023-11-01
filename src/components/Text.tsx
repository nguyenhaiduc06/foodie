import { styled } from "styled-components/native";
import { theme } from "../theme";
const Heading = styled.Text<{ color: any }>`
  font-family: "Inter_600SemiBold";
  font-size: 24px;
  color: ${(p) => p.color ?? theme.colors.text};
`;
const Title = styled.Text<{ color: any }>`
  font-family: "Inter_500Medium";
  font-size: 18px;
  color: ${(p) => p.color ?? theme.colors.text};
`;
const Body = styled.Text<{ color: any }>`
  font-family: "Inter_400Regular";
  font-size: 16px;
  color: ${(p) => p.color ?? theme.colors.textDim};
`;

export const Text = (props) => {
  const { color, preset, children } = props;
  if (preset == "heading") {
    return <Heading color={color}>{children}</Heading>;
  }
  if (preset == "title") {
    return <Title color={color}>{children}</Title>;
  }
  return <Body color={color}>{children}</Body>;
};
