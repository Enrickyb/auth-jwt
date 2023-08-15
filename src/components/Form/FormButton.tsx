import { View, Text, StyleSheet, Pressable, ButtonProps } from "react-native";

interface FormButtonProps extends ButtonProps {
  text?: any;
}

export const FormButton = ({ text, ...rest }: FormButtonProps) => {
  return (
    <Pressable style={styles.Button} {...rest}>
      {text}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#4461F2",
    width: 350,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 7,
  },
  TextButton: {
    color: "#ffffff",
    fontSize: 16,
    borderRadius: 7,
  },
});
