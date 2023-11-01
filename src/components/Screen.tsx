import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Screen = (props) => {
  const { children, style, safeTop, safeBottom, ...rest } = props;
  const insets = useSafeAreaInsets();
  const safeAreaStyle = {
    paddingTop: safeTop ? insets.top : undefined,
    paddingBottom: safeBottom ? insets.bottom : undefined,
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, safeAreaStyle, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
