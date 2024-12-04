import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
};

export default FormSection;