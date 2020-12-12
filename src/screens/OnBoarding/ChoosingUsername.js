import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import fire, { firestore } from "../../database/firebase";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {" "}
    {children}
  </TouchableWithoutFeedback>
);

export default function App({ route, navigation }) {
  const [usersName, setUsersName] = useState([])
  const [username, setusername] = useState();


  useEffect(() => {
    fetchNames()
  }, []);

  function fetchNames() {
    firestore.collection("users").get().then(function (snapshot) {
      var names = []
      snapshot.forEach(anotherSnapshot => {
        console.log("anotherSnapshot.data()", anotherSnapshot.data().Name)
        for (var i = 0; i < anotherSnapshot.data.length; i++) {
          names.push(anotherSnapshot.data().Name)
        }
        setUsersName(names)

      })
    })
  }

  function checkUserName() {
    console.log("usersName *****", usersName)
    if (username !== undefined && username !== "") {
      if (usersName.indexOf(username) > -1) {
        Alert.alert("this username is not available.. Please try another one.")
      }
      else {
        navigation.navigate("PhoneNumber", { username: username })
      }
      // var arraycontainname = usersName.indexOf(username) > -1;

      // if(arraycontainname){
      // navigation.navigate("PhoneNumber", {username : username})
      // }
      // else{
      // Alert.alert("this username is not available.. Please try another one.")
      // }
    }
    else {
      Alert.alert("Please enter user name")
    }
  }

  return (
    <View style={styles.getStarted}>
      <TouchableOpacity
        style={{ position: "absolute", top: 50, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign style={styles.back} name="left" size={30} color="black" />
      </TouchableOpacity>
      <View style={{ display: "flex", alignSelf: "center", marginTop: 100 }}>
        <Image
          source={require("../../../assets/icondark.png")}
          style={{ width: 80, height: 80 }}
        />
      </View>

      <View>
        <Text style={styles.Stockchat}> START BY CREATING A USERNAME</Text>
      </View>
      <View>
        <Text style={styles.username}>
          Usernames will be tagged in messages and shown inside your chats.
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
        <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
          <Input
            //einputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.Input}
            placeholder="Username"
            placeholderTextColor="lightgrey"
            onChangeText={val => setusername(val)}
          />

        </View>

        <View
          style={{
            paddingHorizontal: 10,
            top: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.Button}
            onPress={() => checkUserName()}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "white",
                fontWeight: "600"
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  getStarted: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    width: Dimensions.get("screen").width
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: "100%"
  },
  HaveAccount: {
    color: "white",
    textAlign: "center",
    fontSize: 15
  },
  Stockchat: {
    marginTop: 50,
    color: "black",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold"
  },
  username: {
    marginTop: 10,
    color: "black",
    textAlign: "center",
    fontSize: 15,
    padding: 18
  },
  Input: {
    borderBottomWidth: 0,
    backgroundColor: "white",
    //backgroundColor: "red",
    //borderBottomColor: "black",
    //borderColor: "#3C4956",
    borderColor: "black",
    padding: 12,
    paddingLeft: 30,
    color: "black",
    height: 50,
    fontSize: 21,
    borderRadius: 30
  }
});
