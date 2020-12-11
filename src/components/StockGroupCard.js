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

const StockGroupCard = ({ ticker, pctchange, uri, count, onPress, image, msg }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity>
          <Image
            source={{ uri: uri }}
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
            source={{ uri: "https://i.stack.imgur.com/l60Hf.png" }}
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
                {ticker}
              </Text>

              <Text
                style={{ color: "green", fontWeight: "bold", paddingLeft: 10 }}
              >
                {pctchange}
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
              <Text style={{ paddingLeft: 20 }}>{msg}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StockGroupCard;

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
    shadowRadius: 2,
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
