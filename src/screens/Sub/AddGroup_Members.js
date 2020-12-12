import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    Platform,
    StyleSheet,
    TextInput,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TextInputComponent,
    Alert
} from "react-native";
import fire, { firestore } from "../../database/firebase";

export default function AddMember({ route, navigation }) {
    //   const [groupName, setGroupName] = useState();
    //   const [errorState, setErrorState] = useState("");
    //   const [isLoading, setisLoading] = useState(false);
    const { groupName } = route.params;

    return (
        <View>
            <Text>All Receipents Appear Here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
