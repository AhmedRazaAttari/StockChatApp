import React, { Component } from "react";
import {
  View,
  Text,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

import { Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

class ConnectPortfolio extends Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Image
              style={{
                flex: 1,
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 2,
                marginBottom: 0,
                marginRight: 5,
                borderColor: "#147efb"
                //alignSelf: "center",
                //marginTop: 15
              }}
              source={require("../../images/group_chat.png")}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 10
                }}
              >
                <Text
                  style={{ paddingLeft: 20, fontSize: 15, fontWeight: "bold" }}
                >
                  $TSLA
                </Text>
                {/* <Image
                  style={{
                    height: 15,
                    width: 15,j
                    //justifyContent: "center",
                    //alignSelf: "center",
                    marginLeft: 5
                    //paddingBottom: 5
                  }}
                  source={require("../../../assets/verified.png")}
                /> */}
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text style={{ color: "green", fontWeight: "bold" }}>
                    $TSLA{" "}
                  </Text>
                </TouchableOpacity>
                <Text>moving higher</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ConnectPortfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36
  },
  searchbar: {
    marginTop: 50
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 5,
    shadowColor: "lightgrey",
    marginHorizontal: 10,
    shadowOpacity: 1.0,
    marginVertical: 5,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#F5F8FA"
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
