import React, { useState } from 'react';
import {Text,TextInput, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const handleInputChange = (text) => {
        setInputValue(text);
      };
    const handleInputChange2 = (text) => {
        setInputValue2(text);
      };

    const handleButtonPress = () => {
        // Función que se ejecuta cuando se presiona el botón personalizado
        console.log('¡Botón personalizado presionado!');
      };

    return (
        <View style={styles.container}>

            <View style={styles.viewImage}><Image source={require('../images/logouct_blanco.png')} style={styles.image}/></View>

            <View style={styles.inputs}>
            <TextInput
                style={styles.input}
                placeholder='Ingrese su correo electronico'
                value={inputValue}
                onChangeText={handleInputChange}
            /></View>
            <View style={styles.inputs}>
            <TextInput
                style={styles.input}
                placeholder='Ingese su clave'
                secureTextEntry={true}
                value={inputValue2}
                onChangeText={handleInputChange2}
            /></View>
            <View style={styles.container2}>
                <TouchableOpacity onPress={handleButtonPress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar sesion</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Main;