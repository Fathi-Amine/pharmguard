import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Touchable, TouchableOpacity, Linking, ScrollView} from "react-native";
import {firebase} from "../config";
import axios from 'axios';
import { Avatar, Button, Card} from 'react-native-paper';


const LeftContent = () => <Avatar.Image size={70} style={{ marginTop: 20 }} source={require('../assets/images/pharLogo.jpg')} />;

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const options = {
        method: 'GET',
        url: 'https://pharmacies-de-garde-nc.p.rapidapi.com/gardes',
        headers: {
            'X-RapidAPI-Key': '38bb0f6e0cmsh9909597bd7d7f88p1c43a5jsn1ed9e0b1586e',
            'X-RapidAPI-Host': 'pharmacies-de-garde-nc.p.rapidapi.com'
        }
    };

    const fetchPharmacies = async () => {
        axios.request(options)
            .then(res => {
                const pharmData = res.data;
                const uniqueData = Array.from(new Set(pharmData.map(item => item.nom))).map(nom => {
                    return pharmData.find(item => item.nom === nom);
                });
                setData(uniqueData)
            })
            .catch(error => {
                console.error('Error occurred:', error.message);
                alert('Error Failed to log in. Please try again later.');
            });
    };
    const handlePress = (url) => {
        Linking.openURL(url);
    };
    useEffect(() => {
        fetchPharmacies();
    }, []);
    return (
        // <SafeAreaView style={styles.container}>
        <>
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 26,
                }}
            >Hello </Text>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 30,
                }}
            >
                {Array.isArray(data) && data.filter(item => item.gmaps).map((item) => (
                    <TouchableOpacity style={{width:"100%"}} key={item.telephone} onPress={() => handlePress(item.gmaps)}>
                        <Card style={{ marginBottom: 10 }}>
                            <Card.Title
                                titleStyle={{ marginLeft: 20 }}
                                title={item.type}
                                subtitle={item.nom}
                                subtitleStyle={{ marginLeft: 40 }}
                                titleVariant="bodyLarge"
                                left={LeftContent}
                            />
                            <Text style={{ marginLeft: 113 }}>{item.telephone} </Text>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity
                onPress={() => firebase.auth().signOut()}
                style={styles.button}
            >
                <Text
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        fontSize: 16,
                        color: "blue",
                    }}
                >Sign Out</Text>
            </TouchableOpacity>
        {/*// </SafeAreaView>*/}
</>
    );
};

export default Dashboard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginTop:100,
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

// {user ? (
//     <>
//         <Text
//             style={{
//                 fontWeight: "bold",
//                 fontSize: 26,
//             }}
//         >Hello, {user.firstName} {user.lastName}</Text>
//         <TouchableOpacity
//             onPress={() => firebase.auth().signOut()}
//             style={styles.button}
//         >
//             <Text
//                 style={{
//                     marginTop: 20,
//                     fontSize: 16,
//                     color: "blue",
//                 }}
//             >Sign Out</Text>
//         </TouchableOpacity>
//     </>
// ) : (
//     <Text>Loading...</Text>
// )}