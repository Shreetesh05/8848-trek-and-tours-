import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

export interface BookingFormData {
  firstName: string;
  lastName: string;
  address: string;
  numberOfPax: number;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
  travelDate: string;
  remarks: string;
}

interface BookNowFormProps {
  packageTitle?: string;
  onSubmitSuccess?: (data: BookingFormData) => void;
  onClose?: () => void;
}

// ---------- EmailJS Configuration (OPTIONAL) ----------
// Set to true to actually send emails (requires valid keys below)
const USE_REAL_EMAIL = false;  // ← CHANGE TO true AFTER setting up EmailJS
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const ADMIN_EMAIL = 'shreetesh032@gmail.com';

const BookNowForm = ({ packageTitle, onSubmitSuccess, onClose }: BookNowFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    address: '',
    numberOfPax: 1,
    dateOfBirth: '',
    passportNumber: '',
    nationality: '',
    travelDate: '',
    remarks: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.numberOfPax || formData.numberOfPax < 1) newErrors.numberOfPax = 'At least 1 person';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.travelDate) newErrors.travelDate = 'Travel date is required';

    const today = new Date().toISOString().split('T')[0];
    if (formData.dateOfBirth && formData.dateOfBirth >= today) {
      newErrors.dateOfBirth = 'Date of birth must be in the past';
    }
    if (formData.travelDate && formData.travelDate < today) {
      newErrors.travelDate = 'Travel date must be today or later';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- Email Sending (Mock or Real) ----------
  const sendBookingEmail = async (data: BookingFormData): Promise<boolean> => {
    if (!USE_REAL_EMAIL) {
      console.log('Mock email sent (real email disabled):', data);
      return true; // Always succeeds in mock mode
    }

    try {
      const templateParams = {
        to_email: ADMIN_EMAIL,
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        pax: data.numberOfPax,
        dob: data.dateOfBirth,
        passport: data.passportNumber,
        nationality: data.nationality,
        travel_date: data.travelDate,
        remarks: data.remarks || 'None',
        package: packageTitle || 'Not specified',
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  // ---------- Submit Handler – Always navigates, email is optional ----------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    
    // Try to send email, but don't block navigation if it fails
    const emailSent = await sendBookingEmail(formData);
    
    if (!emailSent && USE_REAL_EMAIL) {
      toast.error('Booking saved but email notification failed. Please contact support.', {
        duration: 4000,
      });
    } else {
      toast.success('Booking confirmed! Redirecting to payment...', {
        duration: 2000,
      });
    }

    onSubmitSuccess?.(formData);
    
    // Always navigate after a short delay (so toast is visible)
    setTimeout(() => {
      navigate('/payment', { state: { bookingData: formData } });
    }, 1500);
    
    setIsSending(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-6 md:p-8">
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Book Your Adventure</h2>
          {packageTitle && (
            <p className="text-blue-600 font-medium mt-1">
              Package: <span className="font-semibold">{packageTitle}</span>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Same form fields as before – unchanged */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.firstName ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                placeholder="John"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.lastName ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>

            {/* Address (full width) */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.address ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                placeholder="Street, City, Country"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Number of Pax */}
            <div>
              <label htmlFor="numberOfPax" className="block text-sm font-semibold text-gray-700 mb-1">
                Number of Pax <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="numberOfPax"
                name="numberOfPax"
                min="1"
                max="20"
                value={formData.numberOfPax}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.numberOfPax ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
              />
              {errors.numberOfPax && <p className="mt-1 text-sm text-red-600">{errors.numberOfPax}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.dateOfBirth ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
              />
              {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
            </div>

            {/* Passport Number */}
            <div>
              <label htmlFor="passportNumber" className="block text-sm font-semibold text-gray-700 mb-1">
                Passport Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.passportNumber ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                placeholder="P12345678"
              />
              {errors.passportNumber && <p className="mt-1 text-sm text-red-600">{errors.passportNumber}</p>}
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-semibold text-gray-700 mb-1">
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.nationality ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
                placeholder="e.g. American, Nepali"
              />
              {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
            </div>

            {/* Travel Date */}
            <div>
              <label htmlFor="travelDate" className="block text-sm font-semibold text-gray-700 mb-1">
                Travel Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.travelDate ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition`}
              />
              {errors.travelDate && <p className="mt-1 text-sm text-red-600">{errors.travelDate}</p>}
            </div>

            {/* Remarks */}
            <div className="md:col-span-2">
              <label htmlFor="remarks" className="block text-sm font-semibold text-gray-700 mb-1">
                Remarks / Special Requests
              </label>
              <textarea
                id="remarks"
                name="remarks"
                rows={3}
                value={formData.remarks}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-y"
                placeholder="Any dietary restrictions, accommodation preferences, etc."
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSending}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookNowForm;