import React from 'react';
import { Rule } from '../types/query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface QueryFilterProps {
  rule: Rule;
  onFieldChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void;
  onConditionChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void;
  onCriteriaChange: (e: React.ChangeEvent<HTMLSelectElement>, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

const QueryFilter: React.FC<QueryFilterProps> = ({ rule, onFieldChange, onConditionChange, onCriteriaChange, onDelete, index }) => {
  return (
    <div className="flex items-center mb-4 space-x-2">
      <div className="flex flex-col">
        <label className="text-sm font-medium">Field</label>
        <select value={rule.field} onChange={(e) => onFieldChange(e, index)} className="p-2 border border-gray-300 rounded-md">
          <option value="Theme">Theme</option>
          <option value="Sub-theme">Sub-theme</option>
          <option value="Reason">Reason</option>
          <option value="Language">Language</option>
          <option value="Source">Source</option>
          <option value="Rating">Rating</option>
          <option value="Time Period">Time Period</option>
          <option value="Customer ID">Customer ID</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Condition</label>
        <select value={rule.condition} onChange={(e) => onConditionChange(e, index)} className="p-2 border border-gray-300 rounded-md">
          <option value="Equals">Equals</option>
          <option value="Does not equal">Does not equal</option>
          <option value="Like">Like</option>
          <option value="Not like">Not like</option>
          <option value="Is Empty">Is Empty</option>
          <option value="Is">Is</option>
          <option value="Is not">Is not</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Criteria</label>
        <select value={rule.criteria} onChange={(e) => onCriteriaChange(e, index)} className="p-2 border border-gray-300 rounded-md">
          <option value="Offers">Offers</option>
          <option value="Performance">Performance</option>
          <option value="Platform">Platform</option>
          <option value="Product Feedback">Product Feedback</option>
        </select>
      </div>
      <button onClick={() => onDelete(index)} className="p-2 border border-gray-300 rounded-md text-red-500">
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
};

export default QueryFilter;
