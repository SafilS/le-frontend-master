import { useState, useEffect } from 'react';
import { Loader, CheckCircle, Phone, Mail, User, Lock } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FingerprintJS from '@fingerprintjs/fingerprintjs';


const Form = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'full-home',
    otp: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);

  // Handle OTP countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);


  const getBrowserData = async () => ({
    userAgent: navigator.userAgent,
    language: navigator.language,
  });

  const getClientId = async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  };


  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // if (!formData.email.trim()) {
    //   newErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = 'Please enter a valid email';
    // }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }


    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{4}$/.test(formData.otp)) {
      newErrors.otp = 'Please enter a valid 4-digit OTP';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone input, allow only numbers
    if (name === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        setFormData({
          ...formData,
          [name]: cleaned
        });
      }
      return;
    }
    
    // For OTP input, allow only numbers and max 4 digits
    if (name === 'otp') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 4) {
        setFormData({
          ...formData,
          [name]: cleaned
        });
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const extractPhoneNumber = (phone) => {
    // Assuming country code +91 (India)
    // Example: "+919876543210" → "9876543210"
    return phone.replace(/^(\+91|91)/, '');
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();

    if (!validateStep1()) return;

    setIsLoading(true);

    const userBrowserData = await getBrowserData();
    const fingerprint = await getClientId();
    const rawPhone = formData.phone;
    const cleanedPhone = extractPhoneNumber(rawPhone);

    try {
      const res = await fetch('https://le-crown-interiors-backend.onrender.com/otp/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userBrowserData,
          fingerprint,
          phoneNumber: cleanedPhone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2);
        setCountdown(30);
      }

      console.log(data.message); // You may want to show this to the user
    } catch (err) {
      console.error("OTP Send Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    if (!formData.otp) return;

      setIsLoading(true);

      const fingerprint = await getClientId();

      try {
        const res = await fetch('https://le-crown-interiors-backend.onrender.com/otp/verifyotp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            otp: formData.otp,
            fingerprint,
            phoneNumber: extractPhoneNumber(formData.phone),
          }),
        });

        const data = await res.json();

        if (res.ok && data.message === "OTP verified successfully") {
          console.log("OTP Verified");
          setStep(3); // ✅ Ensure this is called
        } else {
          console.warn("OTP verification failed", data.message);
        }
      } catch (err) {
        console.error("OTP verify error:", err.message);
      } finally {
        setIsLoading(false);
      }
  };


  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsLoading(true);

    const userBrowserData = await getBrowserData();
    const fingerprint = await getClientId();

    try {
      const res = await fetch('https://le-crown-interiors-backend.onrender.com/otp/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userBrowserData,
          fingerprint,
          phoneNumber: formData.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCountdown(30);
      }

      console.log(data.message);
    } catch (err) {
      console.error("Resend OTP Error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleNewRequest = () => {
    setStep(1);
    setIsVerified(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'full-home',
      otp: ''
    });
    setErrors({});
  };

  // Format phone number for display
  const formatPhoneForDisplay = (phone) => {
    if (!phone) return '';
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
    return numbers;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {step === 1 && "Request a Free Consultation"}
          {step === 2 && "Verify Your Phone"}
          {step === 3 && "Request Submitted"}
        </h2>
        
        {step !== 3 && (
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {step === 1 && "Fill the form below to get started with your interior design journey"}
            {step === 2 && "Enter the verification code sent to your phone"}
          </p>
        )}
      </div>
      
      {step === 1 && (
        <form onSubmit={handleSubmitStep1}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base`}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500" id="name-error">{errors.name}</p>
            )}
          </div>
          
          {/* <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base`}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500" id="email-error">{errors.email}</p>
            )}
          </div> */}
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <PhoneInput
                country={'in'} // default country
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputProps={{
                  name: 'phone',
                  required: true,
                  className: `w-full pl-12 pr-4 py-2 sm:py-3 rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base`,
                  id: 'phone',
                }}
                containerStyle={{ width: '100%' }}
                inputStyle={{
                  width: '100%',
                  paddingLeft: '48px', // account for flag space
                }}
              />

            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500" id="phone-error">{errors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
              Residential Pincode
            </label>
            <div className="relative">
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter 6-digit pincode"
                className={`w-full pl-4 pr-4 py-2 sm:py-3 rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base`}
                maxLength={6}
                inputMode="numeric"
                aria-invalid={errors.pincode ? "true" : "false"}
              />
            </div>
            {errors.pincode && (
              <p className="mt-1 text-xs text-red-500" id="pincode-error">{errors.pincode}</p>
            )}
          </div>

          
          <div className="mb-5 sm:mb-6">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service Interested In
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            >
              <option value="full-home">Full Home Design</option>
              <option value="kitchen">Kitchen Design</option>
              <option value="bathroom">Bathroom Design</option>
              <option value="living-room">Living Room Design</option>
              <option value="bedroom">Bedroom Design</option>
              <option value="other">Other</option>
              <option value="none">None</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-3 rounded-md font-medium flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              'Get Free Consultation'
            )}
          </button>
          
          <p className="mt-4 text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      )}
      
      {step === 2 && (
        <form onSubmit={handleSubmitStep2}>
          <div className="mb-4 text-center">
            <p className="text-gray-700 text-sm sm:text-base">
              We've sent a 4-digit OTP to <span className="font-medium">{formatPhoneForDisplay(formData.phone)}</span>
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter 4-digit OTP"
                className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-md border ${errors.otp ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base text-center tracking-wider`}
                maxLength={4}
                inputMode="numeric"
                aria-invalid={errors.otp ? "true" : "false"}
              />
            </div>
            {errors.otp && (
              <p className="mt-1 text-xs text-red-500" id="otp-error">{errors.otp}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || isVerified}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-3 rounded-md font-medium flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin mr-2" />
                Verifying...
              </>
            ) : isVerified ? (
              <>
                <CheckCircle size={18} className="mr-2" />
                Verified!
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isLoading || countdown > 0}
              className={`text-sm font-medium focus:outline-none ${
                countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-amber-600 hover:text-amber-700'
              }`}
            >
              {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Go back and edit details
            </button>
          </div>
        </form>
      )}
      
      {step === 3 && (
        <div className="text-center py-6">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-green-500" />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">
            Our design consultant will contact you shortly to discuss your interior design needs.
          </p>
          <button
            type="button"
            onClick={handleNewRequest}
            className="px-6 py-2 sm:py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            Submit Another Request
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;