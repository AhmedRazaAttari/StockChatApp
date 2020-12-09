import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import * as Font from 'expo-font';
import fire, { firestore } from "../database/firebase";

// import { TextInput } from 'react-native-gesture-handler';


var itm = [];
export default class CreateMsg extends React.Component {

    constructor() {
        super();

        this.state = {
            FirebaseUsers: [],
            isloading: true,
        }

    }

    static navigationOptions = ({ navigation }) => {

        return {
            title: "New Message",
            headerLeft: <TouchableOpacity onPress={navigation.getParam("back")} style={{ marginLeft: 7 }}>
                <MaterialCommunityIcons name="keyboard-backspace" size={35} color="blue" />
            </TouchableOpacity>,
            headerStyle: {
                elevation: 0,
                marginHorizontal: 5,
                marginVertical: 10,
            },
            headerTitleStyle: { fontSize: 20, marginLeft: 10 },
        }
    }

    back = () => {
        this.props.navigation.push("Chat");
    }

    // circleRef = React.createRef();


    componentDidMount() {
        var items = []
        var _ = this;
        firestore.collection("users").get().then((snapshot) => {
            console.log("FIRST snapshot ===> ", snapshot)
            snapshot.forEach((anotherSnapshot) => {
                console.log("SECOND Snapshot ===>", anotherSnapshot.data().Name)

                items.push({
                    id: anotherSnapshot.data().id,
                    Name: anotherSnapshot.data().Name,
                    email: anotherSnapshot.data().email
                })
            })
        }).then(() => {
            itm = items
            console.log("ITM ====>", itm)
            _.setState({
                isloading: false
            })
        })

    }


    MapFunc() {
        return itm.map((data, index) => {
            console.log("USERDATA ===>", data)
            if (data.id === fire.auth().currentUser.uid) {
                console.log("Current user profile")
            }
            else {
                return <TouchableOpacity onPress={() => { console.log(data.id, data.Name); this.props.navigation.navigate("ChatRoom", { name: data.Name, uid: data.id }) }} key={index}>
                    <View style={{ flexDirection: "column" }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", height: 60, marginBottom: 10 }}>
                            <Image style={{ borderRadius: 100, backgroundColor: 'black', width: 50, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" }} />
                            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{data.Name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            }
        })
    }

    Logout() {
        fire.auth().signOut().then(function () {
            // Sign-out successful.
            this.props.navigation.push("Login")
        }).catch(function (error) {
            // An error happened.
        });
    }


    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, width: '100%', padding: 18 }}>
                    <Text>{"\n"}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 22, marginBottom: 15, fontWeight: "bold" }}>Select Receipent</Text>
                        <TouchableOpacity onPress={() => this.Logout()}>
                            <Feather name="search" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    {!this.state.isloading && this.MapFunc()}
                </View>
            </ScrollView>
        )
    }
}
