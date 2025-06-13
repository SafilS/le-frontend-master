import React, { useState } from 'react';
import PricingCalculator from './PricingCalculator';

const EstimationTest = () => {
  const [estimationData, setEstimationData] = useState({
    projectType: 'kitchen',
    dimensions: {
      kitchen: {
        length: '12',
        width: '10',
        height: '9'
      }
    },
    materials: {
      wood: 'plywood',
      hardware: 'basic',
      quality: 'basic'
    },
    finishes: {
      finish: 'paint'
    },
    timeline: 'immediate',
    additionalFeatures: [],
    contactInfo: {}
  });

  const [totalEstimate, setTotalEstimate] = useState(0);
  const [breakdown, setBreakdown] = useState({});

  const handleMaterialChange = (material) => {
    setEstimationData(prev => ({
      ...prev,
      materials: {
        ...prev.materials,
        wood: material
      }
    }));
  };

  const handleFeatureToggle = (feature) => {
    setEstimationData(prev => ({
      ...prev,
      additionalFeatures: prev.additionalFeatures.includes(feature)
        ? prev.additionalFeatures.filter(f => f !== feature)
        : [...prev.additionalFeatures, feature]
    }));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Estimation Test</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Wood Type:</label>
              <select 
                value={estimationData.materials.wood}
                onChange={(e) => handleMaterialChange(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="plywood">Plywood (₹150/sq ft)</option>
                <option value="mdf">MDF (₹120/sq ft)</option>
                <option value="particle">Particle Board (₹80/sq ft)</option>
                <option value="solid">Solid Wood (₹300/sq ft)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Features:</label>
              <div className="space-y-2">
                {['appliances', 'backsplash', 'lighting', 'accessories'].map(feature => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={estimationData.additionalFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="mr-2"
                    />
                    {feature.charAt(0).toUpperCase() + feature.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Kitchen Dimensions:</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Length"
                  value={estimationData.dimensions.kitchen.length}
                  onChange={(e) => setEstimationData(prev => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      kitchen: {
                        ...prev.dimensions.kitchen,
                        length: e.target.value
                      }
                    }
                  }))}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Width"
                  value={estimationData.dimensions.kitchen.width}
                  onChange={(e) => setEstimationData(prev => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      kitchen: {
                        ...prev.dimensions.kitchen,
                        width: e.target.value
                      }
                    }
                  }))}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={estimationData.dimensions.kitchen.height}
                  onChange={(e) => setEstimationData(prev => ({
                    ...prev,
                    dimensions: {
                      ...prev.dimensions,
                      kitchen: {
                        ...prev.dimensions.kitchen,
                        height: e.target.value
                      }
                    }
                  }))}
                  className="p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Current Data:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(estimationData, null, 2)}
            </pre>
          </div>
        </div>

        <div>
          <PricingCalculator 
            estimationData={estimationData}
            onPriceUpdate={(total, breakdown) => {
              setTotalEstimate(total);
              setBreakdown(breakdown);
              console.log('Price updated:', { total, breakdown });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EstimationTest;