import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    list: {

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

  export default styles;