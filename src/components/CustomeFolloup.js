import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalDropdown from 'react-native-modal-dropdown';


export default function CustomeFollowup({
  navigation,
  history = [],
  statusOptions = [],
  assignOptions = [],
  onSubmit,
}) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [attachment, setAttachment] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [remark, setRemark] = useState('');

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0];
      setMeetingDate(formatted);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setScheduleTime(`${hours}:${minutes}`);
    }
  };

  const handleAttachmentPress = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setAttachment(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error('Attachment Error:', err);
      }
    }
  };

  const validateAndSubmit = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!status) newErrors.status = 'Status is required';
    if (!assignTo) newErrors.assignTo = 'Assign To is required';
    if (!attachment) newErrors.attachment = 'Attachment is required';
    if (!meetingDate) newErrors.meetingDate = 'Date is required';
    if (!scheduleTime) newErrors.scheduleTime = 'Time is required';
    if (!remark) newErrors.remark = 'Remark is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0 && onSubmit) {
      onSubmit({
        title,
        status,
        assignTo,
        attachment,
        meetingDate,
        scheduleTime,
        remark,
      });
    }
  };

  const renderDropdown = (label, value, setValue, options, errorKey) => (
    <View style={{ marginBottom: 16 }}>
      {value ? <Text style={styles.floatingLabel}>{label}</Text> : null}
      <View style={styles.inputRow}>
        <ModalDropdown
          options={options}
          defaultValue={value || label}
          onSelect={(index, option) => setValue(option)}
          textStyle={styles.dropdownText}
          dropdownTextStyle={styles.dropdownItemText}
          dropdownStyle={styles.dropdownStyle}
          style={{ flex: 1 }}
        />
        <Feather name="chevron-down" size={18} color="#999" />
      </View>
      {errors[errorKey] && (
        <Text style={styles.errorText}>{errors[errorKey]}</Text>
      )}
    </View>
  );

  const renderInput = ({
    label,
    value,
    onChangeText,
    iconName,
    onIconPress,
    isDate = false,
    isMultiline = false,
    errorKey,
  }) => (
    <View style={{ marginBottom: 16 }}>
      {value ? <Text style={styles.floatingLabel}>{label}</Text> : null}
      <View
        style={[
          styles.inputRow,
          isMultiline && {
            height: 100,
            alignItems: 'flex-start',
            paddingTop: 10,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            isMultiline && { height: '100%', textAlignVertical: 'top' },
          ]}
          placeholder={!value ? (label === 'Attachment' ? 'Choose Attachment' : label) : ''}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          editable={!isDate}
          multiline={isMultiline}
        />
        {iconName && (
          <TouchableOpacity onPress={onIconPress}>
            <Feather name={iconName} size={18} color="#999" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>
      {errors[errorKey] && (
        <Text style={styles.errorText}>{errors[errorKey]}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {renderInput({
          label: 'Title',
          value: title,
          onChangeText: setTitle,
          errorKey: 'title',
        })}
        {renderDropdown('Status', status, setStatus, statusOptions, 'status')}
        {renderDropdown('Assign To', assignTo, setAssignTo, assignOptions, 'assignTo')}
        {renderInput({
          label: 'Attachment',
          value: attachment,
          onChangeText: setAttachment,
          iconName: 'paperclip',
          onIconPress: handleAttachmentPress,
          isDate: true,
          errorKey: 'attachment',
        })}
        {renderInput({
          label: 'Next Meeting Date',
          value: meetingDate,
          onChangeText: setMeetingDate,
          iconName: 'calendar',
          onIconPress: () => setShowDatePicker(true),
          isDate: true,
          errorKey: 'meetingDate',
        })}
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="default"
            value={meetingDate ? new Date(meetingDate) : new Date()}
            onChange={handleDateChange}
          />
        )}
        {renderInput({
          label: 'Schedule Time',
          value: scheduleTime,
          onChangeText: setScheduleTime,
          iconName: 'clock',
          onIconPress: () => setShowTimePicker(true),
          isDate: true,
          errorKey: 'scheduleTime',
        })}
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            display="default"
            value={new Date()}
            onChange={handleTimeChange}
          />
        )}
        {renderInput({
          label: 'Remark',
          value: remark,
          onChangeText: setRemark,
          isMultiline: true,
          errorKey: 'remark',
        })}
        <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {history.length > 0 && (
          <>
            <Text style={styles.historyTitle}>History</Text>
            {history.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineHeading}>{item.heading}</Text>
                  <View
                    style={[
                      styles.statusTag,
                      item.statusColor ? { backgroundColor: item.statusColor } : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusTagText,
                        item.statusTextColor ? { color: item.statusTextColor } : null,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <Text style={styles.personName}>{item.person}</Text>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.timelineDescription}>{item.description}</Text>
                  <View style={styles.attachmentRow}>
                    <Feather name="file" size={14} color="#8E8E93" style={{ marginRight: 6 }} />
                    <Text style={styles.attachmentText}>{item.attachment}</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#2B2162',
    zIndex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
  },
  submitButton: {
    height: 55,
    backgroundColor: '#2B2162',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  dropdownText: {
    fontSize: 15,
    color: '#000',
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 14,
    padding: 10,
  },
  dropdownStyle: {
    width: '88%',
    marginLeft: 0,
    height: 150,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2B2162',
    marginTop: 6,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    padding: 12,
  },
  timelineHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  statusTag: {
    backgroundColor: '#E3E0F7',
    borderRadius: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
  },
  statusTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2B2162',
  },
  personName: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachmentText: {
    fontSize: 14,
    color: '#2B2162',
  },
});
