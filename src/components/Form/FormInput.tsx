import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";

interface FormInputProps extends TextInputProps {
  visiblePassword?: boolean;
  label?: string;
}

export const FormInput = ({ label, ...rest }: FormInputProps) => {
  return (
    <View>
      {label && <Text>{label}</Text>}
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    width: 350,
    height: 55,
    borderRadius: 7,
    paddingHorizontal: 20,
  },
});
