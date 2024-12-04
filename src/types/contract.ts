export interface ContractData {
  contractNumber: string;
  title: string;
  operation: {
    name: string;
    parameters: string[];
  };
  crossReferences: string[];
  preconditions: string[];
  postconditions: string[];
}