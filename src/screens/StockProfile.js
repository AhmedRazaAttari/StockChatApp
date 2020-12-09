import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/AntDesign";
import LastWatch from "../components/LastWatch";
import Received from "../components/Received";
import Sent from "../components/Sent";
import Data from "../dummy/Data.json";
import Input from "../components/Input";
import { Header, Left, Right, Body, Button } from "native-base";

const StockProfile = ({ route, navigation }) => {
  const [inputMessage, setMessage] = useState("");

  const send = () => {
    Data.push({ id: inputMessage, message: inputMessage });
    setMessage("");
  };

  var txt = [];
  for (var i = 5; i < Data.length; i++) {
    txt.push(<Sent key={Data[i].id} message={Data[i].message} />);
  }
  console.log(Data);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <LinearGradient colors={["#657786", "#FFF"]} style={styles.container}>
        <View style={styles.main}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="left" color="#000119" size={24} />
            </TouchableOpacity>
            {/* <Text style={styles.username}>{itemName}</Text> */}
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity>
                <Image
                  style={{
                    flex: 1,
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    borderWidth: 2,
                    marginBottom: 0,
                    marginRight: 5,
                    //borderColor: "#147efb",
                    alignSelf: "center",
                    marginTop: 15
                  }}
                  source={{ uri: "https://i.stack.imgur.com/l60Hf.png" }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingVertical: 20
                }}
              >
                COMPANY, INC.
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "left",

                  paddingHorizontal: 30
                }}
              >
                About
              </Text>

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 18,
                  textAlign: "left",
                  flexWrap: "wrap",
                  flex: 1,
                  paddingHorizontal: 30,
                  paddingVertical: 20
                }}
              >
                Company's mission is to accelerate the world's transition.
                Company was founded in 2003 by a group of engineers who wanted
                to prove that people didn't need to compromise to drive electric
                – that electric vehicles can be better, quicker and more fun to
                drive than gasoline cars.
              </Text>

              <Button
                full
                //rounded
                iconLeft
                primary
                style={{
                  borderRadius: 10,
                  marginTop: 10,

                  backgroundColor: "black",
                  margin: 20
                }}
                //onPress={() => this.props.navigation.navigate("ThankYou")}
              >
                <Text
                  style={{
                    flex: 2,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Join Group
                </Text>
              </Button>

              <Button
                full
                //rounded
                iconLeft
                primary
                style={{
                  borderRadius: 10,
                  marginTop: 10,

                  backgroundColor: "black",
                  margin: 20
                }}
                // onPress={() => this.props.navigation.navigate("GroupFeed")}
                //onPress={handleHelpPress}
              >
                <Text
                  style={{
                    flex: 2,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  View Members
                </Text>
              </Button>

              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  textAlign: "center",
                  flexWrap: "wrap",
                  flex: 1,
                  paddingHorizontal: 30,
                  paddingVertical: 20
                }}
              >
                All messages are for informational purposes only.
              </Text>
            </View>

            {/* {this._rnder_post_data()} */}

            <View style={{ height: 100 }}></View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
export default StockProfile;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  main: {
    backgroundColor: "#FFF",
    height: "88%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black"
  }
});
