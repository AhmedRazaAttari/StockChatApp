import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, ScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';
import { GiftedChat } from 'react-native-gifted-chat';
import fire, { firestore } from "../../database/firebase";
import * as ImagePicker from 'expo-image-picker';

const screen = Dimensions.get('window');
var itm = [];

export default function GroupChat({ route, navigation }) {

    const [messages, setMessages] = useState([])
    const [ParticipentsIDS, setParticipentsID] = useState([])
    const [image, setImage] = useState(null);
    const [isloading, setLoading] = useState(true)

    const { groupName } = route.params;

    useEffect(() => {
        isloading && Fetched()
    })

    function Fetched() {
        var UserId = fire.auth().currentUser.uid;
        var data = [];
        firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Participents").doc("IDsofParticipants").get().then(function (snapshot) {
            console.log("PARTICIPENTS FROM GROUP CHAT", snapshot.data().PartcipentsList)
            for (var i = 0; i < snapshot.data().PartcipentsList.length; i++) {
                if (snapshot.data().PartcipentsList[i] === fire.auth().currentUser.uid) {
                    console.log("CURRENT USER IN PARTICIPENTS", snapshot.data().PartcipentsList[i])
                }
                else {
                    data.push(snapshot.data().PartcipentsList[i])
                }
            }

        }).then(() => {
            setParticipentsID(data)
        })

        firestore.collection('users')
            .doc(UserId).collection("Groups").doc(groupName).collection("Messages")
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()
                    // console.log("FIREBBBBBBASEDATTTTA", firebaseData)
                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }
                    // console.log("DDDDDDDDDAAAAAAAAAAATTTTTTTTTTA", data)
                    return data
                })

                setMessages(messages)
                setLoading(false)
            })

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            uploadImage(result.uri)
        }
    };

    const uploadImage = async (uri) => {
        // var _ = this;
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = fire.storage().ref("images").child(new Date().toDateString());
        ref.put(blob)

            .then((result) => {
                result.ref.getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        const message = [{
                            _id: new Date().toUTCString(), image: url, createdAt: new Date(), user: {
                                _id: 1,
                                name: 'React Native',
                                avatar: 'https://placeimg.com/140/140/any',
                            }
                        }]
                        var UserId = fire.auth().currentUser.uid;
                        var ref = firestore.collection("users").doc();
                        var newPostKey = ref.id
                        for (var i = 0; i < message.length; i++) {
                            if (message[i].image) {
                                console.log("true")

                                firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Messages").doc(newPostKey).set({
                                    _id: message[i]._id,
                                    createdAt: message[i].createdAt.toUTCString(),
                                    image: message[i].image,
                                    user: {
                                        _id: 1,
                                    }
                                })


                                for (var x = 0; x < ParticipentsIDS.length; x++) {
                                    console.log("PARTICIPENTS FROM ONSEND FUNC", ParticipentsIDS[x])
                                    firestore.collection("users").doc(ParticipentsIDS[x]).collection("Groups").doc(groupName).collection("Messages").doc(newPostKey).set({
                                        _id: message[i]._id,
                                        createdAt: message[i].createdAt.toUTCString(),
                                        image: message[i].image,
                                        user: {
                                            _id: 2,
                                            // avatar: fire.auth().currentUser.photoURL,
                                        }
                                    })
                                }

                            }
                            else {
                                console.log("false")
                            }

                        }

                        setMessages(GiftedChat.append(messages, message))
                    })

            })
    }

    function onSend(newMessage = []) {

        var UserId = fire.auth().currentUser.uid;


        var ref = firestore.collection("users").doc();
        var newPostKey = ref.id
        for (var i = 0; i < newMessage.length; i++) {

            firestore.collection("users").doc(UserId).collection("Groups").doc(groupName).collection("Messages").doc(newPostKey).set({
                _id: newMessage[i]._id,
                createdAt: newMessage[i].createdAt.toUTCString(),
                text: newMessage[i].text,
                user: {
                    _id: 1,
                }
            })


            for (var x = 0; x < ParticipentsIDS.length; x++) {
                console.log("PARTICIPENTS FROM ONSEND FUNC", ParticipentsIDS[x])

                firestore.collection("users").doc(ParticipentsIDS[x]).collection("Groups").doc(groupName).collection("Messages").doc(newPostKey).set({
                    _id: newMessage[i]._id,
                    createdAt: newMessage[i].createdAt.toUTCString(),
                    text: newMessage[i].text,
                    user: {
                        _id: 2,
                        // avatar: firebase.auth().currentUser.photoURL,
                        name: fire.auth().currentUser.displayName
                    }
                })
            }

        }
        setMessages(GiftedChat.append(messages, newMessage))
    }



    function CustomView() {
        return <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <TouchableOpacity>
                <Ionicons name="ios-camera" size={30} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage()}>
                <Ionicons name="md-images" size={29} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity>
                <EvilIcons name="location" size={29} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity >
                <FontAwesome name="microphone" size={24} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo name="emoji-happy" size={22} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="like1" size={26} color="#3e7af0" />
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", height: 80, width: "100%", backgroundColor: "white", alignItems: "center", justifyContent: "space-around" }}>
                <TouchableOpacity
                    // style={{ position: "absolute", top: 50, left: 20 }}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <AntDesign name="left" size={30} color="black" style={{ marginTop: 20 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 20 }}>{groupName}</Text>
                <Entypo name="info" size={24} color="black" style={{ marginTop: 20 }} onPress={() => navigation.navigate("GroupInfo", { groupName: groupName })} />
            </View>
            {/* <View style={{ flexDirection: "row", height: 85, width: "100%", backgroundColor: "white" }}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 50, left: 20 }}
                    onPress={() => navigation.navigate("Chat")}
                >
                    <AntDesign name="left" size={30} color="black" />
                </TouchableOpacity>
                <Text style={{ marginLeft: 20 }}>{groupName}</Text>
            </View> */}
            <KeyboardAvoidingView style={styles.container} >
                <GiftedChat
                    isAnimated={true}
                    renderAccessory={CustomView}
                    // renderSend={this.SendBtn}
                    messages={messages}
                    onSend={newMessages => onSend(newMessages)}
                    user={{
                        _id: 1,
                    }}
                />
            </KeyboardAvoidingView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: 80,
    },
    ImageStyle: {
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
});