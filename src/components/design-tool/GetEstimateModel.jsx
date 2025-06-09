import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const GetEstimatePage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    propertyType: '',
    rooms: [],
    budget: '',
    timeline: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleRoomSelection = (room) => {
    const newRooms = formData.rooms.includes(room)
      ? formData.rooms.filter(r => r !== room)
      : [...formData.rooms, room];
    
    setFormData({ ...formData, rooms: newRooms });
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit phone';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter valid email';
    } else if (step === 2) {
      if (!formData.city) newErrors.city = 'Please select your city';
      if (!formData.propertyType) newErrors.propertyType = 'Please select property type';
    } else if (step === 3) {
      if (formData.rooms.length === 0) newErrors.rooms = 'Select at least one room';
    } else if (step === 4) {
      if (!formData.budget) newErrors.budget = 'Please select your budget';
      if (!formData.timeline) newErrors.timeline = 'Please select your timeline';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 5) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="10-digit mobile number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Property Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Select City*</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.city ? 'border-red-500' : ''}`}
              >
                <option value="">Select your city</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
                <option value="pune">Pune</option>
                <option value="other">Other</option>
              </select>
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Type*</label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Apartment', 'Independent House', 'Villa', 'Office Space'].map((type) => (
                  <div 
                    key={type}
                    onClick={() => setFormData({ ...formData, propertyType: type })}
                    className={`flex items-center justify-center p-6 border rounded-lg cursor-pointer transition-colors ${
                      formData.propertyType === type 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-center text-sm font-medium">{type}</span>
                  </div>
                ))}
              </div>
              {errors.propertyType && <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Select Areas to Renovate</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Choose Rooms*</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Kitchen', 'Living Room', 'Master Bedroom', 'Bedroom', 
                  'Bathroom', 'Home Office', 'Dining Area', 'Wardrobe'
                ].map((room) => (
                  <div 
                    key={room}
                    onClick={() => handleRoomSelection(room)}
                    className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.rooms.includes(room) 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-center text-sm font-medium">{room}</span>
                  </div>
                ))}
              </div>
              {errors.rooms && <p className="mt-1 text-sm text-red-600">{errors.rooms}</p>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Budget & Timeline</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Budget Range*</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.budget ? 'border-red-500' : ''}`}
              >
                <option value="">Select budget range</option>
                <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
                <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
                <option value="₹10-15 Lakhs">₹10-15 Lakhs</option>
                <option value="₹15-20 Lakhs">₹15-20 Lakhs</option>
                <option value="Above ₹20 Lakhs">Above ₹20 Lakhs</option>
              </select>
              {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Timeline*</label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Immediate', '1-3 Months', '3-6 Months', 'Not Sure'].map((time) => (
                  <div 
                    key={time}
                    onClick={() => setFormData({ ...formData, timeline: time })}
                    className={`flex items-center justify-center p-6 border rounded-lg cursor-pointer transition-colors ${
                      formData.timeline === time 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-center text-sm font-medium">{time}</span>
                  </div>
                ))}
              </div>
              {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Get Your Free Estimate</h1>
          <p className="mt-2 text-gray-600">Fill out the form below and our design expert will contact you within 24 hours.</p>
        </div>

        {isSubmitted ? (
          // Success message
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check size={24} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your estimate request has been submitted successfully. Our design expert will contact you within 24 hours.
            </p>
            <a 
              href="/" 
              className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition-colors font-medium"
            >
              Back to Home
            </a>
          </div>
        ) : (
          // Form
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Progress Steps */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex justify-between">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        s === step
                          ? 'bg-red-500 text-white'
                          : s < step
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s < step ? <Check size={16} /> : s}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">
                      {s === 1 ? 'Contact' : s === 2 ? 'Property' : s === 3 ? 'Rooms' : 'Budget'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`ml-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${step === 1 ? 'w-full' : ''}`}
                  >
                    Next
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetEstimatePage;