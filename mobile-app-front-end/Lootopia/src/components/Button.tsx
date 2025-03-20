import React from 'react';
import {Pressable, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  type?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'md' | 'sm' | 'lg' | 'icon';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const Button = ({
  children,
  onPress,
  type = 'default',
  size = 'md',
  style,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={!disabled ? onPress : undefined}
      style={[
        styles.button,
        styles[type],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}>
      <Text
        style={[
          styles.text,
          type === 'link'
            ? styles.linkText
            : type === 'outline'
            ? styles.outlineText
            : styles.buttonText,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  default: {
    backgroundColor: '#3498db',
  },
  destructive: {
    backgroundColor: '#7B220F',
  },
  outline: {
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: 'transparent',
  },
  secondary: {
    backgroundColor: '#2ecc71',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  md: {
    height: 40,
    paddingHorizontal: 16,
  },
  sm: {
    height: 32,
    paddingHorizontal: 12,
  },
  lg: {
    height: 48,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
  },
  outlineText: {
    color: 'black',
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});
