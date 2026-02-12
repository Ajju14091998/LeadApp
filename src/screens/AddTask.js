import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddTask = ({ navigation }) => {
  const [dateField, setDateField] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedField, setSelectedField] = useState('');

  const dropdownOptions = ['Option 1', 'Option 2', 'Option 3'];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateField(formattedDate);
    }
  };

  const renderInput = (placeholder, isDropdown = false, isDate = false) => {
    return (
      <View style={styles.inputContainer}>
        {isDropdown ? (
          <ModalDropdown
            options={dropdownOptions}
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownBox}
            defaultValue={placeholder}
            onSelect={(index, value) => setSelectedField(value)}
          />
        ) : isDate ? (
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(placeholder)}
          >
            <Text style={styles.dateText}>
              {typeof showDatePicker === 'string' &&
              showDatePicker === placeholder &&
              dateField
                ? dateField
                : placeholder}
            </Text>
            <Icon name="calendar" size={18} color="#999" />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#999"
          />
        )}
        {isDate && showDatePicker === placeholder && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={22} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Task</Text>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            {renderInput('Title')}
            {renderInput('Type', true)}
            {renderInput('Task Assign to', true)}
            {renderInput('Client', true)}
            {renderInput('Due Date', false, true)}
            {renderInput('Priority', true)}
            {renderInput('Service Request')}
            {renderInput('Start Date', false, true)}
            {renderInput('Reminder Date', false, true)}

            {/* Add Button (Optional - based on your flow) */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({

    safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#000',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  dropdown: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  dropdownBox: {
    width: '80%',
    marginTop: 5,
    borderRadius: 6,
  },
  dateInput: {
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  button: {
    backgroundColor: '#2F285F',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
