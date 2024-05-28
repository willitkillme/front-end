import { View, TextStyle } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.188:8000/api'; 

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2OTA2NzgwLCJpYXQiOjE3MTY4OTU5ODAsImp0aSI6ImFkZWU2NmU2ZjYwNTQwMzg5MTg0ZGRhNDQ1ZjcxMTcxIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhaW5venUifQ.aLKlM718cLgMwafMJBCEBBiGdDkLW8uhBrExXIzZ7W0";
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Save token to Axios headers
//TODO: remove after testing!
export default function HomeScreen() {
  return (
    <View>
      <Link style={styles.link} href="/about">About</Link>
      <Link style={styles.link} href="/login">Login</Link>
      <Link style={styles.link} href="/home">Home</Link>
      <Link style={styles.link} href="/profile">Profil</Link>
    </View>
  );
}

const styles = {
  link: {
    fontSize: 20,
    fontWeight: 'bold' as TextStyle['fontWeight'], // Explicitly specify the type
  }
};
