// CustomeDetails.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function CustomeDetails({
  title,
  infoItems,
  services,
  history,
  onEdit,
  onDelete,
  onAddFollowUp,
  onAddService,
}) {
  const navigation = useNavigation();
  const [showAllServices, setShowAllServices] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const InfoItem = ({ icon, label, value, isStatus }) => (
    <View style={styles.infoRow}>
      <View style={styles.rowLeft}>
        <Icon
          name={icon}
          size={14}
          color="#8E8E93"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rowRight}>
        {isStatus ? (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{value}</Text>
          </View>
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Icon name="more-vertical" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        {showMenu && (
          <View style={styles.menuBox}>
            <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
              <Icon name="edit-2" size={16} color="#2B2162" style={{ marginRight: 6 }} />
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
              <Icon name="trash-2" size={16} color="#FF4D4F" style={{ marginRight: 6 }} />
              <Text style={[styles.menuText, { color: '#FF4D4F' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
          {infoItems.map((item, index) => (
            <InfoItem
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              isStatus={item.isStatus}
            />
          ))}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={onAddFollowUp}>
              <Text style={styles.buttonText}>Add Follow up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onAddService}>
              <Text style={styles.buttonText}>Add Services</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.historyTitle}>Interested Services</Text>
          {(showAllServices ? services : services.slice(0, 2)).map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDate}>{service.date}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </View>
          ))}
          {services.length > 2 && (
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => setShowAllServices(prev => !prev)}
            >
              <Text style={styles.expandButtonText}>
                {showAllServices ? 'Show Less' : 'Expand More'}
              </Text>
              <Icon
                name={showAllServices ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#2B2162"
              />
            </TouchableOpacity>
          )}

          <Text style={styles.historyTitle}>History</Text>
          {history.map((item, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineHeading}>{item.heading}</Text>
                <View style={[
                  styles.statusTag,
                  item.statusColor ? { backgroundColor: item.statusColor } : null
                ]}>
                  <Text style={[
                    styles.statusTagText,
                    item.statusTextColor ? { color: item.statusTextColor } : null
                  ]}>
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.personName}>{item.person}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.timelineDescription}>{item.description}</Text>
                <View style={styles.attachmentRow}>
                  <Icon name="file" size={14} color="#8E8E93" style={{ marginRight: 6 }} />
                  <Text style={styles.attachmentText}>{item.attachment}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Urbanist-Bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.1,
  },
  rowRight: {
    flex: 1.3,
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 14,
    color: '#616161',
    fontFamily: 'Urbanist-Regular',
  },
  value: {
    fontSize: 16,
    fontWeight: 500,
    color: '#212121',
    textAlign: 'right',
    fontFamily: 'Urbanist-Medium',
  },
  statusBadge: {
    backgroundColor: '#D3F5FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24, 
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 16,
  },

  button: {
    backgroundColor: '#DFE4FF',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'Urbanist-Bold',
    color: '#2B2162',
    textAlign: 'center',
    lineHeight: 22.4,
    letterSpacing: 0.2,
  },

  interestedTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Bold',
    marginBottom: 10,
  },
  serviceCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    fontFamily: 'Urbanist-Bold',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '400',
    fontFamily: 'Urbanist-Regular',
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '400',
    fontFamily: 'Urbanist-Regular',
    lineHeight: 18,
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    gap: 10,
    borderRadius: 100,
    backgroundColor: '#DFE4FF',
    alignSelf: 'stretch',
    marginTop: 8,
    marginBottom: 40,
  },

  expandButtonText: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: '#2B2162',
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 22.4,
    letterSpacing: 0.2,
    marginRight: 6,
  },

  historyTitle: {
    fontSize: 18,
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
    fontWeight: 700,
    marginBottom: 16,
  },

  timelineItem: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  timelineDot: {
    width: 12,
    height: 12,
    backgroundColor: '#2B2162',
    borderRadius: 6,
    marginTop: 6,
  },

  timelineContent: {
    flex: 1,
    marginLeft: 12,
  },

  timelineHeading: {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
  },

  statusTag: {
    backgroundColor: '#D3F5FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 6,
  },

  statusTagText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Urbanist-Medium',
  },

  personName: {
    fontSize: 14,
    fontFamily: 'Urbanist-Bold',
    color: '#212121',
    fontWeight: 700,
    marginBottom: 2,
  },

  dateText: {
    fontSize: 12,
    fontFamily: 'Urbanist-Medium',
    fontWeight: 700,
    color: '#424242',
    marginBottom: 4,
  },

  timelineDescription: {
    fontSize: 13,
    color: '#424242',
    fontFamily: 'Urbanist-Regular',
    fontWeight: 400,
    marginBottom: 6,
    lineHeight: 18,
  },

  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  attachmentText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: 400,
    fontFamily: 'Urbanist-Medium',
  },

  timelineLineContainer: {
    alignItems: 'center',
    width: 20,
  },

  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#2B2162',
    marginTop: 2,
  },

  menuBox: {
    position: 'absolute',
    top: 58, // icon height approx + margin (adjust if needed)
    right: 16, // aligns right side close to 3-dot icon
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    color: '#2B2162',
  },
});