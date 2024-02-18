import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { firebase } from "../config";


const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate("Dashboard");
        } catch (error) {
            alert(error.message);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={{
                fontWeight: "bold",
                fontSize: 26,
            }}>Login</Text>
            <View
                style={{
                    marginTop: 40,
                }}
            >
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
                onPress={() => loginUser(email, password)}>
                <Text style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold",
                }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Register") }>
                <Text style={{
                    marginTop: 20,
                    fontSize: 16,
                    fontWeight: "bold",
                }}>Don't have an account? Register Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

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
});
