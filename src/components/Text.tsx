import { styled } from "styled-components/native";
import { theme } from "../theme";
import { TextProps as RNTextProps } from "react-native";
import { FC } from "react";

const FONT_FAMILY_BY_WEIGHT = {
  400: "Inter_400Regular",
  500: "Inter_500Medium",
  600: "Inter_600SemiBold",
};

const PRESETS = {
  heading: {
    fontFamily: FONT_FAMILY_BY_WEIGHT[600],
    fontSize: 24,
  },
  title: {
    fontFamily: FONT_FAMILY_BY_WEIGHT[500],
    fontSize: 18,
  },
  body: {
    fontFamily: FONT_FAMILY_BY_WEIGHT[400],
    fontSize: 16,
  },
};

type TextProps = RNTextProps & {
  preset?: keyof typeof PRESETS;
  dim?: boolean;
  color?: string;
  size?: number;
  weight?: 400 | 500 | 600;
};

const StyledText = styled.Text<{
  fontFamily: string;
  fontSize: number;
  color: string;
  dim: boolean;
}>`
  font-family: ${(p) => p.fontFamily};
  font-size: ${(p) => p.fontSize}px;
  color: ${(p) => p.color};
  opacity: ${(p) => (p.dim ? 0.4 : 1)};
`;

export const Text: FC<TextProps> = (props) => {
  const {
    preset = "body",
    dim = false,
    color = theme.colors.text,
    size,
    weight,
    children,
    ...rest
  } = props;
  const fontFamliy = weight
    ? FONT_FAMILY_BY_WEIGHT[weight]
    : PRESETS[preset].fontFamily;
  const fontSize = size ? size : PRESETS[preset].fontSize;
  return (
    <StyledText
      fontFamily={fontFamliy}
      fontSize={fontSize}
      color={color}
      dim={dim}
      {...rest}
    >
      {children}
    </StyledText>
  );
};
