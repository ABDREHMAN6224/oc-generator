import React from 'react';
import { ContractData } from '../types/contract';  
import {  generateLatexCode } from '../utils/contractTemplate';

interface Props {
  data: ContractData;
}

const LatexExport: React.FC<Props> = ({ data }) => {
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
    <div className="border rounded p-4">
      <h2 className="text-xl font-bold mb-4">LaTeX Export</h2>
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download LaTeX Code
      </button>
      <pre className="mt-4 p-4 bg-gray-100 rounded overflow-x-auto">
        <code>{generateLatexCode(data)}</code>
      </pre>
    </div>
  );
}

export default LatexExport;