import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Appbar, Text, Card, Chip } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import Gif from "react-native-gif";
import { router } from "expo-router";
import axios from "axios";
import ResultComp from "../ResultComp";
import NutrientScreen from "./NutrientScreen";

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false); 
  const [apiData, setApiData] = useState([]);
  const [showNutrients, setShowNutrients] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsScanning(false);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    const response = await axios.get("/checkAllergies/", {
      params: {
        barcode: data,
      },
    });
    console.log(response.data);
    setApiData(response.data);
    console.log(response.data);
  };

  const handleScanButtonPress = () => {
    setScanned(false); 
    setIsScanning(true); 
  };

  const goToProfile = () => {
    router.replace("/profile");
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <View style={styles.appbarContent}>
          <Text style={styles.title}>Barcode Reader</Text>
        </View>
        <Appbar.Action icon="account" size={50} onPress={goToProfile} />
      </Appbar.Header>

      {isScanning ? ( 
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <>
          <Gif
            style={styles.gif}
            source={require("../../assets/imgs/barcode_read.gif")}
          />
          <Button mode="contained" onPress={handleScanButtonPress}>
            Scan
          </Button>
          {apiData && apiData.product_name ? (
            <>
              {!showNutrients ? (
                <Button mode="contained" onPress={() => setShowNutrients(true)}>
                  Show nutrients
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => setShowNutrients(false)}
                >
                  Show allergy
                </Button>
              )}
            </>
          ) : null}

          <>
            <ScrollView>
              {apiData ? (
                <Card style={styles.productCard}>
                  {apiData && apiData.product_name ? (
                    <>
                      <Text style={styles.productName}>
                        Product name: {apiData.product_name}
                      </Text>

                      {!showNutrients ? (
                        <>
                          <ResultComp
                            allergen_matches={apiData.allergen_matches}
                            child={false}
                          />
                          {apiData.child_matches.map((child, index) => (
                            <ResultComp
                              key={index}
                              allergen_matches={child.matches}
                              name={child.child_name}
                              child={true}
                            />
                          ))}
                        </>
                      ) : (
                        <NutrientScreen product_data={apiData.product_data} nutrients={apiData.nutrients} />
                      )}
                    </>
                  ) : (
                    <Text style={styles.noProductName}>
                      No product available, please scan!
                    </Text>
                  )}
                </Card>
              ) : null}
            </ScrollView>
          </>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  appbarContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  gif: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: "5%",
  },
  productCard: {
    padding: 16,
    margin: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noProductName: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
});

export default HomeScreen;
