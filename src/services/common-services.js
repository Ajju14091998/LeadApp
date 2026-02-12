import api from '../config/axiosinstance';

// --- LEADS ---
const fetchAllLeads = async (fromDate, toDate) => {
  try {
    const response = await api.get('lead/getlist/get-all', {
      params: {
        fromDate,
        toDate,
      },
    });
    console.log('fetchAllLeads Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch all leads:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const fetchLeadDetailsById = async leadId => {
  try {
    console.log('Calling lead ID:', leadId);
    const response = await api.get(`lead/getbyleadid/${leadId}`);
    console.log('fetchLeadDetailsById Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch lead details:', error);
    return null;
  }
};

const createupdatelead = async data => {
  try {
    const response = await api.post(
      `lead/insertupdateleaddetails/create-update`,
      data,
    );
    console.log('create lead add', response);
    return response.status;
  } catch (error) {
    console.error('Failed to create lead:', error);
    return null;
  }
};

// --- CLIENTS ---
const fetchAllClients = async (fromDate, toDate) => {
  try {
    const response = await api.get('client/getlist/get-all', {
      params: {
        fromDate,
        toDate,
      },
    });
    console.log('fetchAllClients  Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch all client:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const fetchclientDetailsById = async clientId => {
  try {
    console.log('Calling lead ID:', clientId);
    const response = await api.get(`client/getbyclientid/${clientId}`);
    console.log('fetchLeadDetailsById Response -', response);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch client details:', error);
    return null;
  }
};

// --- TASKS ---
const fetchAllTasks = async (fromDate, toDate) => {
  try {
    const response = await api.get('taskdetails/getlist', {
      params: { fromDate, toDate },
    });
    console.log('fetchAllTasks Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch all tasks:',
      error.response?.data || error.message,
    );
    return [];
  }
};

// const fetchDropdownValuesByType = async type => {
//   try {
//     const response = await api.get('udc/getvaluesbytype', {
//       params: { type },
//     });
//     console.log(`fetchDropdownValuesByType (${type}) Response:`, response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       `Failed to fetch dropdown values for type ${type}:`,
//       error.response?.data || error.message,
//     );
//     return [];
//   }
// };


// --- LEAD DROPDOWN DATA ---
const fetchLeadDropdownData = async () => {
  try {
    // ✅ Correct API endpoint
    const response = await api.get('lead/getdropdowndata/getdropdowndata');
    console.log('fetchLeadDropdownData Response:', response.data);

    // ✅ Response Description:
    // response.data[0] → Lead Source
    // response.data[1] → Occupation
    // response.data[2] → Services
    // response.data[3] → Assigned To

    const leadSources = response.data?.[0] || [];
    const occupations = response.data?.[1] || [];
    const services = response.data?.[2] || [];
    const assignedTo = response.data?.[3] || [];

    // ✅ Structured return for easy use
    return {
      leadSources,
      occupations,
      services,
      assignedTo,
    };
  } catch (error) {
    console.error(
      '❌ Failed to fetch lead dropdown data:',
      error.response?.data || error.message,
    );
    return {
      leadSources: [],
      occupations: [],
      services: [],
      assignedTo: [],
    };
  }
};


// --- CASCADE: COUNTRY / STATE / CITY ---
const fetchCountries = async () => {
  try {
    const response = await api.get('cascadecountrycitystate/getcountries');
    console.log('fetchCountries Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch countries:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const fetchStatesByCountryId = async countryId => {
  try {
    const response = await api.get('cascadecountrycitystate/getstates', {
      params: { countryId },
    });
    console.log('fetchStatesByCountryId Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch states:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const fetchCitiesByStateId = async stateId => {
  try {
    const response = await api.get('cascadecountrycitystate/getcities', {
      params: { stateId },
    });
    console.log('fetchCitiesByStateId Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch cities:',
      error.response?.data || error.message,
    );
    return [];
  }
};

// --- TASKS ---
const fetchAllTask = async (
  taskType,
  assignedTo = 0,
  fromDate = '',
  toDate = '',
) => {
  try {
    // taskType = "Lead" किंवा "Client"
    const params = {
      tenantId: 'root',
      taskType,
      assignedTo,
    };

    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    const response = await api.get('taskdetails/getlist', { params });

    console.log(`✅ fetchAllTasks (${taskType}) Response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ Failed to fetch ${taskType} tasks:`,
      error.response?.data || error.message,
    );
    return [];
  }
};

const fetchTaskById = async id => {
  try {
    const response = await api.get(`taskdetails/getbyid/${id}`);
    console.log('fetchTaskById Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch task by id:', error);
    return null;
  }
};

const createTask = async data => {
  try {
    const response = await api.post('taskdetails/create', data);
    console.log('createTask Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to create task:',
      error.response?.data || error.message,
    );
    return null;
  }
};

const updateTask = async (id, data) => {
  try {
    const response = await api.put(`taskdetails/update/${id}/tasks`, data);
    console.log('updateTask Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to update task:',
      error.response?.data || error.message,
    );
    return null;
  }
};

const updateTaskStatus = async data => {
  try {
    const response = await api.post('taskdetails/updatestatus', data);
    console.log('updateTaskStatus Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to update task status:',
      error.response?.data || error.message,
    );
    return null;
  }
};

// --- FOLLOWUPS ---
const fetchAllFollowups = async () => {
  try {
    const response = await api.get('followupdetails/getlist/get-all');
    console.log('fetchAllFollowups Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch all followups:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const fetchFollowupById = async id => {
  try {
    const response = await api.get(`followupdetails/get/${id}`);
    console.log('fetchFollowupById Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch followup by id:',
      error.response?.data || error.message,
    );
    return null;
  }
};

const fetchFollowupsByLeadClient = async params => {
  try {
    const response = await api.get(
      'followupdetails/getfollowuplistbyleadclient',
      { params },
    );
    console.log('fetchFollowupsByLeadClient Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch followup list by lead/client:',
      error.response?.data || error.message,
    );
    return [];
  }
};

const createOrUpdateFollowup = async data => {
  try {
    const response = await api.post(
      'followupdetails/createupdatefollowup',
      data,
    );
    console.log('createOrUpdateFollowup Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to create/update followup:',
      error.response?.data || error.message,
    );
    return null;
  }
};

const fetchFollowupDropdownData = async () => {
  try {
    const response = await api.get('followupdetails/getdropdowndata');
    console.log('fetchFollowupDropdownData Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch followup dropdown data:',
      error.response?.data || error.message,
    );
    return [];
  }
};

export {
  fetchAllLeads,
  fetchLeadDetailsById,
  createupdatelead,
  fetchAllClients,
  fetchclientDetailsById,
  fetchAllTask,
  // fetchDropdownValuesByType,
  fetchLeadDropdownData,
  fetchCountries,
  fetchStatesByCountryId,
  fetchCitiesByStateId,
  fetchAllTasks,
  fetchTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  fetchAllFollowups,
  fetchFollowupById,
  fetchFollowupsByLeadClient,
  createOrUpdateFollowup,
  fetchFollowupDropdownData,
};
