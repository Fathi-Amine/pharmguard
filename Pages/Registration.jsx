import React, {useState} from 'react';
import {View,Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import {firebase} from "../config";


const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const registerUser = async (email, password, firstName, lastName) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url:"https://pharmguard-5307d.firebaseapp.com",
                    }).then(() => {
                        alert("Verification email sent")
                    }).catch((error) => {
                        alert(error.message);
                    })
                        .then(() => {
                            firebase.firestore().collection('users')
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    email: email,
                                    firstName: firstName,
                                    lastName: lastName,
                                })
                        })
                }).catch((error) => {
                    alert(error.message);
                })
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 26,
                }}>Register Here!!
            </Text>
            <View
                style={{
                    marginTop: 40,
                }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                ></TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                ></TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                ></TextInput>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}>
                </TextInput>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => registerUser(email, password, firstName, lastName)}>
                <Text style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold",
                }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginTop:100,
    },
    textInput: {
        width:400,
        borderBottomWidth: 1,
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:"#026efd",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
    },
})