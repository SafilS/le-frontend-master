import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, Check, DollarSign, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EntireHomeEstimate = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
  const [formData, setFormData] = useState({
    bhkType: '',
    bhkSize: '',
    rooms: {
      livingRoom: 1,
      kitchen: 1,
      bedroom: 1,
      bathroom: 1,
      dining: 1
    },
    quality: '',
    estimatedCost: { min: 0, max: 0 }
  });

  // Calculate estimated cost based on selections
  useEffect(() => {
    if (formData.bhkType && formData.quality) {
      calculateEstimatedCost();
    }
  }, [formData.bhkType, formData.bhkSize, formData.quality, formData.rooms]);

  const calculateEstimatedCost = () => {
    const bhkNumber = parseInt(formData.bhkType.split('bhk')[0]);
    const isPremium = formData.quality === 'premium';
    const isLarge = formData.bhkSize === 'large';
    
    // Base BHK pricing according to your specifications (for small/standard size)
    let baseCost = { min: 0, max: 0 };
    
    if (bhkNumber === 1) {
      baseCost = isPremium ? { min: 1.8, max: 2.2 } : { min: 1.6, max: 2.0 };
    } else if (bhkNumber === 2) {
      baseCost = isPremium ? { min: 2.8, max: 3.0 } : { min: 2.4, max: 2.6 };
    } else if (bhkNumber === 3) {
      baseCost = isPremium ? { min: 3.5, max: 3.7 } : { min: 3.0, max: 3.4 };
    } else if (bhkNumber === 4) {
      baseCost = isPremium ? { min: 7.5, max: 8.4 } : { min: 6.0, max: 6.5 };
    } else if (bhkNumber >= 5) {
      baseCost = isPremium ? { min: 18.0, max: 20.0 } : { min: 12.0, max: 15.0 };
    }
    
    let minCost = baseCost.min;
    let maxCost = baseCost.max;
    
    // Apply size multiplier for large spaces (20-25% increase)
    if (isLarge) {
      minCost *= 1.2;
      maxCost *= 1.25;
    }
    
    // Add costs for additional rooms beyond the base BHK configuration
    const additionalRoomCosts = {
      kitchen: 1.1, // ₹1,10,000
      livingRoom: 0.3, // ₹30,000
      bathroom: 0.2, // ₹20,000
      dining: 0.3 // Similar to living room
    };
    
    // Calculate expected room counts for each BHK type
    const expectedRooms = {
      1: { livingRoom: 1, kitchen: 1, bedroom: 1, bathroom: 1, dining: 0 },
      2: { livingRoom: 1, kitchen: 1, bedroom: 2, bathroom: 1, dining: 1 },
      3: { livingRoom: 1, kitchen: 1, bedroom: 3, bathroom: 2, dining: 1 },
      4: { livingRoom: 1, kitchen: 1, bedroom: 4, bathroom: 2, dining: 1 },
      5: { livingRoom: 1, kitchen: 1, bedroom: 5, bathroom: 3, dining: 1 }
    };
    
    const expected = expectedRooms[Math.min(bhkNumber, 5)];
    
    // Add cost for additional rooms beyond expected counts
    Object.entries(formData.rooms).forEach(([roomType, count]) => {
      const expectedCount = expected[roomType] || 0;
      const additionalCount = Math.max(0, count - expectedCount);
      
      if (additionalCount > 0 && additionalRoomCosts[roomType]) {
        const additionalCost = additionalRoomCosts[roomType] * additionalCount;
        minCost += additionalCost;
        maxCost += additionalCost;
      }
    });
    
    minCost = Math.round(minCost * 10) / 10;
    maxCost = Math.round(maxCost * 10) / 10;

    setFormData(prev => ({
      ...prev,
      estimatedCost: { min: minCost, max: maxCost }
    }));
  };

  const handleBhkSelect = (bhk) => {
    const bhkNumber = parseInt(bhk.split('bhk')[0]);
    
    // Set initial room counts based on BHK type
    const initialRooms = {
      1: { livingRoom: 1, kitchen: 1, bedroom: 1, bathroom: 1, dining: 0 },
      2: { livingRoom: 1, kitchen: 1, bedroom: 2, bathroom: 1, dining: 1 },
      3: { livingRoom: 1, kitchen: 1, bedroom: 3, bathroom: 2, dining: 1 },
      4: { livingRoom: 1, kitchen: 1, bedroom: 4, bathroom: 2, dining: 1 },
      5: { livingRoom: 1, kitchen: 1, bedroom: 5, bathroom: 3, dining: 1 }
    };
    
    const rooms = initialRooms[Math.min(bhkNumber, 5)] || initialRooms[1];
    
    if (bhk === '1bhk') {
      setFormData(prev => ({
        ...prev,
        bhkType: bhk,
        bhkSize: '',
        rooms: rooms
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        bhkType: bhk,
        bhkSize: prev.bhkSize || 'small',
        rooms: rooms
      }));
    }
  };

  const handleSizeSelect = (size) => {
    setFormData(prev => ({
      ...prev,
      bhkSize: size
    }));
  };

  const handleRoomIncrement = (room) => {
    const bhkNumber = parseInt(formData.bhkType.split('bhk')[0]);
    
    // Restrict bedroom count for 1-4 BHK configurations
    if (room === 'bedroom' && bhkNumber <= 4) {
      const maxBedrooms = bhkNumber; // 1BHK=1 bedroom, 2BHK=2 bedrooms, etc.
      if (formData.rooms[room] >= maxBedrooms) {
        return; // Don't allow increment beyond BHK limit
      }
    }
    
    setFormData(prev => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [room]: Math.min(prev.rooms[room] + 1, 10)
      }
    }));
  };

  const handleRoomDecrement = (room) => {
    setFormData(prev => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [room]: Math.max(prev.rooms[room] - 1, 0)
      }
    }));
  };

  const handleQualitySelect = (quality) => {
    setFormData(prev => ({
      ...prev,
      quality: quality
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.bhkType) {
        alert('Please select a BHK type');
        return;
      }
      if (formData.bhkType !== '1bhk' && !formData.bhkSize) {
        alert('Please select a size');
        return;
      }
    } else if (currentStep === 2) {
      const hasRooms = Object.values(formData.rooms).some(count => count > 0);
      if (!hasRooms) {
        alert('Please select at least one room');
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.quality) {
        alert('Please select a quality option');
        return;
      }
      // Show loader when moving to step 4
      setIsLoadingEstimate(true);
      setTimeout(() => {
        setIsLoadingEstimate(false);
        setCurrentStep(4);
      }, 2000);
      return;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      if (!formData.bhkType) return true;
      if (formData.bhkType !== '1bhk' && !formData.bhkSize) return true;
    } else if (currentStep === 2) {
      const hasRooms = Object.values(formData.rooms).some(count => count > 0);
      if (!hasRooms) return true;
    } else if (currentStep === 3) {
      if (!formData.quality) return true;
    }
    return false;
  };

  const renderStepIndicators = () => {
    return (
      <div className="flex justify-center items-center mb-4 sm:mb-6">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium sm:w-8 sm:h-8 sm:text-sm ${currentStep >= step ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {currentStep > step ? <Check size={12} className="sm:w-4 sm:h-4" /> : step}
            </div>
            {step < 4 && (
              <div 
                className={`w-8 h-0.5 sm:w-12 sm:h-1 ${currentStep > step ? 'bg-pink-500' : 'bg-gray-200'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderBhkSelection = () => {
    const bhkOptions = [
      { value: '1bhk', label: '1 BHK' },
      { value: '2bhk', label: '2 BHK' },
      { value: '3bhk', label: '3 BHK' },
      { value: '4bhk', label: '4 BHK' },
      { value: '5bhk', label: '5+ BHK' }
    ];

    return (
      <div className="text-center">
        <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto sm:grid-cols-2 sm:gap-4 sm:max-w-md">
          {bhkOptions.map((option) => (
            <div 
              key={option.value} 
              className={`border-2 rounded-lg p-3 cursor-pointer transition-all sm:p-4 ${formData.bhkType === option.value ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => handleBhkSelect(option.value)}
            >
              <div className="text-base font-medium sm:text-lg">{option.label}</div>
            </div>
          ))}
        </div>
        
        {formData.bhkType && formData.bhkType !== '1bhk' && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-base font-medium mb-3 sm:text-lg sm:mb-4">Select Size</h3>
            <div className="flex justify-center space-x-4 sm:space-x-6">
              <div 
                className={`border-2 rounded-lg p-3 w-24 cursor-pointer transition-all sm:p-4 sm:w-32 ${formData.bhkSize === 'small' ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => handleSizeSelect('small')}
              >
                <div className="text-sm font-medium sm:text-base">Small</div>
              </div>
              <div 
                className={`border-2 rounded-lg p-3 w-24 cursor-pointer transition-all sm:p-4 sm:w-32 ${formData.bhkSize === 'large' ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => handleSizeSelect('large')}
              >
                <div className="text-sm font-medium sm:text-base">Large</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRoomSelection = () => {
    const rooms = [
      { id: 'livingRoom', label: 'Living Room' },
      { id: 'kitchen', label: 'Kitchen' },
      { id: 'bedroom', label: 'Bedroom' },
      { id: 'bathroom', label: 'Bathroom' },
      { id: 'dining', label: 'Dining' }
    ];

    // Calculate base cost preview for room selection
    const calculateRoomBaseCost = () => {
      const bhkNumber = parseInt(formData.bhkType.split('bhk')[0]);
      const isLarge = formData.bhkSize === 'large';
      
      // Base BHK pricing (for small/standard size)
      let baseCost = { min: 0, max: 0 };
      
      if (bhkNumber === 1) {
        baseCost = { min: 1.6, max: 2.0 };
      } else if (bhkNumber === 2) {
        baseCost = { min: 2.4, max: 2.6 };
      } else if (bhkNumber === 3) {
        baseCost = { min: 3.0, max: 3.4 };
      } else if (bhkNumber === 4) {
        baseCost = { min: 6.0, max: 6.5 };
      } else if (bhkNumber >= 5) {
        baseCost = { min: 12.0, max: 15.0 };
      }
      
      // Apply size multiplier for large spaces
      if (isLarge) {
        baseCost.min *= 1.2;
        baseCost.max *= 1.25;
      }
      
      // Add additional room costs
      const additionalRoomCosts = {
        kitchen: 1.1,
        livingRoom: 0.3,
        bathroom: 0.2,
        dining: 0.3
      };
      
      const expectedRooms = {
        1: { livingRoom: 1, kitchen: 1, bedroom: 1, bathroom: 1, dining: 0 },
        2: { livingRoom: 1, kitchen: 1, bedroom: 2, bathroom: 1, dining: 1 },
        3: { livingRoom: 1, kitchen: 1, bedroom: 3, bathroom: 2, dining: 1 },
        4: { livingRoom: 1, kitchen: 1, bedroom: 4, bathroom: 2, dining: 1 },
        5: { livingRoom: 1, kitchen: 1, bedroom: 5, bathroom: 3, dining: 1 }
      };
      
      const expected = expectedRooms[Math.min(bhkNumber, 5)];
      let additionalCost = 0;
      
      Object.entries(formData.rooms).forEach(([roomType, count]) => {
        const expectedCount = expected[roomType] || 0;
        const additionalCount = Math.max(0, count - expectedCount);
        
        if (additionalCount > 0 && additionalRoomCosts[roomType]) {
          additionalCost += additionalRoomCosts[roomType] * additionalCount;
        }
      });
      
      return { 
        min: Math.round((baseCost.min + additionalCost) * 10) / 10, 
        max: Math.round((baseCost.max + additionalCost) * 10) / 10 
      };
    };

    const baseCost = calculateRoomBaseCost();
    const hasRooms = Object.values(formData.rooms).some(count => count > 0);

    return (
      <div className="text-center">
        <div className="max-w-sm mx-auto space-y-4 sm:max-w-md sm:space-y-6">
          {rooms.map((room) => {
            const bhkNumber = parseInt(formData.bhkType.split('bhk')[0]);
            const isBedroomRestricted = room.id === 'bedroom' && bhkNumber <= 4;
            const maxBedrooms = bhkNumber;
            const isBedroomAtMax = isBedroomRestricted && formData.rooms[room.id] >= maxBedrooms;
            
            return (
              <div key={room.id} className="border rounded-lg p-3 shadow-sm sm:p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-base font-medium sm:text-lg">{room.label}</span>
                    {isBedroomRestricted && (
                      <div className="text-xs text-gray-500 mt-1">
                        Max {maxBedrooms} for {bhkNumber}BHK
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <button 
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors sm:w-8 sm:h-8"
                      onClick={() => handleRoomDecrement(room.id)}
                      disabled={formData.rooms[room.id] === 0}
                    >
                      <span className="text-lg font-bold sm:text-xl">-</span>
                    </button>
                    
                    <span className="w-6 text-center font-medium text-sm sm:w-8 sm:text-base">{formData.rooms[room.id]}</span>
                    
                    <button 
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors sm:w-8 sm:h-8 ${
                        isBedroomAtMax 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                      }`}
                      onClick={() => handleRoomIncrement(room.id)}
                      disabled={isBedroomAtMax}
                    >
                      <span className="text-lg font-bold sm:text-xl">+</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          

        </div>
      </div>
    );
  };

  const renderQualitySelection = () => {
    return (
      <div className="text-center w-full">
        <div className="space-y-4 max-w-sm mx-auto sm:space-y-6 sm:max-w-md">
          {/* Basic Quality Option */}
          <div className="relative">
            <input 
              type="radio" 
              id="basic-quality" 
              name="quality" 
              value="basic" 
              checked={formData.quality === 'basic'}
              onChange={() => handleQualitySelect('basic')}
              className="absolute opacity-0 w-full h-full cursor-pointer z-10"
            />
            <label 
              htmlFor="basic-quality" 
              className={`block border-2 rounded-lg p-3 cursor-pointer transition-all sm:p-4 ${formData.quality === 'basic' ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="mb-2 sm:mb-3">
                <img 
                  src="/images/basic-interior.jpg" 
                  alt="Basic Interior" 
                  className="w-full h-24 object-cover rounded-md sm:h-32"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-24 bg-gray-200 rounded-md hidden items-center justify-center sm:h-32"
                >
                  <span className="text-gray-500 text-xs sm:text-sm">Basic Interior</span>
                </div>
              </div>
              <h3 className="text-base font-semibold mb-1 sm:text-lg sm:mb-2">Basic (₹₹)</h3>
              <p className="text-gray-600 mb-2 text-xs sm:text-sm sm:mb-3">Standard finishes with essential functionality</p>
              <ul className="text-xs text-left space-y-0.5 sm:space-y-1">
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Standard materials</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Functional design</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Basic accessories</li>
              </ul>
            </label>
          </div>
          
          {/* Premium Quality Option */}
          <div className="relative">
            <input 
              type="radio" 
              id="premium-quality" 
              name="quality" 
              value="premium" 
              checked={formData.quality === 'premium'}
              onChange={() => handleQualitySelect('premium')}
              className="absolute opacity-0 w-full h-full cursor-pointer z-10"
            />
            <label 
              htmlFor="premium-quality" 
              className={`block border-2 rounded-lg p-3 cursor-pointer transition-all sm:p-4 ${formData.quality === 'premium' ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="mb-2 sm:mb-3">
                <img 
                  src="/images/premium-interior.jpg" 
                  alt="Premium Interior" 
                  className="w-full h-24 object-cover rounded-md sm:h-32"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-md hidden items-center justify-center sm:h-32"
                >
                  <span className="text-gray-700 font-medium text-xs sm:text-sm">Premium Interior</span>
                </div>
              </div>
              <h3 className="text-base font-semibold mb-1 sm:text-lg sm:mb-2">Premium (₹₹₹₹)</h3>
              <p className="text-gray-600 mb-2 text-xs sm:text-sm sm:mb-3">High-quality finishes with premium features</p>
              <ul className="text-xs text-left space-y-0.5 sm:space-y-1">
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Premium materials</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Designer aesthetics</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Premium accessories</li>
              </ul>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderCostEstimation = () => {
    return (
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto mb-4 sm:p-6 sm:max-w-md sm:mb-6">
          <h3 className="text-2xl font-bold text-pink-500 mb-2 sm:text-3xl">
            ₹{formData.estimatedCost.min}L - ₹{formData.estimatedCost.max}L*
          </h3>
          <p className="text-gray-500 text-xs mb-4 sm:text-sm sm:mb-6">*Estimated cost range for your selections</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4 sm:gap-4 sm:mb-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1 sm:text-sm">BHK Type</div>
              <div className="font-medium text-sm sm:text-base">
                {formData.bhkType.charAt(0).toUpperCase()} BHK {formData.bhkSize && `(${formData.bhkSize})`}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1 sm:text-sm">Quality</div>
              <div className="font-medium capitalize text-sm sm:text-base">{formData.quality}</div>
            </div>
          </div>
          
          <div className="mb-4 border-t border-gray-100 pt-3 sm:mb-6 sm:pt-4">
            <div className="text-xs text-gray-500 mb-2 sm:text-sm">Selected Rooms</div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:gap-2 sm:text-sm">
              {Object.entries(formData.rooms)
                .filter(([_, count]) => count > 0)
                .map(([room, count]) => {
                  const roomLabel = room.replace(/([A-Z])/g, ' $1').trim();
                  const formattedLabel = roomLabel.charAt(0).toUpperCase() + roomLabel.slice(1);
                  return (
                    <div key={room} className="flex justify-between">
                      <span>{formattedLabel}:</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          
          
        </div>
        
        <div className="max-w-sm mx-auto grid grid-cols-2 gap-3 text-center sm:max-w-md sm:grid-cols-4 sm:gap-4">
          {['Free Design', 'Quality Materials', 'Expert Team', 'On-time Delivery'].map((feature, index) => (
            <div key={index} className="p-2 sm:p-3">
              <div className="w-8 h-8 mx-auto mb-1 flex items-center justify-center bg-pink-100 rounded-full sm:w-10 sm:h-10 sm:mb-2">
                <span className="text-pink-500 font-bold text-sm sm:text-base">✓</span>
              </div>
              <div className="text-xs font-medium">{feature}</div>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 mt-6 max-w-md mx-auto">
          *Prices are estimates and may vary based on final measurements, material selection, and site conditions.
        </p>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <div className="flex flex-col items-center justify-center h-80 sm:h-96">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin sm:w-16 sm:h-16"></div>
        </div>
        <div className="mt-4 text-center sm:mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:text-xl">Calculating Your Estimate</h3>
          <p className="text-gray-600 text-sm sm:text-base px-4">Please wait while we prepare your personalized quote...</p>
        </div>
        <div className="mt-3 flex space-x-1 sm:mt-4">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    if (isLoadingEstimate) {
      return renderLoader();
    }
    
    switch (currentStep) {
      case 1:
        return renderBhkSelection();
      case 2:
        return renderRoomSelection();
      case 3:
        return renderQualitySelection();
      case 4:
        return renderCostEstimation();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container - Mobile first approach */}
      <div className="mx-auto px-3 pt-20 pb-20 sm:px-4 sm:pt-24 sm:pb-24 md:pt-32 md:pb-24 md:max-w-4xl">
        
        {/* Component Header */}
        <div className="flex-shrink-0 mb-4 sm:mb-6 md:mb-8">
          {renderStepIndicators()}
        </div>
        
        {/* Main content card */}
        <div className="bg-white rounded-lg shadow-sm min-h-[500px] flex flex-col sm:rounded-xl sm:min-h-[600px]">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* Step header */}
            <div className="flex-shrink-0 px-4 py-4 border-b border-gray-100 sm:px-6 sm:py-5 md:px-8 md:py-6">
              {isLoadingEstimate ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-2 sm:text-2xl">Processing Your Request</h2>
                  <p className="text-gray-500 text-sm sm:text-base">Calculating your personalized estimate...</p>
                </div>
              ) : (
                <>
                  {currentStep === 1 && (
                    <>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">Select your BHK type</h2>
                      <p className="text-gray-500 text-sm sm:text-base">To give you the best quote, we need this info</p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">How many rooms would you like us to design?</h2>
                      <p className="text-gray-500 text-sm sm:text-base">Select the quantity for each room type</p>
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">Choose your style</h2>
                      <p className="text-gray-500 text-sm sm:text-base">Select the quality that matches your preference</p>
                    </>
                  )}
                  {currentStep === 4 && (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:w-16 sm:h-16 sm:mb-4">
                        <CheckCircle size={24} className="text-green-500 sm:w-8 sm:h-8" />
                      </div>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">Here's your estimated cost range</h2>
                      <p className="text-gray-500 text-sm sm:text-base">Based on your selections</p>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Content area */}
            <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6 sm:py-7 md:px-8 md:py-8">
              {renderStepContent()}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fixed navigation buttons at bottom - Mobile first */}
      {!isLoadingEstimate && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-3 py-3 z-10 sm:px-4 sm:py-4">
          <div className="mx-auto flex justify-between items-center md:max-w-4xl">
            {currentStep > 1 ? (
              <button 
                onClick={prevStep}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 text-sm sm:px-4 sm:text-base"
              >
                <ArrowLeft size={14} className="mr-1 sm:w-4 sm:h-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 && (
              <button 
                onClick={nextStep}
                className={`px-6 py-2.5 rounded-md transition-colors flex items-center font-medium text-sm sm:px-8 sm:py-3 sm:text-base ${
                  isNextButtonDisabled() 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-pink-500 text-white hover:bg-pink-600 shadow-lg'
                }`}
                disabled={isNextButtonDisabled()}
              >
                Next
                <ArrowRight size={14} className="ml-1 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntireHomeEstimate;
