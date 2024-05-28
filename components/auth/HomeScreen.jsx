import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Appbar, Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Gif from 'react-native-gif';
import { router } from "expo-router";

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // State to track if scanning is active

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsScanning(false);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleScanButtonPress = () => {
    setScanned(false); // Reset scanned state
    setIsScanning(true); // Enable scanning
  };

  const goToProfile=()=>
  {
    router.replace('/profile');
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={styles.appbarContent}>
          <Text style={styles.title}>Barcode Reader</Text>
        </View>
        <Appbar.Action
          icon="account"
          size={50}
          onPress={goToProfile}
        />
      </Appbar.Header>
      
      {isScanning ? ( // Render barcode scanner only when scanning is active
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <Gif style={styles.gif} source={require('../../assets/imgs/barcode_read.gif')} />
          <Button mode="contained" onPress={handleScanButtonPress}>Scan</Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appbarContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  gif: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: '20%',
  },
});

export default HomeScreen;
