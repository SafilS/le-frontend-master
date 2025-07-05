import React, { useState } from 'react';
import { submitEstimationOrder, transformEstimationData } from '../../utils/api';

const ApiTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testApiCall = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Sample test data matching the API requirements
    const testData = {
      rooms: [
        {
          type: "Bedroom",
          length: "12",
          width: "10",
          height: "8"
        },
        {
          type: "Living Room",
          length: "15",
          width: "12",
          height: "9"
        }
      ],
      wood: "Teak",
      hardware: "Brass fittings",
      workmanship: "High quality manual craftsmanship",
      surfaceFinish: "Glossy polish",
      deadline: "2025-08-31",
      additional: [
        "Include modular wardrobe",
        "False ceiling with lights"
      ],
      contact: {
        fullName: "John Doe",
        phoneNumber: "9876543210",
        email: "johndoe@example.com",
        address: "123, Main Street, Coimbatore, Tamil Nadu"
      },
      EstimationAmount: "125000"
    };

    try {
      const response = await submitEstimationOrder(testData);
      setResult(response);
      console.log('API Test Success:', response);
    } catch (err) {
      setError(err.message);
      console.error('API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testTransformData = () => {
    // Test data in the format that comes from the form
    const formData = {
      projectType: 'entire-home',
      dimensions: {
        living_room: { length: '15', width: '12', height: '9' },
        master_bedroom: { length: '12', width: '10', height: '8' }
      },
      materials: {
        wood: 'solid',
        hardware: 'luxury',
        quality: 'premium'
      },
      finishes: {
        finish: 'veneer'
      },
      timeline: '2025-08-31',
      additionalFeatures: ['lighting', 'storage'],
      contactInfo: {
        name: 'John Doe',
        phone: '9876543210',
        email: 'johndoe@example.com',
        address: '123, Main Street, Coimbatore, Tamil Nadu'
      }
    };

    const transformed = transformEstimationData(formData, 125000);
    console.log('Transformed Data:', transformed);
    setResult({ transformed });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Test Component</h2>
      
      <div className="space-y-4">
        <button
          onClick={testApiCall}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing API...' : 'Test API Call'}
        </button>
        
        <button
          onClick={testTransformData}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
        >
          Test Data Transform
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-bold">Result:</h3>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;