import { AntDesign, Ionicons } from "@expo/vector-icons";

import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fire, { firestore } from "../database/firebase";


export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const userLogin = () => {
    if (email !== undefined && email !== "" && password !== undefined && password !== "") {
      setLoading(true);
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
          Alert.alert("User logged-in successfully!");
          setLoading(false);
          setEmail("");
          setPass("");
          navigation.navigate("Chat");
        })
        .catch(error => Alert.alert(error.message));
    } else {
      Alert.alert("Enter details to signin!");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tcontainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 60, width: 60 }}
            source={require("../../assets/icondark.png")}
          ></Image>

          <Text style={styles.Stockchat}> Stock Chat</Text>
        </View>
        <Text style={styles.tHeading}>Welcome Back</Text>

        <View style={{ padding: 15, width: '100%', alignItems: "center", marginTop: 15 }}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            onChangeText={val => setEmail(val)}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={password}
            onChangeText={val => setPass(val)}
            maxLength={15}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={() => userLogin()}>
            <View style={styles.btn}>
              <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
                Sign In
            </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("SignUp")}
          >
            Don't have an account? Sign Up
        </Text>
        </View>
      </View>
      {/* <View style={styles.bcontainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={val => setEmail(val)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={val => setPass(val)}
          maxLength={15}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => userLogin()}>
          <View style={styles.btn}>
            <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
              Sign In
            </Text>
          </View>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("SignUp")}
        >
          Don't have an account? Sign Up
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    margin: 20,
    fontSize: 20
  },
  loginText: {
    color: "black",
    marginTop: 40,
    textAlign: "center"
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  tcontainer: {
    //backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30
  },
  bcontainer: {
    flex: 1.5,
    borderTopLeftRadius: 90,
    width: "100%",
    padding: 30
  },

  tHeading: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 20
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  menuContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    padding: 30,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 26
  },
  activemenu: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    width: "45%",
    backgroundColor: "#17C37B",
    borderRadius: 10
  },
  activemenuText: {
    fontSize: 20,
    color: "#000000",
    marginTop: 5
  },
  aText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginTop: 5
  },

  inputs: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    width: "90%",
    height: "10%",
    borderWidth: 1,
    borderColor: "grey"
  },
  header: { alignItems: "center", padding: 30 },
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: 120
  },
  Stockchat: {
    color: "#1E2429",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    //fontFamily: "Montserrat_700Bold"
  }
});
