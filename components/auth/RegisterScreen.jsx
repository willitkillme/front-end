import React, { useState } from 'react';
import { View, StyleSheet,Alert } from 'react-native';
import { TextInput, Button, Title,Text } from 'react-native-paper';
import { Link,router } from "expo-router";
import axios from 'axios';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleRegister = async () => {
    try {
        const response = await axios.post('/register/', { username, password,password2 });
        if (response.status === 201) {
          Alert.alert('Success', 'Registration successful. Please login.');
          router.replace('/login');
        } else {
          Alert.alert('Error', 'Registration failed. Please try again.');
        }
      } catch (error) {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={password2}
        onChangeText={text => setPassword2(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Register
      </Button>
      <View style={styles.footerContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Link href="/login" style={styles.loginLink}>
          Login
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    width: '100%',
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
