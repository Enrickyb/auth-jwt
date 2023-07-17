import { View, Text, StyleSheet, Pressable } from "react-native";

interface FormButtonProps {
  onPressProps: () => void;
}

export const FormButton = ({ onPressProps }: FormButtonProps) => {
  return (
    <Pressable style={styles.Button} onPress={onPressProps}>
      <Text style={styles.TextButton}>Sign In</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "#4461F2",
    width: 300,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  TextButton: {
    color: "#ffffff",
    fontSize: 16,
    borderRadius: 7,
  },
});
