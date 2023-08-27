import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TimePickerAndroid, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Appointment')}>
        <Text style={styles.selectTimeText}>Seleccionar Hora de Atención</Text>
      </TouchableOpacity>
    </View>
  );
}

function AppointmentScreen() {
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: true,
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        setSelectedTime(formattedTime);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  const deleteTime = () => {
    setSelectedTime(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectTimeText}>Seleccionar Hora de Atención</Text>
      </TouchableOpacity>

      {selectedTime && (
        <View>
          <Text style={styles.selectedTimeText}>Hora seleccionada: {selectedTime}</Text>
          <TouchableOpacity onPress={deleteTime}>
            <Text style={styles.deleteTimeText}>Eliminar Hora</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openTimePicker}>
            <Text style={styles.modifyTimeText}>Modificar Hora</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={openTimePicker}>
              <Text style={styles.selectTimeText}>Seleccionar Hora</Text>
            </TouchableOpacity>

            {selectedTime && (
              <Text style={styles.selectedTimeText}>Hora seleccionada: {selectedTime}</Text>
            )}

            <TouchableOpacity
              style={{ ...styles.closeButton, backgroundColor: '#2196F3' }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: 'Hora de Atención' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  selectTimeText: {
    fontSize: 16,
    color: '#2196F3',
  },
  selectedTimeText: {
    fontSize: 18,
    marginTop: 20,
  },
  deleteTimeText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  modifyTimeText: {
    fontSize: 16,
    color: '#2196F3',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

