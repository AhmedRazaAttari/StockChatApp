import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import fire, { firestore } from "../database/firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Signup({ navigation }) {
  const [displayName, setdisplay] = useState();
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [isLoading, setLoading] = useState(false);

  const registerUser = () => {
    console.log(email)
    if (displayName !== "" && displayName !== undefined && email !== "" && email !== undefined && password !== "" && password !== undefined) {
      setLoading(true);
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          firestore.collection("users").doc(res.user.uid).set({
            id: res.user.uid,
            Name: displayName,
            email: email,
          }).then(() => {
            res.user.updateProfile({
              displayName: displayName,
            })
            alert("User registered succesfully")
            setLoading(false);
            setdisplay("");
            setEmail("");
            setPass("");
            navigation.navigate("Chat");

          })
          .catch(error => alert(error.message));
        })
        .catch(error => alert(error.message));
    }
    else {
      alert("please fill all fields!!!")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tcontainer}>

        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 60, width: 60 }}
            source={require("../../assets/icondark.png")}
          ></Image>

          <Text style={styles.Stockchat}> Stock Chat</Text>
        </View>

        <Text style={styles.tHeading}>Create Account</Text>

        <View style={{ width: "100%", alignItems: "center", padding: 5 }}>

          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={displayName}
            onChangeText={val => setdisplay(val)}
          />
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

          <TouchableOpacity onPress={() => registerUser()}>
            <View style={styles.btn}>
              <Text style={{ color: "white", fontSize: 19, fontWeight: "bold" }}>
                Sign Up
            </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Already Registered? Sign In
        </Text>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    margin: 30,
    marginEnd: 20,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: "black",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17
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
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  tcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  bcontainer: {
    flex: 5,
    padding: 30,
    width: "100%",
    justifyContent: "center",
    flexDirection: "column"
  },
  tHeading: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 20
  },
  toptcontainer: {
    //backgroundColor: "#3498db",
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
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 120
  },
  Stockchat: {
    color: "#1E2429",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold"
  }
});
