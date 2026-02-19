import { useState } from 'react';
import type { FormEvent } from 'react';

// ---------- Type Definitions ----------
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
  /** Optional package details to display context */
  packageTitle?: string;
  /** Called after successful validation (you can replace with API call) */
  onSubmitSuccess?: (data: BookingFormData) => void;
  /** Called to close the modal */
  onClose?: () => void;
}

const BookNowForm = ({ packageTitle, onSubmitSuccess, onClose }: BookNowFormProps) => {
  // ---------- Form State ----------
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

  // ---------- Validation Errors State ----------
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

  // ---------- Handle Input Changes ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof BookingFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // ---------- Validation ----------
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

    // Validate dates: date of birth should be in the past, travel date in the future
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

  // ---------- Submit Handler ----------
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would send the data to your backend
      console.log('Booking submitted:', formData);
      onSubmitSuccess?.(formData);
      // Optionally close modal after success
      onClose?.();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl max-w-3xl mx-auto p-6 md:p-8">
      {/* Header with package context */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Book Your Adventure
        </h2>
        {packageTitle && (
          <p className="text-blue-600 font-medium mt-1">
            Package: <span className="font-semibold">{packageTitle}</span>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* 2-column layout on medium screens and up */}
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

          {/* Citizen / Nationality */}
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

          {/* Remarks (full width) */}
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

        {/* Action Buttons */}
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
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookNowForm;