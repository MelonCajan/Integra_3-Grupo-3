import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TimePickerAndroid, StatusBar, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons'; // Asegúrate de instalar 'expo-vector-icons'

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
  const [appointments, setAppointments] = useState([]);
  const advisors = ["Juan", "Maria", "Carlos", "Ana", "Pedro"]; // Nombres ficticios de asesores

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

  const saveAppointment = () => {
    if (selectedTime) {
      const newAppointment = { time: selectedTime, advisor: advisors[Math.floor(Math.random() * advisors.length)] };
      setAppointments([...appointments, newAppointment]);
      setSelectedTime(null);
    }
  };

  const deleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.selectTimeText}>Seleccionar Hora de Atención</Text>
      </TouchableOpacity>

      {selectedTime && (
        <View>
          <Text style={styles.selectedTimeText}>Hora seleccionada: {selectedTime}</Text>
          <TouchableOpacity onPress={saveAppointment}>
            <Text style={styles.saveTimeText}>Guardar Hora</Text>
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

      <FlatList
        style={{ marginTop: 20 }}
        data={appointments}
        renderItem={({ item, index }) => (
          <View style={styles.appointmentItem}>
            <Text>{item.time} - Asesor: {item.advisor}</Text>
            <TouchableOpacity onPress={() => deleteAppointment(index)}>
              <Text style={styles.deleteAppointmentText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function ChatbotScreen({ navigation }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const navigateTo = (screen) => {
    toggleOptions();
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soy el Chatbot</Text>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleOptions}>
        <Text>Opciones</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => navigateTo('Login')}>
            <Text style={styles.option}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Logout')}>
            <Text style={styles.option}>Cerrar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Forum')}>
            <Text style={styles.option}>Foro de Discusiones</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
    </View>
  );
}

function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cerrar Sesión</Text>
    </View>
  );
}

function ForumScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foro de Discusiones</Text>
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
        <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ title: 'Chatbot' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Logout" component={LogoutScreen} options={{ title: 'Cerrar Sesión' }} />
        <Stack.Screen name="Forum" component={ForumScreen} options={{ title: 'Foro de Discusiones' }} />
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
  saveTimeText: {
    fontSize: 16,
    color: 'green',
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
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteAppointmentText: {
    color: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  toggleButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    fontSize: 18,
    marginBottom: 10,
    color: 'blue',
  },
});
