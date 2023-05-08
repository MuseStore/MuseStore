import { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image, Pressable } from 'react-native';
import firebase from 'firebase/compat/app';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';

import { getFileURL } from '../../utils/auth';


export default function HomeScreen() {
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]); 
    
    _getAllFilesInDirectory = async() => {
             let dir = await FileSystem.readDirectoryAsync(".");
          
             dir.forEach((val) => {
               console.log(val)
          });
          
          }
    async function download(path) {
        console.log(FileSystem.documentDirectory)
        const url = await getFileURL(path)

        
        const downloadResumable = FileSystem.createDownloadResumable(
            url,
            "file://" + path,
            {},
        );
        
        try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }
    }
    
    async function openFile(path) {
        const uri = await getFileURL(path);
        Linking.openURL(uri);
    }


    useEffect(() => {

        const unsubsribe = 
            
        

            firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection("docs")
            .onSnapshot(querySnapshot => {

            querySnapshot.forEach(documentSnapshot => {
                users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                });
            });

            setUsers(users);
            setLoading(false);
            });

            return () => unsubsribe();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <FlatList style={styles.list}
        data={users}
        renderItem={({ item }) => (
            <Pressable 
             onPress={() => (openFile(item.key))}            
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


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    list: {
      marginTop: 100,
    },

    icon: {
        width: "10%", 
        height: "70%",
        marginLeft: 20,
        resizeMode: "stretch",
    },
    
    documentTitle: {
        marginLeft: 10,
    },

    pressableDocument: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
    },
  });
  