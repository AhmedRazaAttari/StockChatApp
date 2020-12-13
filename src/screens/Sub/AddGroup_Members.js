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
    const [AllUsers, SetUsers] = useState([])
    const [ShowSelected, ShowSelectedUser] = useState(false)
    const [selectedReceipents, SetselectedReceipents] = useState([])
    const [selectedReceipentsids, SetselectedReceipentsids] = useState([])

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

    function CreateGroup() {
        var UserId = fire.auth().currentUser.uid;

        firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).set({
            GroupName: groupName,
            Creater_Uid: UserId,
            Creater_Name: fire.auth().currentUser.displayName,
            Create_Date: new Date().toUTCString(),
            // Group_Icon: this.state.avatarSource
        }).then(() => {
            firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").set({
                PartcipentsList: selectedReceipentsids
            })

            for (var i = 0; i < selectedReceipentsids.length; i++) {

                // console.log("snapshot._data.PartcipentsList", snapshot.data().PartcipentsList[i])
                firestore.collection("users").doc(selectedReceipentsids[i]).collection("Groups").doc(groupName).set({
                    GroupName: groupName,
                    Creater_Uid: UserId,
                    Creater_Name: fire.auth().currentUser.displayName,
                    Create_Date: new Date().toUTCString(),
                    // Group_Icon: _.state.avatarSource
                })
            }

            for (var i = 0; i < selectedReceipentsids.length; i++) {
                firestore.collection("users").doc(selectedReceipentsids[i]).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").set({
                    PartcipentsList: selectedReceipentsids
                })
            }

        // })


        // firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").get().then(function (snapshot) {
        //     console.log("snapshot._data.PartcipentsList", snapshot.data().PartcipentsList)


        //     for (var i = 0; i < snapshot.data().PartcipentsList.length; i++) {

        //         console.log("snapshot._data.PartcipentsList", snapshot.data().PartcipentsList[i])
        //         firestore.collection("users").doc(snapshot.data().PartcipentsList[i].uid).collection("Groups").doc(groupName).set({
        //             GroupName: groupName,
        //             Creater_Uid: UserId,
        //             Creater_Name: fire.auth().currentUser.displayName,
        //             Create_Date: new Date().toUTCString(),
        //             // Group_Icon: _.state.avatarSource
        //         })
        //     }

        //     for (var i = 0; i < snapshot.data().PartcipentsList.length; i++) {
        //         firestore.collection("users").doc(snapshot.data().PartcipentsList[i].uid).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").set({
        //             PartcipentsList: selectedReceipentsids
        //         })
        //     }

        // })

    }).then(() => {
        navigation.navigate("GroupChat", {
            PartcipentsList: selectedReceipents,
            IDsofParticipants: selectedReceipentsids,
            groupName: groupName
        })
    })
}

return (
    <View style={{ flex: 1 }}>

        {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: "bold" }}>Select Receipent</Text>
                <TouchableOpacity>
                    <Feather name="search" size={30} color="black" />
                </TouchableOpacity>
            </View> */}
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
                    data={AllUsers}
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
        {selectedReceipents.length ? <TouchableOpacity onPress={() => CreateGroup()} style={{ height: 70, width: 70, backgroundColor: "black", position: "absolute", bottom: 45, right: 30, borderRadius: 100, justifyContent: "center", alignItems: "center" }}>
            <AntDesign name="arrowright" size={20} color="white" />
            {/* <Text style={{ color: "white", fontWeight: "bold" }}>Create</Text> */}
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
