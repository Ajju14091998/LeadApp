// components/AddModal.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

export default function AddModal({ visible, onClose }) {
  const navigation = useNavigation();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Main Rounded Box */}
              <View style={styles.box}>
                {/* Options */}
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onClose();
                    navigation.navigate("Lead");
                  }}
                >
                  <Icon name="filter" size={18} color="#000" />
                  <Text style={styles.optionText}>Lead</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onClose();
                    navigation.navigate("Task");
                  }}
                >
                  <Icon name="settings" size={18} color="#000" />
                  <Text style={styles.optionText}>Task</Text>
                </TouchableOpacity>
              </View>

              {/* Triangle Pointer */}
              <View style={styles.pointer} />

              {/* X Button */}
              <TouchableOpacity style={styles.close} onPress={onClose}>
                <View style={styles.closeCircle}>
                  <Icon name="x" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

