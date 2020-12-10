import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Profiles from "../components/Profiles";
import Messages from "../components/Messages";
import TrendingStocks from "../components/TrendingStocks";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import AddGroup from "./Sub/AddGroup";
import fire, { firestore } from "../database/firebase";

import StockGroupCard from "../components/StockGroupCard";

const Chat = props => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getChats();
  }, []);

  function getChats() {
    const db = firestore;
    var groupArray = [];
    db.collection("groups").onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        if (change.type == "added") {
          console.log("New Group: ", change.doc.data());
          groupArray.push(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified Group: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed Group", change.doc.data());
        }

        setGroups(groupArray);
      });
    });
  }
  return (
    // <LinearGradient colors={["#AAB8C2", "#FFF"]} style={styles.gradient}>
    <View style={styles.container}>
      <ScrollView style={styles.col2}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Trending Stocks</Text>
          <View>
            <TouchableOpacity
            // onPress={() => props.navigation.navigate("AddGroup")}
            >
              <Feather name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <TrendingStocks></TrendingStocks>

        {/* <View style={styles.ops}> */}

        <View style={styles.col}>
          <Text style={styles.header}> Stock Chats</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
          <StockGroupCard
            ticker="$TSLA"
            pctchange="+1.02%"
            onPress={() => {
              props.navigation.navigate("StockChat", {
                //itemId: "TSLA",
                itemName: "$TSLA",
                itemPic: "https://i.stack.imgur.com/l60Hf.png"
              });
            }}
          ></StockGroupCard>
          <StockGroupCard
            ticker="$SQ"
            pctchange="+4.55%"
            onPress={() => {
              props.navigation.navigate("StockChat", {
                // itemId: item.id,
                // itemName: item.login,
                itemPic: "https://i.stack.imgur.com/l60Hf.png",
                itemName: "$SQ"
              });
            }}
          ></StockGroupCard>
          <StockGroupCard
            ticker="$NET"
            pctchange="+3.521%"
            onPress={() => {
              props.navigation.navigate("StockChat", {
                itemName: "$NET",
                // itemId: item.id,
                // itemName: item.login,
                itemPic: "https://i.stack.imgur.com/l60Hf.png"
              });
            }}
          ></StockGroupCard>
        </View>

        <View style={styles.col}>
          <Text style={styles.header2}>Trading Groups</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("AddGroup")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{marginTop : 20}, styles.col}>
          <Text style={styles.header2}>Other's chat</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CreateChat")}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={groups}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Discussion", {
                    item
                  });
                }}
              >
                <Messages item={item}></Messages>
                <View style={styles.seperator}></View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </ScrollView>
    </View>
    // </View>
    // </LinearGradient>
  );
};
export default Chat;

const styles = StyleSheet.create({
  list: {
    marginTop: 300
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row"
  },
  seperator: {
    borderColor: "lightgrey",
    borderWidth: 0.5,
    marginLeft: 30,
    marginVertical: 10,
    width: "100%"
  },
  gradient: {
    height: "100%",
    //position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    //paddingHorizontal: 20,
    paddingTop: 30
  },
  container: {
    height: "100%",
    backgroundColor: "white",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    paddingTop: 30
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    flex: 1,
    fontSize: 24
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    flex: 1,
    fontSize: 24,
    paddingBottom: 10
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center"
  },
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#FFF",
    // marginHorizontal: -20,
    paddingHorizontal: 20
  },
  col: {
    flexDirection: "row",
    //marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center"
  },
  stockchats: {
    //flexDirection: "row"
    marginVertical: 10,
    marginHorizontal: 20
    //alignItems: "center"
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000119",
    flex: 1,
    fontSize: 20
  }
});
