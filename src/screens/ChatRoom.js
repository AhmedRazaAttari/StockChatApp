import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Button, ScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { ImagePicker } from 'expo';
// import { Camera } from 'expo-camera';
import { GiftedChat } from 'react-native-gifted-chat';
import fire, { firestore } from "../database/firebase";


const screen = Dimensions.get('window');
var itm = [];

export default function ChatRoom({ route, navigation }) {

    // const [messages, updateMsgs] = useState({});

    // const [messages, setMessages] = useState([{}])

    const [messages, setMessages] = useState([])

    const [isloading, setLoading] = useState(true)

    const { name, uid } = route.params;
    // console.log("RRRRRRRRRRROUTE  PARRAMs", uid)


    useEffect(() => {
        var UserId = fire.auth().currentUser.uid;

        const unsubscribeListener = firestore
            .collection('users')
            .doc(UserId)
            .collection('ChatHeads')
            .doc(uid)
            .collection("ChatMsgs")
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const messages = querySnapshot.docs.map(doc => {
                    const firebaseData = doc.data()

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...firebaseData
                    }

                    return data
                })

                setMessages(messages)
            })

        return () => unsubscribeListener()
    }, [])

    function onSend(newMessage = []) {

        var UserId = fire.auth().currentUser.uid;

        firestore.collection("users").doc(UserId).collection("ChatHeads").doc(uid).set({
            name: name,
            uid: uid,
        })

        firestore.collection("users").doc(uid).collection("ChatHeads").doc(UserId).set({
            name: fire.auth().currentUser.displayName,
            uid: UserId,
        })


        var ref = firestore.collection("users").doc();
        var newPostKey = ref.id
        for (var i = 0; i < newMessage.length; i++) {

            firestore.collection("users").doc(UserId).collection("ChatHeads").doc(uid).collection("ChatMsgs").doc(newPostKey).set({
                _id: newMessage[i]._id,
                createdAt: newMessage[i].createdAt.toUTCString(),
                text: newMessage[i].text,
                user: {
                    _id: 1,
                }
            })

            firestore.collection("users").doc(uid).collection("ChatHeads").doc(UserId).collection("ChatMsgs").doc(newPostKey).set({
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
        setMessages(GiftedChat.append(messages, newMessage))
        // setMessages(prevMessages => [...newMessages, ...prevMessages])
    }

    function CustomView() {
        return <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <TouchableOpacity>
                <Ionicons name="ios-camera" size={30} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImage}>
                <Ionicons name="md-images" size={29} color="#3e7af0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._showModal}>
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


// export default class ChatComp extends React.Component {

//     constructor() {
//         super();

//         this.state = {
//             // marker_lat: LATITUDE,
//             // marker_long: LONGITUDE,
//             hasCameraPermission: null,
//             // type: Camera.Constants.Type.back,
//             image: null,
//             message: "",
//             isFocus: false,
//             isVisible: true,
//             messages: [],
//             // isModalVisible: false,
//             // backColor: "",
//             id: new Date().toDateString(),
//             isloading: false,
//             // coordinate: new AnimatedRegion({
//             //     latitude: LATITUDE,
//             //     longitude: LONGITUDE,
//             // }),
//         }
//     }


//     componentDidMount() {
//         // var UserId = fire.auth().currentUser.uid;
//         // // console.log("PARAMS ====>", this.props.navigation.state.params.uid)
//         // var uid = this.props.navigation;
//         // var _ = this;

//         // firestore.collection("users").doc(UserId).collection("ChatHeads").doc(uid).collection("ChatMsgs").get().then(function (snapshot) {

//         //     snapshot.forEach(function (childSnapshot) {
//         //         console.log("snapshot", childSnapshot._data)

//         //         _.setState(previousState => ({
//         //             messages: GiftedChat.append(previousState.messages, childSnapshot._data),
//         //         }))
//         //     })
//         // })
//         // fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs").once("value").then(function (snapshot) {
//         //     // console.log(snapshot.val())
//         //     snapshot.forEach(function (childSnapshot) {
//         //         // console.log(childSnapshot.val().text)
//         //         _.setState(previousState => ({
//         //             messages: GiftedChat.append(previousState.messages, childSnapshot.val()),
//         //         }))
//         //     })
//         // })
//     }


//     // onSend(messages = []) {

//     //     var UserId = fire.auth().currentUser.uid;
//     //     var uid = this.props.navigation.state.params.uid;
//     //     var name = this.props.navigation.state.params.name;
//     //     console.log(uid)
//     //     console.log(name)

//     //     firestore.collection("users").doc(UserId).collection("ChatHeads").doc(uid).set({
//     //         name: name,
//     //         uid: uid,
//     //     })

//     //     firestore.collection("users").doc(uid).collection("ChatHeads").doc(UserId).set({
//     //         name: fire.auth().currentUser.displayName,
//     //         uid: UserId,
//     //     })


//     //     var ref = firebase.firestore().collection("users").doc();
//     //     var newPostKey = ref.id
//     //     for (var i = 0; i < messages.length; i++) {

//     //         var text = messages[i].text;
//     //         firestore.collection("users").doc(UserId).collection("ChatHeads").doc(uid).collection("ChatMsgs").doc(newPostKey).set({
//     //             _id: messages[i]._id,
//     //             createdAt: messages[i].createdAt.toUTCString(),
//     //             text: messages[i].text,
//     //             user: {
//     //                 _id: 1,
//     //             }
//     //         })

//     //         firestore.collection("users").doc(uid).collection("ChatHeads").doc(UserId).collection("ChatMsgs").doc(newPostKey).set({
//     //             _id: messages[i]._id,
//     //             createdAt: messages[i].createdAt.toUTCString(),
//     //             text: messages[i].text,
//     //             user: {
//     //                 _id: 2,
//     //                 // avatar: firebase.auth().currentUser.photoURL,
//     //                 name: firebase.auth().currentUser.displayName
//     //             }
//     //         })

//     //     }

//     //     this.setState(previousState => ({
//     //         messages: GiftedChat.append(previousState.messages, messages),
//     //     }))
//     // }

//     // _pickImage = async () => {

//     //     this.setState({ ImagePicker: true })
//     //     const { navigate } = this.props.navigation;
//     //     let result = await ImagePicker.launchImageLibraryAsync({
//     //         mediaTypes: ImagePicker.MediaTypeOptions.All,
//     //         // allowsEditing: true,
//     //         // aspect: [4, 3],
//     //     });

//     //     console.log(result);

//     //     if (!result.cancelled) {
//     //         this.uploadImage(result.uri);
//     //         // this.props.onSend({text: props.text})
//     //         this.setState({ image: result.uri, ImagePicker: false });
//     //         // navigate("ImagePreview", { checking: this.state.image })

//     //         // {
//     //         //     this.state.image && this.setState(previousState => ({
//     //         //         id: this.state.id + 1,
//     //         //         messages: GiftedChat.append(previousState.messages, {
//     //         //             _id: this.state.id, image: this.state.image, createdAt: new Date(), user: {
//     //         //                 _id: 1,
//     //         //                 name: 'React Native',
//     //         //                 avatar: 'https://placeimg.com/140/140/any',
//     //         //             },
//     //         //         }),
//     //         //     }))
//     //         // }
//     //     }
//     //     if (result.cancelled) {
//     //         this.setState({ ImagePicker: false })
//     //     }
//     // };


//     // uploadImage = async (uri) => {
//     //     // var _ = this;
//     //     const response = await fetch(uri);
//     //     const blob = await response.blob();
//     //     var ref = fire.storage().ref("images").child(new Date().toDateString());
//     //     ref.put(blob)
//     //         // ref.getDownloadURL()
//     //         // .then((url) => {
//     //         //     console.log(url);
//     //         // });
//     //         .then((result) => {
//     //             result.ref.getDownloadURL()
//     //                 .then((url) => {
//     //                     console.log(url);
//     //                     const messages = [{
//     //                         _id: new Date().toUTCString(), image: url, createdAt: new Date(), user: {
//     //                             _id: 1,
//     //                             name: 'React Native',
//     //                             avatar: 'https://placeimg.com/140/140/any',
//     //                         }
//     //                     }]
//     //                     var UserId = fire.auth().currentUser.uid;
//     //                     var uid = this.props.navigation.state.params.uid;
//     //                     var profilePic = this.props.navigation.state.params.profilePic;
//     //                     var name = this.props.navigation.state.params.name;

//     //                     console.log("currentUser id", UserId)
//     //                     console.log("ClickedUser id", uid)

//     //                     var newPostKey = fire.database().ref().child('posts').push().key;
//     //                     for (var i = 0; i < messages.length; i++) {
//     //                         if (messages[i].image) {
//     //                             console.log("true")

//     //                             fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid).update({
//     //                                 profilePic: profilePic,
//     //                                 name: name,
//     //                                 uid: uid,
//     //                             })

//     //                             fire.database().ref("users/" + uid).child("ChatHeads" + "/" + UserId).update({
//     //                                 profilePic: fire.auth().currentUser.photoURL,
//     //                                 name: fire.auth().currentUser.displayName,
//     //                                 uid: UserId,
//     //                             })

//     //                             fire.database().ref("users/" + UserId).child("ChatHeads" + "/" + uid + "/" + "ChatMsgs" + "/" + newPostKey).set({
//     //                                 _id: messages[i]._id,
//     //                                 createdAt: messages[i].createdAt.toUTCString(),
//     //                                 image: messages[i].image,
//     //                                 user: {
//     //                                     _id: 1,
//     //                                 }
//     //                             })

//     //                             fire.database().ref("users/" + uid).child("ChatHeads" + "/" + UserId + "/" + "ChatMsgs" + "/" + newPostKey).set({
//     //                                 _id: messages[i]._id,
//     //                                 createdAt: messages[i].createdAt.toUTCString(),
//     //                                 image: messages[i].image,
//     //                                 user: {
//     //                                     _id: 2,
//     //                                     avatar: fire.auth().currentUser.photoURL,
//     //                                 }
//     //                             })

//     //                         }
//     //                         else {
//     //                             console.log("false")
//     //                         }

//     //                     }

//     //                     this.setState(previousState => ({
//     //                         messages: GiftedChat.append(previousState.messages, messages),
//     //                     }))

//     //                 })
//     //             // console.log("result", result);
//     //             // console.log("result", result.downloadURL);
//     //             // console.log("result", result.ref.getDownloadURL());


//     //         })
//     // }

//     // CustomView = () => {
//     //     return <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
//     //         <TouchableOpacity onPress={() => this.props.navigation.push('Camera')}>
//     //             <Ionicons name="ios-camera" size={30} color="#3e7af0" />
//     //         </TouchableOpacity>
//     //         <TouchableOpacity onPress={this._pickImage}>
//     //             <Ionicons name="md-images" size={29} color="#3e7af0" />
//     //         </TouchableOpacity>
//     //         <TouchableOpacity onPress={this._showModal}>
//     //             <EvilIcons name="location" size={29} color="#3e7af0" />
//     //         </TouchableOpacity>
//     //         <TouchableOpacity onPressIn={() => this.setState({ IsRecording: true })} onPressOut={() => this.setState({ IsRecording: false })}>
//     //             <FontAwesome name="microphone" size={24} color="#3e7af0" />
//     //         </TouchableOpacity>
//     //         <TouchableOpacity>
//     //             <Entypo name="emoji-happy" size={22} color="#3e7af0" />
//     //         </TouchableOpacity>
//     //         <TouchableOpacity>
//     //             <AntDesign name="like1" size={26} color="#3e7af0" />
//     //         </TouchableOpacity>
//     //     </View>
//     // }



//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <KeyboardAvoidingView style={styles.container} >
//                     <GiftedChat
//                         isAnimated={true}
//                         renderAccessory={this.CustomView}
//                         // renderSend={this.SendBtn}
//                         messages={this.state.messages}
//                         onSend={messages => this.onSend(messages)}
//                         user={{
//                             _id: 1,
//                         }}
//                     />
//                     {/* {this.state.isModalVisible && this.renderModal()} */}
//                 </KeyboardAvoidingView>
//             </View>
//         );
//     }
// }

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