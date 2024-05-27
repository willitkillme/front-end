import React, { useState } from "react";
import { View, StyleSheet,Alert } from 'react-native';
import { TextInput, Button, Title,Text } from 'react-native-paper';
import { Link,router } from "expo-router";
import axios from "axios"

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post('/token/', { username, password });
      if (response.status === 200) {
        const token = response.data.access; // Assuming token is returned in response
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Save token to Axios headers
        Alert.alert('Success', 'Login successful.');
        router.replace('/home');
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <View style={styles.footerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Link href="/register" style={styles.registerLink}>
          Register
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff", // Optional: You can change the background color
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    marginBottom: 20,
    width: "100%",
  },
  button: {
    width: "100%",
    marginBottom: 20,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
