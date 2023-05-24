import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import firebase from 'firebase/compat/app';
import * as Linking from 'expo-linking';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFileURL } from '../../utils/auth';
import styles from "./styles.js"

function DocumentList(docs) {    
    
    async function openFile(item) {
        const uri = await getFileURL(item.path);
        Linking.openURL(uri);
    }

    console.log("Documents" + JSON.stringify(documents))

    return (
        <FlatList style={styles.list}
        data={documents}
        renderItem={({ item }) => (
            <Pressable 
             onPress={() => (openFile(item))}            
             style={({pressed}) => [
                {backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'},
                styles.pressableDocument,
             ]}    
            >

                <Image
                 style={styles.icon}
                 source={require('../../icons/pdf.png')}            
                />
                <Text style={styles.documentTitle}>{item.key}</Text>
            
            </Pressable>          
        )}
        ItemSeparatorComponent={() => <View
            style={{
              backgroundColor: 'grey',
              height: 0.5,
            }}
          />}
        />
    );
}

function HomeScreen() {
    [loading, setLoading] = useState(true);
    [documents, setDocuments] = useState([]);

    useEffect(() => {

        const unsubsribe = 
            firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection("docs")
            .onSnapshot(querySnapshot => {

            const newDocs = []
            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.id)
                console.log(documentSnapshot.data().creator)
                newDocs.push({
                    key: documentSnapshot.id,
                    path: documentSnapshot.data().path,
                })
            });

            setDocuments(newDocs);
            setLoading(false);
            });

            return () => unsubsribe();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return DocumentList(documents);
}

function Table() {
    [loading, setLoading] = useState(true);
    [documents, setDocuments] = useState([]);

    useEffect(() => {

        const unsubsribe = 
            firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection("table")
            .onSnapshot(querySnapshot => {

            const newDocs = []
            querySnapshot.forEach(documentSnapshot => {
                console.log(documentSnapshot.id)
                console.log(documentSnapshot.data().creator)
                newDocs.push({
                    key: documentSnapshot.id,
                    path: documentSnapshot.data().path,
                })
            });

            setDocuments(newDocs);
            setLoading(false);
            });

            return () => unsubsribe();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return DocumentList(documents);
}


const Drawer = createDrawerNavigator();

export default function Home() {
    return (
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Table" component={Table} />
            </Drawer.Navigator>
    )
}

  