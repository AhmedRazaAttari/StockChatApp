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
    TouchableHighlight,
    Alert
} from "react-native";
import fire, { firestore } from "../../database/firebase";
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';


export default function AddMember({ route, navigation }) {

    const [isloading, setloading] = useState(true);
    const [ParticipentsIDS, setParticipentsID] = useState([])
    const [AllUsers, SetUsers] = useState([])

    // const [ShowSelected, ShowSelectedUser] = useState(false)
    // const [selectedReceipents, SetselectedReceipents] = useState([])
    // const [selectedReceipentsids, SetselectedReceipentsids] = useState([])

    const { groupName } = route.params;

    useEffect(() => {
        isloading && fetchedUsers()
    })

    function fetchedUsers() {
        var UserId = fire.auth().currentUser.uid;

        firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").get().then(function (snapshot) {
            setParticipentsID(snapshot.data().PartcipentsList)
            console.log("PARTICIPENTS FROM GROUP CHAT", ParticipentsIDS)
        })
            .then(() => {
                var items = []
                console.log("ITEMS ********", items)
                for (var i = 0; i < ParticipentsIDS.length; i++) {
                    firestore.collection("users").doc(ParticipentsIDS[i]).get().then((snapshot) => {
                        console.log("SNAPSHOOOOOOOOT", snapshot.data())
                        items.push({
                            id: snapshot.data().id,
                            Name: snapshot.data().Name,
                            email: snapshot.data().email
                        })
                    }).then(() => {
                        SetUsers(items)
                        setloading(false)
                    })
                }

            })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", height: 80, width: "100%", backgroundColor: "white", alignItems: "center", justifyContent: "space-around" }}>
                <TouchableOpacity
                    // style={{ position: "absolute", top: 50, left: 20 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={30} color="black" style={{ marginTop: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>{groupName}</Text>
                <Entypo color="black" style={{ marginTop: 20 }} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("AddMoreMember", {groupName : groupName, ParticipentsIDS : ParticipentsIDS})}>
                <View style={{ flexDirection: "column" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 60, marginBottom: 10 }}>
                        <Image style={{ borderRadius: 100, backgroundColor: 'green', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Add Participent</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={{ flexDirection: "column" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 60, marginBottom: 10 }}>
                        <Image style={{ borderRadius: 100, backgroundColor: 'green', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                        <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Invite via Link</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
