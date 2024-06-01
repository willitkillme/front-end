import { View, TextStyle, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

axios.defaults.baseURL = 'http://192.168.1.188:8000/api'; 

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    // Ensure navigation occurs after the component has mounted
    const navigate = async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      router.replace("/login");
    };
    navigate();
  }, [router]);

  return (
    <View style={styles.container}>
      <Link style={styles.link} href="/about">About</Link>
      <Link style={styles.link} href="/login">Login</Link>
      <Link style={styles.link} href="/home">Home</Link>
      <Link style={styles.link} href="/profile">Profile</Link>
      <Link style={styles.link} href="/addchild">Add Child</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontSize: 20,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    marginVertical: 10,
  }
});
