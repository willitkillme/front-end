import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  BackHandler
} from "react-native";
import { Chip, Button } from "react-native-paper";
import axios from "axios";
import { router } from "expo-router";
import AllergiesComp from "./AllergiesComp";

const ProfileScreen = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/profile/")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.replace("/home");
        return true; 
      }
    );

    return () => backHandler.remove(); 
  }, [router]);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }



  const goToAddChild = () => {
    router.replace("/addchild");
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.hellotext}>Hello, {data.username}!</Text>
        <Button
          mode="contained"
          style={{ borderRadius: 8, height: 40, width: 80 }}
          onPress={goToAddChild}
        >
          Add
        </Button>
      </View>
      <ScrollView>
        <AllergiesComp
          username={data.username}
          allergies={data.allergies}
          child={false}
        />

        {data.children.map((child, index) => (
          <React.Fragment key={index}>
            <AllergiesComp
              username={child.name}
              allergies={child.allergies}
              child={true}
              id={child.id}
            />
            
          </React.Fragment>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hellotext: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default ProfileScreen;
