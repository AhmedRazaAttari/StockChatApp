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


export default function AddMoreMember({ route, navigation }) {

    const [isloading, setloading] = useState(true);
    const [AllUsers, SetUsers] = useState([])
    const [AvailUsers, SetAvailableUSers] = useState([])
    const [ShowSelected, ShowSelectedUser] = useState(false)
    const [selectedReceipents, SetselectedReceipents] = useState([])
    const [selectedReceipentsids, SetselectedReceipentsids] = useState([])

    const { groupName, ParticipentsIDS } = route.params;

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
            console.log("ALLUSERSSSSSSS", AllUsers)
            var temp = [...AllUsers];
            for (var i = 0; i < temp.length; i++) {
                for (var x = 0; x < ParticipentsIDS.length; x++) {
                    if (temp[i].id === ParticipentsIDS[x]) {
                        console.log("MAtched", temp[i])
                        temp.splice(i, 1)
                    }
                }
                console.log("TEMP ***", temp)
            }
            SetAvailableUSers(temp)
        }).then(() => {
            setloading(false)

        })
    }

    function AddReciepents(username, userid) {

        ShowSelectedUser(true)
        if (selectedReceipentsids.includes(userid)) {
            console.log("FIND")
        } else {
            SetselectedReceipents(oldArray => [...oldArray, { uid: userid, name: username }]);
            SetselectedReceipentsids(oldArray => [...oldArray, userid]);
            console.log("selectedReceipents===>", selectedReceipents)
            console.log("selectedReceipentsids===>", selectedReceipentsids)
        }

    }

    function RemoveReceipent(username, userid, index) {
        var temp = [...selectedReceipents];
        var temp2 = [...selectedReceipentsids];

        if (temp[index].name === username && temp[index].uid === userid) {
            temp.splice(index, 1)
            SetselectedReceipents(temp)
        }
        for (var i = 0; i < temp2.length; i++) {
            if (temp2[i] === userid) {
                temp2.splice(i, 1)
                SetselectedReceipentsids(temp2)
            }
        }
    }

    function AddingMember() {
        var UserId = fire.auth().currentUser.uid;
        firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").set({
            PartcipentsList: [...ParticipentsIDS, ...selectedReceipentsids]
        })

        for (var i = 0; i < selectedReceipentsids.length; i++) {

            firestore.collection("users").doc(selectedReceipentsids[i]).collection("Groups").doc(groupName).set({
                GroupName: groupName,
                Creater_Uid: UserId,
                Creater_Name: fire.auth().currentUser.displayName,
                Create_Date: new Date().toUTCString(),
            })
        }

        for (var i = 0; i < selectedReceipentsids.length; i++) {
            firestore.collection("users").doc(selectedReceipentsids[i]).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").set({
                PartcipentsList: selectedReceipentsids
            })
        }
        navigation.navigate("GroupChat", {
            groupName: groupName
        })
    }

    return (
        <View style={{ flex: 1 }}>

            {selectedReceipents.length ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", width: '100%', flex: 1, padding: 10, height: 150 }}>
                    {selectedReceipents.map((data, index) => {
                        return <TouchableOpacity key={index}>
                            <View style={{ flexDirection: "column", justifyContent: "flex-start", margin: 5, alignItems: "center", width: 80 }}>
                                <View style={{ width: 62, height: 62 }}>
                                    <Image style={{ borderRadius: 100, backgroundColor: 'black', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                                    <Entypo name="circle-with-cross" size={25} style={{ position: "absolute", bottom: 4, right: 7, backgroundColor: "white", borderRadius: 20 }} onPress={() => RemoveReceipent(data.name, data.uid, index)} />
                                </View>
                                <Text style={{ fontSize: 14, marginLeft: -7, fontWeight: "bold" }}>{data.name}</Text>
                            </View>
                        </TouchableOpacity>
                    })}
                </View>
            </ScrollView> : null}

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, width: '100%', padding: 18 }}>
                    {/* <Text>{"\n"}</Text> */}
                    <FlatList
                        data={AvailUsers}
                        keyExtractor={(item, index) => "key" + index}
                        renderItem={({ item }) => {
                            console.log("FLAAAAAAAAAATIST ==>", item)
                            return (
                                <TouchableOpacity onPress={() => AddReciepents(item.Name, item.id)}>
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
            {selectedReceipents.length ? <TouchableOpacity onPress={() => AddingMember()} style={{ height: 70, width: 70, backgroundColor: "black", position: "absolute", bottom: 45, right: 30, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
                <AntDesign name="check" size={20} color="white" />
            </TouchableOpacity> : null}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
