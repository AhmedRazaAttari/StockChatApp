import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import fire, { firestore } from "../../database/firebase";

export default function App({ ...props }) {

  const [isUser, SetUser] = useState(false);


  return (
    <View style={styles.getStarted}>
      <View>
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 50
          }}
        >
          <Image
            source={require("../../../assets/icondark.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>

        <View>
          <Text style={styles.Stockchat}> Stock Chat</Text>
        </View>

        <View>
          <Text style={styles.subtext}>Connect with investors</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.getstartedButton}
          onPress={() => props.navigation.push("ChoosingUsername")}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "white",
              fontWeight: "600"
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <View style={{marginTop : 20}}>
          <Text
            style={styles.loginText}
            onPress={() => props.navigation.push("Login")}
          >
            Already Registered? Sign In
        </Text>
        </View>
        {/* <View>
          <TouchableOpacity onPress={() => props.navigation.push("Login")}>
            <Text style={styles.HaveAccount}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getstartedButton: {
    backgroundColor: "#147efb",

    padding: 15,
    borderRadius: 30,
    width: 220
  },
  getStarted: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    //backgroundColor: "#1E2429",
    backgroundColor: "white",

    width: Dimensions.get("screen").width
  },

  HaveAccount: {
    color: "black",
    textAlign: "center",
    top: 35,
    fontSize: 15
  },
  Stockchat: {
    color: "#1E2429",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "800"
    //fontFamily: "Montserrat_700Bold"
  },
  subtext: {
    color: "black",
    textAlign: "center",
    top: 35,
    fontSize: 20,
    marginHorizontal: 40
  },
  loginText : {
    fontSize : 18
  }
});
