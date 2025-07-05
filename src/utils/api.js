// API service for Crown Interior Design
import axios from 'axios';

const API_BASE_URL = 'https://le-crown-interiors-backend.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || `HTTP error! status: ${error.response.status}`;
      throw new Error(message);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

/**
 * Post estimation order to the API
 * @param {Object} estimationData - Estimation data to submit
 * @returns {Promise} - API response
 */
export const submitEstimationOrder = async (estimationData) => {
  try {
    const response = await apiClient.post('/estimationOrder', estimationData);
    return response.data;
  } catch (error) {
    console.error('Failed to submit estimation order:', error);
    throw error;
  }
};

/**
 * Transform estimation data from the form format to API format
 * @param {Object} formData - Form data from estimation page
 * @param {number} totalEstimate - Total estimation amount
 * @returns {Object} - Transformed data ready for API
 */
export const transformEstimationData = (formData, totalEstimate) => {
  const {
    dimensions,
    materials,
    finishes,
    timeline,
    additionalFeatures,
    contactInfo,
    projectType
  } = formData;

  // Transform rooms data
  const rooms = [];
  
  if (dimensions) {
    Object.entries(dimensions).forEach(([roomKey, roomData]) => {
      if (roomData.length && roomData.width && roomData.height) {
        // Convert room key to proper display name
        const roomTypes = {
          living_room: 'Living Room',
          dining_room: 'Dining Room',
          kitchen: 'Kitchen',
          master_bedroom: 'Master Bedroom',
          bedroom_2: 'Bedroom 2',
          bedroom_3: 'Bedroom 3',
          bathroom_1: 'Bathroom 1',
          bathroom_2: 'Bathroom 2',
          bathroom_3: 'Bathroom 3',
          home_office: 'Home Office',
          balcony: 'Balcony'
        };
        
        rooms.push({
          type: roomTypes[roomKey] || roomKey.charAt(0).toUpperCase() + roomKey.slice(1).replace('_', ' '),
          length: roomData.length.toString(),
          width: roomData.width.toString(),
          height: roomData.height.toString()
        });
      }
    });
  }

  // Transform materials data
  const woodTypes = {
    plywood: 'Plywood',
    mdf: 'MDF',
    particle: 'Particle Board',
    solid: 'Solid Wood'
  };

  const hardwareTypes = {
    basic: 'Basic Hardware',
    premium: 'Premium Hardware',
    luxury: 'Luxury Hardware'
  };

  const finishTypes = {
    laminate: 'Laminate Finish',
    veneer: 'Wood Veneer',
    paint: 'Paint Finish',
    lacquer: 'Lacquer Finish'
  };

  const qualityTypes = {
    basic: 'Standard workmanship',
    premium: 'High quality craftsmanship',
    luxury: 'Premium luxury craftsmanship'
  };

  // Build API payload
  const apiData = {
    rooms,
    wood: woodTypes[materials?.wood] || 'Plywood',
    hardware: hardwareTypes[materials?.hardware] || 'Basic Hardware',
    workmanship: qualityTypes[materials?.quality] || 'Standard workmanship',
    surfaceFinish: finishTypes[finishes?.finish] || 'Paint Finish',
    deadline: timeline || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now if not specified
    additional: additionalFeatures || [],
    contact: {
      fullName: contactInfo?.name || '',
      phoneNumber: contactInfo?.phone || '',
      email: contactInfo?.email || '',
      address: contactInfo?.address || ''
    },
    EstimationAmount: Math.round(totalEstimate).toString()
  };

  return apiData;
};

export default {
  submitEstimationOrder,
  transformEstimationData
};