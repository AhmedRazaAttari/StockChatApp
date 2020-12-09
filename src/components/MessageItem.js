import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import firebase, { firestore } from "./../database/firebase";
import { LinearGradient } from "expo-linear-gradient";

const MessageItem = ({ item, image, message }) => {
  const userID = firebase.auth().currentUser.uid;
  function messageView() {
    if (userID === item.senderId) {
      return (
        <View style={styles.SentContainer}>
          <View style={styles.sentBubble}>
            <Text style={styles.sentMessage}>{item.message}</Text>
          </View>
          <Text style={styles.duration}>{item.senderEmail}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.receivedContainer}>
          <Image source={{ uri: image }} style={styles.img} />
          <View>
            <View style={styles.recievedBubble}>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.recievedDuration}>{item.senderEmail}</Text>
          </View>
        </View>
      );
    }
  }
  return messageView();
};

export default MessageItem;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "right"
  },
  recievedDuration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "left"
  },
  receivedContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: 250
  },
  SentContainer: {
    marginVertical: 15,
    alignSelf: "flex-end",
    borderRadius: 30
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    marginRight: 10
  },
  message: {
    fontSize: 14,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold"
  },
  sentMessage: {
    fontSize: 14,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
    color: "#FFF"
  },
  sentBubble: {
    backgroundColor: "#147efb",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomRightRadius: 5
  },
  recievedBubble: {
    backgroundColor: "lightgrey",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5
  }
});
