import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    Platform,
    StyleSheet,
    FlatList,
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
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';


export default function AddMember({ route, navigation }) {

    const [isloading, setloading] = useState(true);
    const [AllUsers, SetUsers] = useState([])
    const { groupName } = route.params;

    useEffect(() => {
        isloading && fetchedUsers()
    })

    function fetchedUsers() {
        var items = []

        firestore.collection("users").get().then((snapshot) => {
            snapshot.forEach((anotherSnapshot) => {
                if (anotherSnapshot.data().id === fire.auth().currentUser.uid) {
                    console.log("Current user profile")
                }
                else {
                    items.push({
                        id: anotherSnapshot.data().id,
                        Name: anotherSnapshot.data().Name,
                        email: anotherSnapshot.data().email
                    })
                }
            })
        }).then(() => {
            SetUsers(items)
            setloading(false)
        })
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, width: '100%', padding: 18 }}>
                {/* <Text>{"\n"}</Text> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: "bold" }}>Select Receipent</Text>
                    <TouchableOpacity>
                        <Feather name="search" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={AllUsers}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item }) => {
                        console.log("FLAAAAAAAAAATIST ==>", item)
                        return (
                            <TouchableOpacity>
                                <View style={{ flexDirection: "column" }} >
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 60, marginBottom: 10 }}>
                                        <Image style={{ borderRadius: 100, backgroundColor: 'black', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.Name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                ></FlatList>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
