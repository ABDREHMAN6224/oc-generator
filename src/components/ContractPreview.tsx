import React from 'react';
import { ContractData } from '../types/contract';
import { generateLatexCode } from '../utils/contractTemplate';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface Props {
  data: ContractData;
}

const ContractPreview: React.FC<Props> = ({ data }) => {
  const handleDownload = () => {
    const latex = generateLatexCode(data);
    const blob = new Blob([latex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract_${data.contractNumber}.tex`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Contract Preview
          </h2>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            Download LaTeX
          </button>
        </div>
        
        <div className="prose max-w-none">
          <h3 className="text-xl font-bold mb-4">
            {data.contractNumber ? `Contract ${data.contractNumber}${data.title ? ': ' + data.title : ''}` : 'New Contract'}
          </h3>
          
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-3 pr-4 font-semibold align-top whitespace-nowrap">Operation:</td>
                <td className="py-3">
                  {data.operation.name}
                  {data.operation.parameters.length > 0 && 
                    `(${data.operation.parameters.join(', ')})`
                  }
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4 font-semibold align-top whitespace-nowrap">Cross References:</td>
                <td className="py-3">
                  {data.crossReferences.join(', ') || '-'}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4 font-semibold align-top whitespace-nowrap">Preconditions:</td>
                <td className="py-3">
                  {data.preconditions.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {data.preconditions.map((pre, idx) => (
                        <li key={idx}>{pre}</li>
                      ))}
                    </ul>
                  ) : '-'}
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-4 font-semibold align-top whitespace-nowrap">Postconditions:</td>
                <td className="py-3">
                  {data.postconditions.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {data.postconditions.map((post, idx) => (
                        <li key={idx}>{post}</li>
                      ))}
                    </ul>
                  ) : '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContractPreview;