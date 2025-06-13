import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Info,
  DollarSign,
  Percent
} from 'lucide-react';

const PricingCalculator = ({ estimationData, onPriceUpdate }) => {
  const [detailedBreakdown, setDetailedBreakdown] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Enhanced pricing database
  const pricingDatabase = {
    materials: {
      wood: {
        plywood: { 
          price: 150, 
          unit: 'sq ft', 
          quality: 'Good',
          description: 'BWR grade plywood, moisture resistant',
          priceRange: { min: 120, max: 180 }
        },
        mdf: { 
          price: 120, 
          unit: 'sq ft', 
          quality: 'Standard',
          description: 'Medium Density Fiberboard, smooth finish',
          priceRange: { min: 100, max: 140 }
        },
        particle: { 
          price: 80, 
          unit: 'sq ft', 
          quality: 'Basic',
          description: 'Particle board, budget-friendly',
          priceRange: { min: 60, max: 100 }
        },
        solid: { 
          price: 300, 
          unit: 'sq ft', 
          quality: 'Premium',
          description: 'Solid wood, natural grain',
          priceRange: { min: 250, max: 400 }
        }
      },
      finishes: {
        laminate: { 
          price: 50, 
          unit: 'sq ft',
          description: 'High-pressure laminate, durable',
          priceRange: { min: 40, max: 70 }
        },
        veneer: { 
          price: 120, 
          unit: 'sq ft',
          description: 'Natural wood veneer, premium look',
          priceRange: { min: 100, max: 150 }
        },
        paint: { 
          price: 30, 
          unit: 'sq ft',
          description: 'Premium paint finish, multiple coats',
          priceRange: { min: 25, max: 40 }
        },
        lacquer: { 
          price: 80, 
          unit: 'sq ft',
          description: 'High-gloss lacquer finish',
          priceRange: { min: 70, max: 100 }
        }
      },
      hardware: {
        basic: { 
          price: 2000, 
          unit: 'set',
          description: 'Standard hinges, handles, and fittings',
          items: ['Hinges', 'Handles', 'Drawer slides', 'Locks']
        },
        premium: { 
          price: 5000, 
          unit: 'set',
          description: 'Soft-close mechanisms, premium handles',
          items: ['Soft-close hinges', 'Designer handles', 'Premium slides', 'Push-to-open']
        },
        luxury: { 
          price: 10000, 
          unit: 'set',
          description: 'Designer hardware, imported fittings',
          items: ['Imported hinges', 'Luxury handles', 'Servo drives', 'Smart locks']
        }
      }
    },
    labor: {
      basic: { 
        rate: 40, 
        unit: 'sq ft',
        description: 'Standard workmanship',
        includes: ['Basic installation', 'Standard finishing', 'Cleanup']
      },
      premium: { 
        rate: 60, 
        unit: 'sq ft',
        description: 'Enhanced workmanship with attention to detail',
        includes: ['Precision installation', 'Premium finishing', 'Quality checks', 'Cleanup']
      },
      luxury: { 
        rate: 80, 
        unit: 'sq ft',
        description: 'Master craftsman level work',
        includes: ['Expert installation', 'Luxury finishing', 'Multiple quality checks', 'Premium cleanup']
      }
    },
    additionalCosts: {
      design: { percentage: 10, description: '3D design and planning' },
      transportation: { percentage: 3, description: 'Material transportation' },
      installation: { percentage: 5, description: 'Installation supervision' },
      warranty: { percentage: 2, description: 'Extended warranty coverage' }
    }
  };

  useEffect(() => {
    calculateDetailedPricing();
  }, [estimationData]);

  const calculateDetailedPricing = () => {
    let breakdown = {};
    let total = 0;

    const isEntireHome = estimationData.projectType === 'entire-home';

    if (isEntireHome) {
      // Calculate for each room
      Object.entries(estimationData.dimensions).forEach(([room, dims]) => {
        if (dims.length && dims.width && dims.height) {
          const roomCost = calculateRoomCost(room, dims, estimationData);
          breakdown[room] = roomCost;
          total += roomCost.total;
        }
      });
    } else {
      // Calculate for kitchen only
      const dims = estimationData.dimensions.kitchen;
      if (dims?.length && dims?.width && dims?.height) {
        const kitchenCost = calculateKitchenCost(dims, estimationData);
        breakdown.kitchen = kitchenCost;
        total = kitchenCost.total;
      }
    }

    // Add additional costs
    const additionalCosts = calculateAdditionalCosts(total);
    breakdown.additional = additionalCosts;
    total += additionalCosts.total;

    setDetailedBreakdown(breakdown);
    setTotalCost(total);
    onPriceUpdate(total, breakdown);
  };

  const calculateRoomCost = (room, dimensions, data) => {
    const area = parseFloat(dimensions.length) * parseFloat(dimensions.width);
    const wallArea = 2 * (parseFloat(dimensions.length) + parseFloat(dimensions.width)) * parseFloat(dimensions.height);
    
    // Get material costs
    const woodType = data.materials?.wood || 'plywood';
    const finishType = data.finishes?.finish || 'paint';
    const hardwareType = data.materials?.hardware || 'basic';
    const qualityType = data.materials?.quality || 'basic';

    const materialCost = area * pricingDatabase.materials.wood[woodType].price;
    const finishCost = wallArea * pricingDatabase.materials.finishes[finishType].price;
    const hardwareCost = pricingDatabase.materials.hardware[hardwareType].price;
    const laborCost = area * pricingDatabase.labor[qualityType].rate;

    const subtotal = materialCost + finishCost + hardwareCost + laborCost;

    return {
      area,
      wallArea,
      materials: {
        wood: { cost: materialCost, type: woodType, rate: pricingDatabase.materials.wood[woodType].price },
        finish: { cost: finishCost, type: finishType, rate: pricingDatabase.materials.finishes[finishType].price },
        hardware: { cost: hardwareCost, type: hardwareType }
      },
      labor: { cost: laborCost, type: qualityType, rate: pricingDatabase.labor[qualityType].rate },
      subtotal,
      total: subtotal
    };
  };

  const calculateKitchenCost = (dimensions, data) => {
    const area = parseFloat(dimensions.length) * parseFloat(dimensions.width);
    const cabinetArea = area * 1.5; // Factor for upper and lower cabinets
    
    const woodType = data.materials?.wood || 'plywood';
    const hardwareType = data.materials?.hardware || 'basic';
    const qualityType = data.materials?.quality || 'basic';

    const cabinetCost = cabinetArea * pricingDatabase.materials.wood[woodType].price;
    const counterCost = area * 200; // Countertop cost per sq ft
    const applianceCost = data.additionalFeatures?.includes('appliances') ? 150000 : 0;
    const hardwareCost = pricingDatabase.materials.hardware[hardwareType].price;
    const laborCost = area * pricingDatabase.labor[qualityType].rate;

    const subtotal = cabinetCost + counterCost + applianceCost + hardwareCost + laborCost;

    return {
      area,
      cabinetArea,
      materials: {
        cabinets: { cost: cabinetCost, type: woodType },
        counter: { cost: counterCost },
        appliances: { cost: applianceCost },
        hardware: { cost: hardwareCost, type: hardwareType }
      },
      labor: { cost: laborCost, type: qualityType },
      subtotal,
      total: subtotal
    };
  };

  const calculateAdditionalCosts = (subtotal) => {
    const costs = {};
    let total = 0;

    Object.entries(pricingDatabase.additionalCosts).forEach(([key, data]) => {
      const cost = (subtotal * data.percentage) / 100;
      costs[key] = { cost, percentage: data.percentage, description: data.description };
      total += cost;
    });

    return { costs, total };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Calculator className="mr-2 text-blue-600" />
          Live Pricing Calculator
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Total Cost Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">Estimated Total Cost</div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {formatCurrency(totalCost)}
          </div>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <TrendingUp size={16} className="mr-1 text-green-500" />
            Real-time calculation based on your selections
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Material Cost</div>
          <div className="text-lg font-semibold">
            {formatCurrency(Object.values(detailedBreakdown).reduce((sum, room) => {
              if (room.materials) {
                return sum + Object.values(room.materials).reduce((matSum, mat) => matSum + (mat.cost || 0), 0);
              }
              return sum;
            }, 0))}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Labor Cost</div>
          <div className="text-lg font-semibold">
            {formatCurrency(Object.values(detailedBreakdown).reduce((sum, room) => {
              return sum + (room.labor?.cost || 0);
            }, 0))}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          {Object.entries(detailedBreakdown).map(([key, data]) => (
            key !== 'additional' && (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-3 capitalize flex items-center">
                  {key.replace('_', ' ')}
                  <span className="ml-2 text-sm text-gray-500">
                    ({data.area?.toFixed(1)} sq ft)
                  </span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {data.materials && Object.entries(data.materials).map(([matKey, matData]) => (
                    <div key={matKey} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{matKey}:</span>
                      <span className="font-medium">{formatCurrency(matData.cost)}</span>
                    </div>
                  ))}
                  {data.labor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labor:</span>
                      <span className="font-medium">{formatCurrency(data.labor.cost)}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between font-semibold">
                  <span>Room Total:</span>
                  <span className="text-blue-600">{formatCurrency(data.total)}</span>
                </div>
              </div>
            )
          ))}

          {/* Additional Costs */}
          {detailedBreakdown.additional && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                Additional Costs
                <Info size={16} className="ml-2 text-gray-400" />
              </h4>
              
              <div className="space-y-2 text-sm">
                {Object.entries(detailedBreakdown.additional.costs).map(([key, data]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600 flex items-center">
                      {data.description}
                      <span className="ml-1 text-xs">({data.percentage}%)</span>
                    </span>
                    <span className="font-medium">{formatCurrency(data.cost)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between font-semibold">
                <span>Additional Total:</span>
                <span className="text-orange-600">{formatCurrency(detailedBreakdown.additional.total)}</span>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Price Range Indicator */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-center mb-2">
          <Info size={16} className="text-yellow-600 mr-2" />
          <span className="text-sm font-medium text-yellow-800">Price Range</span>
        </div>
        <div className="text-sm text-yellow-700">
          Final cost may vary ±15% based on site conditions, material availability, and specific requirements.
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Minimum: {formatCurrency(totalCost * 0.85)}</span>
          <span>Maximum: {formatCurrency(totalCost * 1.15)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <DollarSign size={16} className="mr-2" />
          Get Detailed Quote
        </button>
        <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
          <Percent size={16} className="mr-2" />
          Apply for Finance
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCalculator;