import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
  const genericTime = new Date();
  genericTime.setHours(0, 0, 0, 0); // Hora genérica a las 00:00:00
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(genericTime);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const advisors = [
    {
      name: "Advisor CJP",
      location: "CJP",
      schedule: "9:00 AM - 5:00 PM",
    },
    {
      name: "Advisor CSF",
      location: "CSF",
      schedule: "10:00 AM - 6:00 PM",
    },
  ];

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, time) => {
    if (time !== undefined) {
      // Mantener la fecha seleccionada, pero actualizar la hora
      const newSelectedTime = new Date(selectedDate);
      newSelectedTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
      setSelectedTime(newSelectedTime);
    }
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerBox}>
        <Text>Selecciona la fecha</Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        {selectedDate.getTime() !== today.getTime() && (
          <Text style={styles.selectedDateTime}>
            Fecha seleccionada: {selectedDate.toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.pickerBox}>
        <Text>Selecciona la hora</Text>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
        {selectedTime.getTime() !== genericTime.getTime() && (
          <Text style={styles.selectedDateTime}>
            Hora seleccionada: {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.advisorPicker}>
        <Text>Selecciona un asesor</Text>
        <View style={styles.advisorButtons}>
          {advisors.map((advisor, index) => (
            <Button
              key={index}
              title={advisor.name}
              onPress={() => setSelectedAdvisor(advisor)}
            />
          ))}
        </View>
        {selectedAdvisor && (
          <Text style={styles.selectedDateTime}>
            Asesor seleccionado: {selectedAdvisor.name}
            {"\n"}Ubicación: {selectedAdvisor.location}
            {"\n"}Horario: {selectedAdvisor.schedule}
          </Text>
        )}
      </View>

      <Button
        title="Enviar"
        onPress={() => {
          // Acciones con las fechas, horas y asesor seleccionados
          if (selectedAdvisor) {
            console.log("Fecha:", selectedDate.toLocaleDateString());
            console.log("Hora:", selectedTime.toLocaleTimeString());
            console.log("Asesor:", selectedAdvisor.name);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
  selectedDateTime: {
    marginTop: 10,
    fontSize: 16,
  },
  advisorPicker: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
  advisorButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
