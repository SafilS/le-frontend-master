import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check,
  CheckCircle,
  ChefHat
} from 'lucide-react';

const KitchenEstimation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
  
  const [formData, setFormData] = useState({
    kitchenType: '',
    quality: '',
    estimatedCost: { min: 0, max: 0 }
  });

  // Kitchen types with their respective images and pricing multipliers
  const kitchenTypes = [
    {
      id: 'straight',
      label: 'Straight Kitchen',
      image: '/assets/images/kitchen/k1.png',
      description: 'Perfect for narrow spaces',
      multiplier: 1.0
    },
    {
      id: 'lshaped',
      label: 'L-Shaped Kitchen',
      image: '/assets/images/kitchen/Lshape.png',
      description: 'Great corner utilization',
      multiplier: 1.3
    },
    {
      id: 'ushaped',
      label: 'U-Shaped Kitchen',
      image: '/assets/images/kitchen/Ushape.png',
      description: 'Maximum storage & workspace',
      multiplier: 1.6
    },
    {
      id: 'parallel',
      label: 'Parallel Kitchen',
      image: '/assets/images/kitchen/parallel.png',
      description: 'Efficient galley layout',
      multiplier: 1.4
    }
  ];

  // Base pricing for different kitchen types and qualities
  const basePricing = {
    straight: { basic: { min: 1.5, max: 2.5 }, premium: { min: 3.0, max: 5.0 } },
    lshaped: { basic: { min: 2.0, max: 3.5 }, premium: { min: 4.0, max: 6.5 } },
    ushaped: { basic: { min: 2.5, max: 4.0 }, premium: { min: 5.0, max: 8.0 } },
    parallel: { basic: { min: 2.2, max: 3.8 }, premium: { min: 4.5, max: 7.0 } }
  };

  const handleKitchenTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, kitchenType: type }));
  };

  const handleQualitySelect = (quality) => {
    setFormData(prev => ({ ...prev, quality }));
  };

  const calculateEstimate = () => {
    if (formData.kitchenType && formData.quality) {
      const pricing = basePricing[formData.kitchenType][formData.quality];
      setFormData(prev => ({
        ...prev,
        estimatedCost: pricing
      }));
    }
  };

  useEffect(() => {
    if (formData.kitchenType && formData.quality) {
      calculateEstimate();
    }
  }, [formData.kitchenType, formData.quality]);

  const nextStep = () => {
    if (currentStep === 2 && formData.kitchenType && formData.quality) {
      setIsLoadingEstimate(true);
      setTimeout(() => {
        setIsLoadingEstimate(false);
        setCurrentStep(3);
      }, 2000);
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isNextButtonDisabled = () => {
    if (currentStep === 1) {
      return !formData.kitchenType;
    }
    if (currentStep === 2) {
      return !formData.quality;
    }
    return false;
  };

  const renderStepIndicators = () => {
    return (
      <div className="flex justify-center items-center mb-4 sm:mb-6">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium sm:w-8 sm:h-8 sm:text-sm ${currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {currentStep > step ? <Check size={12} className="sm:w-4 sm:h-4" /> : step}
            </div>
            {step < 3 && (
              <div 
                className={`w-8 h-0.5 sm:w-12 sm:h-1 ${currentStep > step ? 'bg-orange-500' : 'bg-gray-200'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderKitchenTypeSelection = () => {
    return (
      <div className="text-center">
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto sm:grid-cols-2 sm:gap-6 sm:max-w-2xl">
          {kitchenTypes.map((type) => (
            <div 
              key={type.id} 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${formData.kitchenType === type.id ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
              onClick={() => handleKitchenTypeSelect(type.id)}
            >
              <div className="mb-3">
                <img 
                  src={type.image} 
                  alt={type.label} 
                  className="w-full h-32 object-cover rounded-md sm:h-40"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-32 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-md hidden items-center justify-center sm:h-40"
                >
                  <span className="text-gray-700 font-medium text-sm">{type.label}</span>
                </div>
              </div>
              <h3 className="text-base font-semibold mb-1 sm:text-lg">{type.label}</h3>
              <p className="text-gray-600 text-xs sm:text-sm">{type.description}</p>
            </div>
          ))}
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
              className={`block border-2 rounded-lg p-3 cursor-pointer transition-all sm:p-4 ${formData.quality === 'basic' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="mb-2 sm:mb-3">
                <img 
                  src="/assets/images/kitchen/modern.png" 
                  alt="Basic Kitchen" 
                  className="w-full h-24 object-cover rounded-md sm:h-32"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-24 bg-gray-200 rounded-md hidden items-center justify-center sm:h-32"
                >
                  <span className="text-gray-500 text-xs sm:text-sm">Basic Kitchen</span>
                </div>
              </div>
              <h3 className="text-base font-semibold mb-1 sm:text-lg sm:mb-2">Basic (₹₹)</h3>
              <p className="text-gray-600 mb-2 text-xs sm:text-sm sm:mb-3">Standard finishes with essential functionality</p>
              <ul className="text-xs text-left space-y-0.5 sm:space-y-1">
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Standard materials</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Basic hardware</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Essential storage</li>
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
              className={`block border-2 rounded-lg p-3 cursor-pointer transition-all sm:p-4 ${formData.quality === 'premium' ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="mb-2 sm:mb-3">
                <img 
                  src="/assets/images/kitchen/luxisland.png" 
                  alt="Premium Kitchen" 
                  className="w-full h-24 object-cover rounded-md sm:h-32"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-24 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-md hidden items-center justify-center sm:h-32"
                >
                  <span className="text-gray-700 font-medium text-xs sm:text-sm">Premium Kitchen</span>
                </div>
              </div>
              <h3 className="text-base font-semibold mb-1 sm:text-lg sm:mb-2">Premium (₹₹₹₹)</h3>
              <p className="text-gray-600 mb-2 text-xs sm:text-sm sm:mb-3">High-quality finishes with premium features</p>
              <ul className="text-xs text-left space-y-0.5 sm:space-y-1">
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Premium materials</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Designer hardware</li>
                <li className="flex items-center"><CheckCircle size={12} className="text-green-500 mr-2 flex-shrink-0 sm:w-3.5 sm:h-3.5" /> Smart storage solutions</li>
              </ul>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderCostEstimation = () => {
    const selectedType = kitchenTypes.find(type => type.id === formData.kitchenType);
    
    return (
      <div className="text-center">
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto mb-4 sm:p-6 sm:max-w-md sm:mb-6">
          <h3 className="text-2xl font-bold text-orange-500 mb-2 sm:text-3xl">
            ₹{formData.estimatedCost.min}L - ₹{formData.estimatedCost.max}L*
          </h3>
          <p className="text-gray-500 text-xs mb-4 sm:text-sm sm:mb-6">*Estimated cost range for your kitchen</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4 sm:gap-4 sm:mb-6">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1 sm:text-sm">Kitchen Type</div>
              <div className="font-medium text-sm sm:text-base">
                {selectedType?.label}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1 sm:text-sm">Quality</div>
              <div className="font-medium capitalize text-sm sm:text-base">{formData.quality}</div>
            </div>
          </div>
          
          <div className="mb-4 border-t border-gray-100 pt-3 sm:mb-6 sm:pt-4">
            <div className="text-xs text-gray-500 mb-2 sm:text-sm">Includes</div>
            <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span>Cabinets & Storage:</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Countertop:</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Hardware & Fittings:</span>
                <span className="font-medium">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Installation:</span>
                <span className="font-medium">✓</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-sm mx-auto grid grid-cols-2 gap-3 text-center sm:max-w-md sm:grid-cols-4 sm:gap-4">
          {['Free Design', 'Quality Materials', 'Expert Team', 'Warranty'].map((feature, index) => (
            <div key={index} className="p-2 sm:p-3">
              <div className="w-8 h-8 mx-auto mb-1 flex items-center justify-center bg-orange-100 rounded-full sm:w-10 sm:h-10 sm:mb-2">
                <span className="text-orange-500 font-bold text-sm sm:text-base">✓</span>
              </div>
              <div className="text-xs font-medium">{feature}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLoader = () => {
    return (
      <div className="flex flex-col items-center justify-center h-80 sm:h-96">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin sm:w-16 sm:h-16"></div>
        </div>
        <div className="mt-4 text-center sm:mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:text-xl">Calculating Your Kitchen Estimate</h3>
          <p className="text-gray-600 text-sm sm:text-base px-4">Please wait while we prepare your personalized quote...</p>
        </div>
        <div className="mt-3 flex space-x-1 sm:mt-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
        return renderKitchenTypeSelection();
      case 2:
        return renderQualitySelection();
      case 3:
        return renderCostEstimation();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Container - Mobile first approach */}
      <div className="mx-auto px-3 pt-20 pb-20 sm:px-4 sm:pt-24 sm:pb-24 md:pt-32 md:pb-24 md:max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={() => navigate('/')}
              className="absolute left-3 sm:left-4 flex items-center text-gray-600 hover:text-gray-800 text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="mr-1 sm:w-5 sm:h-5" />
              Back
            </button>
            <ChefHat size={24} className="text-orange-500 mr-2 sm:w-8 sm:h-8" />
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
              Kitchen Estimation
            </h1>
          </div>
        </div>

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
                  <p className="text-gray-500 text-sm sm:text-base">Calculating your personalized kitchen estimate...</p>
                </div>
              ) : (
                <>
                  {currentStep === 1 && (
                    <>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">Select your kitchen layout</h2>
                      <p className="text-gray-500 text-sm sm:text-base">Choose the layout that best fits your space</p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">Choose your quality level</h2>
                      <p className="text-gray-500 text-sm sm:text-base">Select the quality that matches your preference</p>
                    </>
                  )}
                  {currentStep === 3 && (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:w-16 sm:h-16 sm:mb-4">
                        <CheckCircle size={24} className="text-green-500 sm:w-8 sm:h-8" />
                      </div>
                      <h2 className="text-xl font-bold mb-2 sm:text-2xl">Here's your kitchen estimate</h2>
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
      {!isLoadingEstimate && currentStep < 3 && (
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
            
            <button 
              onClick={nextStep}
              className={`px-6 py-2.5 rounded-md transition-colors flex items-center font-medium text-sm sm:px-8 sm:py-3 sm:text-base ${
                isNextButtonDisabled() 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'
              }`}
              disabled={isNextButtonDisabled()}
            >
              Next
              <ArrowRight size={14} className="ml-1 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenEstimation;