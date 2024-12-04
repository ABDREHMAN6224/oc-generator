import React from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ListInputProps {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

const ListInput: React.FC<ListInputProps> = ({ items, onChange, placeholder }) => {
  const addItem = () => {
    onChange([...items, '']);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => removeItem(index)}
            className="p-2 text-red-500 hover:text-red-700"
            aria-label="Remove item"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Item</span>
      </button>
    </div>
  );
};

export default ListInput;