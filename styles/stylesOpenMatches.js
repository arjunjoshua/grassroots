import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    
    matchContainer: {
      backgroundColor: '#1fff1',
      flexDirection: 'column',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 6,
      flexWrap: 'wrap',
      //justifyContent: 'space-between',
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      height : 150,
      width : 350,
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  
    picker: {
      height: 50,
      width: 150,
    },
  
    noMatchesText: {
      fontSize: 18,
      marginTop: 20,
      textAlign: 'center',
    },
  
    pickerContainer: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      marginTop: 16,
      borederRadius: 5,
      overflow: 'hidden',
      justifyContent: 'center',
    },

    itemText: {
      flex: 1,
      marginHorizontal: 5,
    },

    button: {
      alignItems: 'center',  
      justifyContent: 'center',  
      height: 40,
      marginTop: 10,
    },

    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  });