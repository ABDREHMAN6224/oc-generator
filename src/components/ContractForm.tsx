import React, { useState } from 'react';
import { ContractData } from '../types/contract';
import ContractPreview from './ContractPreview';
import FormSection from './FormSection';
import ListInput from './ListInput';

const ContractForm: React.FC = () => {
  const [contractData, setContractData] = useState<ContractData>({
    contractNumber: '',
    title: '',
    operation: {
      name: '',
      parameters: []
    },
    crossReferences: [],
    preconditions: [],
    postconditions: []
  });

  const handleInputChange = (field: keyof ContractData, value: any) => {
    setContractData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Operation Contract Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FormSection title="Basic Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Number
                </label>
                <input
                  type="text"
                  value={contractData.contractNumber}
                  onChange={(e) => handleInputChange('contractNumber', e.target.value)}
                  placeholder="e.g., C20"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={contractData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Stripe Payment Integration"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Operation">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operation Name
                </label>
                <input
                  type="text"
                  value={contractData.operation.name}
                  onChange={(e) => handleInputChange('operation', {
                    ...contractData.operation,
                    name: e.target.value
                  })}
                  placeholder="e.g., processPayment"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parameters
                </label>
                <ListInput
                  items={contractData.operation.parameters}
                  onChange={(parameters) => handleInputChange('operation', {
                    ...contractData.operation,
                    parameters
                  })}
                  placeholder="e.g., cardNumber"
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Cross References">
            <ListInput
              items={contractData.crossReferences}
              onChange={(crossReferences) => handleInputChange('crossReferences', crossReferences)}
              placeholder="e.g., Use Cases: F20"
            />
          </FormSection>

          <FormSection title="Preconditions">
            <ListInput
              items={contractData.preconditions}
              onChange={(preconditions) => handleInputChange('preconditions', preconditions)}
              placeholder="Enter a precondition"
            />
          </FormSection>

          <FormSection title="Postconditions">
            <ListInput
              items={contractData.postconditions}
              onChange={(postconditions) => handleInputChange('postconditions', postconditions)}
              placeholder="Enter a postcondition"
            />
          </FormSection>
        </div>

        <div className="space-y-6">
          <ContractPreview data={contractData} />
        </div>
      </div>
    </div>
  );
}

export default ContractForm;