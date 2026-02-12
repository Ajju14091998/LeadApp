import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import CustomeDetails from '../components/CustomeDetails';
import { fetchclientDetailsById } from '../services/common-services';

export default function ClientDetailScreen({ route, navigation }) {
  const { clientId } = route.params;
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClientDetails = async () => {
      const response = await fetchclientDetailsById(clientId);
      if (response) setClientData(response);
      setLoading(false);
    };
    getClientDetails();
  }, [clientId]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!clientData) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>No client data found.</Text>
      </View>
    );
  }

  return (
    <CustomeDetails
      title={`${clientData.firstName} ${clientData.lastName}`}
      infoItems={[
        { icon: 'user', label: 'Name', value: `${clientData.firstName} ${clientData.lastName}` },
        { icon: 'phone', label: 'Mobile No', value: clientData.mobileNo },
        { icon: 'map-pin', label: 'Address', value: `${clientData.addressLine1} ${clientData.addressLine2}` },
        { icon: 'briefcase', label: 'Occupation', value: clientData.occupationName },
        { icon: 'grid', label: 'Type Of Work', value: clientData.workType },
        { icon: 'dollar-sign', label: 'Monthly Income', value: `₹ ${clientData.monthlyIncome}` },
        { icon: 'building', label: 'Company Name', value: clientData.organisationName },
        { icon: 'flag', label: 'Client Status', value: clientData.clientStatusName, isStatus: true },
        { icon: 'paperclip', label: 'Attachment', value: clientData.attachment },
      ]}
      services={clientData.services || []}
      history={clientData.history || []}
      onEdit={() => console.log('Edit Client')}
      onDelete={() => console.log('Delete Client')}
      onAddFollowUp={() => navigation.navigate('ClientFollowup')}
      onAddService={() => navigation.navigate('ClientAddServices')}
    />
  );
}
