import { Button, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  //aqui encontramos los estilos para diferentes cosas
    container: {
      flex: 1,
      backgroundColor: '#0085FF',
      alignItems: 'center',
      justifyContent: 'center',
    },

    container2: {
      //flex: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewImage:{
      padding:50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width: 198, 
      height: 70,
    },
    inputs: {
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{
      height: 50, 
      width: 200,
      borderColor: 'gray', 
      borderWidth: 2,
      backgroundColor: '#fff',
      textAlign: 'center',
      borderRadius: 10,
      fontWeight: 'bold',
    },

    button:{
      height: 50, 
      width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAB700',
      borderRadius: 20,
    },
    
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },

  });

  export default styles;