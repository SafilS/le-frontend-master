import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calculator, 
  Home, 
  ChefHat,
  Ruler,
  Palette,
  Clock,
  Wrench,
  CheckCircle,
  Download,
  Share2,
  Phone,
  Mail,
  Loader,
  AlertCircle
} from 'lucide-react';
import RoomCanvas from '../components/estimation/RoomCanvas';
import PricingCalculator from '../components/estimation/PricingCalculator';
import MaterialSelector from '../components/estimation/MaterialSelector';
import { submitEstimationOrder, transformEstimationData } from '../utils/api';

const EstimationPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [estimationData, setEstimationData] = useState({
    projectType: type,
    dimensions: {},
    materials: {},
    finishes: {},
    timeline: '',
    additionalFeatures: [],
    contactInfo: {}
  });
  const [totalEstimate, setTotalEstimate] = useState(0);
  const [breakdown, setBreakdown] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isEntireHome = type === 'entire-home';
  const totalSteps = 6; // Both flows now have 6 steps

  // Pricing data
  const pricingData = {
    materials: {
      wood: {
        plywood: { price: 150, unit: 'sq ft' },
        mdf: { price: 120, unit: 'sq ft' },
        particle: { price: 80, unit: 'sq ft' },
        solid: { price: 300, unit: 'sq ft' }
      },
      finishes: {
        laminate: { price: 50, unit: 'sq ft' },
        veneer: { price: 120, unit: 'sq ft' },
        paint: { price: 30, unit: 'sq ft' },
        lacquer: { price: 80, unit: 'sq ft' }
      },
      hardware: {
        basic: { price: 2000, unit: 'set' },
        premium: { price: 5000, unit: 'set' },
        luxury: { price: 10000, unit: 'set' }
      }
    },
    labor: {
      basic: 40,
      premium: 60,
      luxury: 80
    }
  };

  // Calculate estimate in real-time
  useEffect(() => {
    calculateEstimate();
  }, [estimationData]);

  const calculateEstimate = () => {
    let total = 0;
    let breakdownData = {};

    if (isEntireHome) {
      // Calculate for entire home
      Object.entries(estimationData.dimensions).forEach(([room, dims]) => {
        if (dims && dims.length && dims.width && dims.height) {
          const area = parseFloat(dims.length) * parseFloat(dims.width);
          const wallArea = 2 * (parseFloat(dims.length) + parseFloat(dims.width)) * parseFloat(dims.height);
          
          // Default values for materials if not specified
          const defaultWood = 'plywood';
          const defaultFinish = 'paint';
          const defaultHardware = 'basic';
          const defaultQuality = 'basic';
          
          // Material costs - handle custom rooms that might not have materials specified
          const materialCost = area * (
            pricingData.materials.wood[
              estimationData.materials[room]?.wood || 
              estimationData.materials.wood || 
              defaultWood
            ]?.price || 150
          );
          
          const finishCost = wallArea * (
            pricingData.materials.finishes[
              estimationData.finishes[room]?.finish || 
              estimationData.finishes.finish || 
              defaultFinish
            ]?.price || 30
          );
          
          const hardwareCost = 
            pricingData.materials.hardware[
              estimationData.materials[room]?.hardware || 
              estimationData.materials.hardware || 
              defaultHardware
            ]?.price || 2000;
          
          // Labor costs
          const laborRate = pricingData.labor[
            estimationData.materials[room]?.quality || 
            estimationData.materials.quality || 
            defaultQuality
          ] || 40;
          
          const laborCost = area * laborRate;
          
          const roomTotal = materialCost + finishCost + hardwareCost + laborCost;
          total += roomTotal;
          
          breakdownData[room] = {
            area,
            material: materialCost,
            finish: finishCost,
            hardware: hardwareCost,
            labor: laborCost,
            total: roomTotal
          };
        }
      });
    } else {
      // Calculate for kitchen only
      const dims = estimationData.dimensions.kitchen;
      if (dims?.length && dims?.width && dims?.height) {
        const area = parseFloat(dims.length) * parseFloat(dims.width);
        const cabinetArea = area * 1.5; // Factor for upper and lower cabinets
        
        // Kitchen-specific calculations
        const cabinetCost = cabinetArea * (pricingData.materials.wood[estimationData.materials.wood || 'plywood']?.price || 150);
        const counterCost = area * 200; // Counter top cost
        const applianceCost = estimationData.additionalFeatures.includes('appliances') ? 150000 : 0;
        const hardwareCost = pricingData.materials.hardware[estimationData.materials.hardware || 'basic']?.price || 2000;
        const laborCost = area * (pricingData.labor[estimationData.materials.quality || 'basic'] || 40);
        
        total = cabinetCost + counterCost + applianceCost + hardwareCost + laborCost;
        
        breakdownData = {
          cabinets: cabinetCost,
          counter: counterCost,
          appliances: applianceCost,
          hardware: hardwareCost,
          labor: laborCost,
          total
        };
      }
    }

    setTotalEstimate(total);
    setBreakdown(breakdownData);
  };

  const handleInputChange = (section, field, value, subField = null) => {
    setEstimationData(prev => ({
      ...prev,
      [section]: subField 
        ? { ...prev[section], [field]: { ...prev[section]?.[field], [subField]: value } }
        : { ...prev[section], [field]: value }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    // Check dimensions
    if (!estimationData.dimensions || Object.keys(estimationData.dimensions).length === 0) {
      errors.push('Please add at least one room with dimensions');
    } else {
      const hasValidRoom = Object.values(estimationData.dimensions).some(room => 
        room.length && room.width && room.height
      );
      if (!hasValidRoom) {
        errors.push('Please enter valid dimensions for at least one room');
      }
    }
    
    // Check contact info (required for final step)
    if (currentStep === totalSteps) {
      if (!estimationData.contactInfo.name) errors.push('Name is required');
      if (!estimationData.contactInfo.phone) errors.push('Phone number is required');
      if (!estimationData.contactInfo.email) errors.push('Email is required');
    }
    
    return errors;
  };

  const handleSubmitEstimation = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Validate form
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setSubmitError(validationErrors.join(', '));
        return;
      }
      
      // Transform the estimation data to API format
      const apiData = transformEstimationData(estimationData, totalEstimate);
      
      console.log('Submitting estimation data:', apiData);
      
      // Submit to API
      const response = await submitEstimationOrder(apiData);
      
      console.log('Estimation submitted successfully:', response);
      setSubmitSuccess(true);
      
      // Optional: Show success message or navigate to success page
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to submit estimation:', error);
      setSubmitError(error.message || 'Failed to submit estimation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <DimensionsStep 
          isEntireHome={isEntireHome} 
          data={estimationData.dimensions} 
          onChange={(field, value, subField) => handleInputChange('dimensions', field, value, subField)}
        />;
      case 2:
        return <MaterialsStep 
          isEntireHome={isEntireHome} 
          data={estimationData.materials}
          dimensionsData={estimationData.dimensions}
          onChange={(field, value, subField) => handleInputChange('materials', field, value, subField)}
        />;
      case 3:
        return <FinishesStep 
          isEntireHome={isEntireHome} 
          data={estimationData.finishes} 
          onChange={(field, value, subField) => handleInputChange('finishes', field, value, subField)}
        />;
      case 4:
        return <TimelineStep 
          data={estimationData.timeline} 
          onChange={(value) => setEstimationData(prev => ({ ...prev, timeline: value }))}
        />;
      case 5:
        return <FeaturesStep 
          isEntireHome={isEntireHome}
          data={estimationData.additionalFeatures} 
          onChange={(features) => setEstimationData(prev => ({ ...prev, additionalFeatures: features }))}
        />;
      case 6:
        return <ContactStep 
          data={estimationData.contactInfo} 
          onChange={(field, value) => handleInputChange('contactInfo', field, value)}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16 sm:pt-20">
      <div className="fluid-container fluid-py-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-4"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-800 text-sm sm:text-base order-2 sm:order-1"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </button>
            <div className="flex items-center order-1 sm:order-2">
              {isEntireHome ? <Home size={20} className="text-blue-600 mr-2 sm:size-6" /> : <ChefHat size={20} className="text-orange-600 mr-2 sm:size-6" />}
              <h1 className="fluid-text-2xl sm:fluid-text-3xl font-bold text-gray-900 text-center">
                {isEntireHome ? 'Entire Home' : 'Kitchen'} Estimation
              </h1>
            </div>
          </motion.div>
          
          {/* Progress Bar */}
          <div className="max-w-full sm:max-w-2xl mx-auto">
            <div className="flex justify-between mb-2 px-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                    i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {i + 1 <= currentStep ? <CheckCircle size={12} className="sm:size-4" /> : i + 1}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block text-center max-w-[80px]">
                    {['Dimensions', 'Materials', 'Finishes', 'Timeline', 'Features', 'Contact'][i]}
                  </span>
                  <span className="text-xs mt-1 block sm:hidden">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8"
            >
              {renderStepContent()}
              
              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 gap-4 sm:gap-0">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="responsive-button flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 order-2 sm:order-1"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </button>
                )}
                {currentStep < totalSteps && (
                  <button
                    onClick={handleNext}
                    className="responsive-button flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 order-1 sm:order-2 sm:ml-auto"
                  >
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                )}
                {currentStep === totalSteps && (
                  <button
                    onClick={handleSubmitEstimation}
                    disabled={isSubmitting || submitSuccess}
                    className={`responsive-button flex items-center justify-center text-white rounded-lg transition-colors duration-200 order-1 sm:order-2 sm:ml-auto ${
                      submitSuccess 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={16} className="mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : submitSuccess ? (
                      <>
                        <CheckCircle size={16} className="mr-2" />
                        Submitted Successfully!
                      </>
                    ) : (
                      <>
                        Get Final Quote
                        <CheckCircle size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
                >
                  <AlertCircle size={20} className="text-red-500 mr-3" />
                  <div>
                    <h4 className="font-semibold text-red-800">Submission Failed</h4>
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                </motion.div>
              )}
              
              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
                >
                  <CheckCircle size={20} className="text-green-500 mr-3" />
                  <div>
                    <h4 className="font-semibold text-green-800">Estimation Submitted Successfully!</h4>
                    <p className="text-sm text-green-600">We'll contact you soon with the detailed quote. Redirecting to home...</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Estimate Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <PricingCalculator 
                estimationData={estimationData}
                onPriceUpdate={(total, breakdown) => {
                  setTotalEstimate(total);
                  setBreakdown(breakdown);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step Components
const DimensionsStep = ({ isEntireHome, data, onChange }) => {
  const [customRooms, setCustomRooms] = useState(isEntireHome 
    ? ['living_room', 'kitchen', 'master_bedroom']
    : ['kitchen']);
  
  const [newRoomType, setNewRoomType] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const roomLabels = {
    living_room: 'Living Room',
    kitchen: 'Kitchen',
    master_bedroom: 'Master Bedroom',
    bedroom_2: 'Bedroom 2',
    bathroom_1: 'Bathroom 1',
    bathroom_2: 'Bathroom 2',
    home_office: 'Home Office',
    dining_room: 'Dining Room',
    balcony: 'Balcony',
    bedroom_3: 'Bedroom 3',
    bathroom_3: 'Bathroom 3'
  };

  const addNewRoom = () => {
    if (newRoomType && !customRooms.includes(newRoomType)) {
      setCustomRooms([...customRooms, newRoomType]);
      setNewRoomType('');
    } else if (newRoomName) {
      // Create a custom room ID based on the name
      const customRoomId = newRoomName.toLowerCase().replace(/\s+/g, '_');
      if (!customRooms.includes(customRoomId)) {
        // Add the custom room ID to the list
        setCustomRooms([...customRooms, customRoomId]);
        // Add the custom room label
        roomLabels[customRoomId] = newRoomName;
        setNewRoomName('');
      }
    }
  };

  const removeRoom = (roomToRemove) => {
    // Don't allow removing the kitchen for kitchen estimation
    if (!isEntireHome && roomToRemove === 'kitchen') return;
    
    // For entire home, allow removal of any room including the initial ones
    setCustomRooms(customRooms.filter(room => room !== roomToRemove));
  };

  return (
    <div>
      <h2 className="fluid-text-2xl font-bold mb-4 sm:mb-6 flex items-center">
        <Ruler className="mr-2 sm:mr-3 text-blue-600" size={20} />
        Room Dimensions
      </h2>
      <p className="fluid-text-base text-gray-600 mb-6 sm:mb-8">
        {isEntireHome 
          ? "We've started with the main rooms: Living Room, Kitchen, and Master Bedroom. You can remove any room you don't need or add additional rooms below. Enter dimensions to see the room visualizer."
          : "Enter the dimensions for your kitchen in feet."
        }
      </p>
      
      {/* Add Room Controls */}
      {isEntireHome && (
        <div className="mb-6 sm:mb-8 p-4 border border-dashed border-blue-300 rounded-lg bg-blue-50">
          <h3 className="fluid-text-lg font-semibold mb-3">Add a Room</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Room Type</label>
              <select
                value={newRoomType}
                onChange={(e) => setNewRoomType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="">Select a room type</option>
                <option value="bedroom_2">Bedroom 2</option>
                <option value="bedroom_3">Bedroom 3</option>
                <option value="bathroom_1">Bathroom 1</option>
                <option value="bathroom_2">Bathroom 2</option>
                <option value="bathroom_3">Bathroom 3</option>
                <option value="home_office">Home Office</option>
                <option value="dining_room">Dining Room</option>
                <option value="balcony">Balcony</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Or Custom Room Name</label>
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="e.g. Study Room"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={addNewRoom}
                className="w-full lg:w-auto responsive-button bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={!newRoomType && !newRoomName}
              >
                Add Room
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="responsive-grid">
        {customRooms.map(room => (
          <motion.div
            key={room}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h3 className="fluid-text-lg font-semibold">{roomLabels[room] || room}</h3>
              {isEntireHome && (
                <button 
                  onClick={() => removeRoom(room)}
                  className="text-red-500 hover:text-red-700 text-sm flex items-center self-start sm:self-center"
                >
                  <span className="mr-1">×</span>
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Length (ft)</label>
                <input
                  type="number"
                  value={data[room]?.length || ''}
                  onChange={(e) => onChange(room, e.target.value, 'length')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (ft)</label>
                <input
                  type="number"
                  value={data[room]?.width || ''}
                  onChange={(e) => onChange(room, e.target.value, 'width')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (ft)</label>
                <input
                  type="number"
                  value={data[room]?.height || ''}
                  onChange={(e) => onChange(room, e.target.value, 'height')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="9"
                />
              </div>
            </div>
            {data[room]?.length && data[room]?.width && (
              <div className="mt-3 text-sm text-gray-600">
                Area: {(parseFloat(data[room].length) * parseFloat(data[room].width)).toFixed(1)} sq ft
              </div>
            )}
            
            {/* Room Canvas - Only show when dimensions are entered */}
            {data[room]?.length && data[room]?.width && data[room]?.height ? (
              <div className="mt-4 sm:mt-6">
                <RoomCanvas
                  dimensions={data[room]}
                  roomType={room}
                  onDimensionChange={(field, value) => onChange(room, value, field)}
                />
              </div>
            ) : (
              <div className="mt-4 sm:mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                <div className="text-gray-500">
                  <Home size={20} className="mx-auto mb-2 text-gray-400 sm:size-6" />
                  <p className="text-sm">Enter all dimensions to see the room visualizer</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MaterialsStep = ({ isEntireHome, data, dimensionsData, onChange }) => {
  const quality = [
    { id: 'basic', name: 'Basic Quality', description: 'Standard workmanship' },
    { id: 'premium', name: 'Premium Quality', description: 'Enhanced finishing' },
    { id: 'luxury', name: 'Luxury Quality', description: 'Finest craftsmanship' }
  ];
  
  // Get all rooms from dimensions data for entire home
  const rooms = isEntireHome 
    ? Object.keys(dimensionsData || {})
    : ['kitchen'];
  
  const [selectedRoom, setSelectedRoom] = useState(rooms[0] || 'all');
  
  // Handle room selection change
  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };
  
  // Handle material change for specific room or all rooms
  const handleMaterialChange = (field, value) => {
    if (selectedRoom === 'all') {
      onChange(field, value);
    } else {
      onChange(selectedRoom, value, field);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Wrench className="mr-3 text-blue-600" />
        Materials & Quality
      </h2>
      
      {isEntireHome && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
          <select
            value={selectedRoom}
            onChange={handleRoomChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Rooms</option>
            {rooms.map(room => (
              <option key={room} value={room}>
                {room.includes('_') 
                  ? room.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                  : room.charAt(0).toUpperCase() + room.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="space-y-8">
        {/* Wood Type */}
        <MaterialSelector
          selectedMaterial={selectedRoom === 'all' ? data.wood : data[selectedRoom]?.wood}
          onMaterialChange={(value) => handleMaterialChange('wood', value)}
          category="wood"
          title="Wood Type"
        />

        {/* Hardware */}
        <MaterialSelector
          selectedMaterial={selectedRoom === 'all' ? data.hardware : data[selectedRoom]?.hardware}
          onMaterialChange={(value) => handleMaterialChange('hardware', value)}
          category="hardware"
          title="Hardware Quality"
        />

        {/* Quality Level */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Workmanship Quality</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quality.map(q => (
              <motion.div
                key={q.id}
                whileHover={{ scale: 1.02 }}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  (selectedRoom === 'all' ? data.quality : data[selectedRoom]?.quality) === q.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleMaterialChange('quality', q.id)}
              >
                <div className="text-center">
                  <h4 className="font-semibold mb-2">{q.name}</h4>
                  <p className="text-sm text-gray-600">{q.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FinishesStep = ({ isEntireHome, data, onChange }) => {
  // Get all rooms from dimensions data for entire home
  const rooms = isEntireHome 
    ? Object.keys(data.dimensions || {})
    : ['kitchen'];
  
  const [selectedRoom, setSelectedRoom] = useState(rooms[0] || 'all');
  
  // Handle room selection change
  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };
  
  // Handle finish change for specific room or all rooms
  const handleFinishChange = (value) => {
    if (selectedRoom === 'all') {
      onChange('finish', value);
    } else {
      onChange(selectedRoom, value, 'finish');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Palette className="mr-3 text-blue-600" />
        Finishes & Colors
      </h2>
      
      {isEntireHome && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
          <select
            value={selectedRoom}
            onChange={handleRoomChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Rooms</option>
            {rooms.map(room => (
              <option key={room} value={room}>
                {room.includes('_') 
                  ? room.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                  : room.charAt(0).toUpperCase() + room.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <MaterialSelector
        selectedMaterial={selectedRoom === 'all' ? data.finish : data[selectedRoom]?.finish}
        onMaterialChange={handleFinishChange}
        category="finishes"
        title="Surface Finishes"
      />
    </div>
  );
};

const TimelineStep = ({ data, onChange }) => {
  const timelines = [
    { id: 'immediate', name: 'Immediate', description: 'Start within 1 week', icon: '🚀' },
    { id: '1-month', name: '1 Month', description: 'Start within 4 weeks', icon: '📅' },
    { id: '3-months', name: '3 Months', description: 'Start within 12 weeks', icon: '⏰' },
    { id: 'flexible', name: 'Flexible', description: 'No rush, best price', icon: '🎯' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Clock className="mr-3 text-blue-600" />
        Project Timeline
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {timelines.map(timeline => (
          <motion.div
            key={timeline.id}
            whileHover={{ scale: 1.02 }}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              data === timeline.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onChange(timeline.id)}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">{timeline.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{timeline.name}</h4>
              <p className="text-gray-600">{timeline.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FeaturesStep = ({ isEntireHome, data, onChange }) => {
  const features = isEntireHome ? [
    { id: 'lighting', name: 'LED Lighting', price: '₹15,000', description: 'Ambient and task lighting' },
    { id: 'storage', name: 'Extra Storage', price: '₹25,000', description: 'Additional cabinets and shelving' },
    { id: 'automation', name: 'Home Automation', price: '₹50,000', description: 'Smart switches and controls' },
    { id: 'flooring', name: 'Premium Flooring', price: '₹80,000', description: 'Wooden or tile flooring' }
  ] : [
    { id: 'appliances', name: 'Kitchen Appliances', price: '₹1,50,000', description: 'Hob, chimney, oven package' },
    { id: 'backsplash', name: 'Designer Backsplash', price: '₹15,000', description: 'Tiles or glass backsplash' },
    { id: 'lighting', name: 'Under-cabinet Lighting', price: '₹8,000', description: 'LED strip lighting' },
    { id: 'accessories', name: 'Kitchen Accessories', price: '₹12,000', description: 'Organizers and fittings' }
  ];

  const handleFeatureToggle = (featureId) => {
    const newFeatures = data.includes(featureId)
      ? data.filter(f => f !== featureId)
      : [...data, featureId];
    onChange(newFeatures);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CheckCircle className="mr-3 text-blue-600" />
        Additional Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(feature => (
          <motion.div
            key={feature.id}
            whileHover={{ scale: 1.02 }}
            className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
              data.includes(feature.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleFeatureToggle(feature.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-lg">{feature.name}</h4>
              <span className="text-sm font-medium text-green-600">{feature.price}</span>
            </div>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded border-2 mr-2 ${
                data.includes(feature.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}>
                {data.includes(feature.id) && <CheckCircle size={16} className="text-white" />}
              </div>
              <span className="text-sm text-gray-600">
                {data.includes(feature.id) ? 'Included' : 'Add to project'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ContactStep = ({ data, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Mail className="mr-3 text-blue-600" />
        Contact Information
      </h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Your phone number"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={data.address || ''}
            onChange={(e) => onChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Your complete address"
          />
        </div>
      </div>
    </div>
  );
};

const EstimateSummary = ({ total, breakdown, isEntireHome }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
    >
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Calculator className="mr-2 text-blue-600" />
        Estimate Summary
      </h3>
      
      <div className="space-y-4 mb-6">
        {Object.entries(breakdown).map(([key, value]) => (
          key !== 'total' && (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600 capitalize">{key.replace('_', ' ')}</span>
              <span className="font-medium">₹{value.toLocaleString()}</span>
            </div>
          )
        ))}
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total Estimate</span>
          <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
        </div>
        
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <Download size={16} className="mr-2" />
            Download PDF
          </button>
          <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 flex items-center justify-center">
            <Share2 size={16} className="mr-2" />
            Share Estimate
          </button>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center">
            <Phone size={16} className="mr-2" />
            Call for Quote
          </button>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This is an estimated cost. Final pricing may vary based on site conditions and specific requirements.
        </p>
      </div>
    </motion.div>
  );
};

export default EstimationPage;