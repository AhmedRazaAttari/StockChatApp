import React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Input = ({ term, onSendPress, onTermChange, onValidateTextField }) => {
  return (
    <View style={{ backgroundColor: "white", height: 80 }}>
      <View style={styles.container}>
        {/* <Ionicons name="ios-add" color="#147efb" size={30} /> */}
        <TextInput
          placeholder="Message"
          value={term}
          onChangeText={onTermChange}
          style={styles.input}
          onEndEditing={onValidateTextField}
        />
        <TouchableOpacity onPress={onSendPress}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              backgroundColor: "#147efb",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {/* <Ionicons name="ios-arrow-up" color="white" size={30} /> */}
            {/* <Feather name="arrow-up" color="white" size={28} fontWeight={900} /> */}
            <FontAwesome5
              name="arrow-up"
              color="white"
              size={20}
              fontWeight={900}
            />
          </View>

          {/* <Ionicons name="ios-send" color="#147efb" size={30} />  */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0,0,0,0.2)",
    width: "95%",
    position: "absolute",
    bottom: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "lightgrey"
    //backgroundColor: "lightgrey"
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 10,
    flex: 1
  }
});
