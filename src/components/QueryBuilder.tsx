import React, { useState } from 'react';
import { Rule } from '../types/query';
import { ruleToString } from '../utils/queryUtils';
import QueryFilter from './QueryFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import '../index.css';

const initialRule: Rule = { field: 'Theme', condition: 'Equals', criteria: 'Product Feedback', type: 'rule' };

const QueryBuilder: React.FC = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [rules, setRules] = useState<Rule[]>([initialRule]);
  const [conjunction, setConjunction] = useState<'&&' | '||'>('&&');
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], field: e.target.value as Rule['field'] };
    setRules(newRules);
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], condition: e.target.value as Rule['condition'] };
    setRules(newRules);
  };

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], criteria: e.target.value as Rule['criteria'] };
    setRules(newRules);
  };

  const handleAddFilter = () => {
    setRules([...rules, initialRule]);
  };

  const handleDeleteFilter = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleConjunctionChange = () => {
    setConjunction(conjunction === '&&' ? '||' : '&&');
  };

  const copyToClipboard = () => {
    const queryString = rules.map(rule => ruleToString(rule)).join(` ${conjunction} `);
    navigator.clipboard.writeText(queryString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const queryString = rules.map(rule => ruleToString(rule)).join(` ${conjunction} `);

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      {!showBuilder ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl mb-4">Welcome to the Query Builder</h1>
          <p className="text-lg mb-8">Easily build complex queries for your analytics platform</p>
          <button
            onClick={() => setShowBuilder(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Build Query
          </button>
        </div>
      ) : (
        <>
          {rules.map((rule, index) => (
            <QueryFilter
              key={index}
              rule={rule}
              onFieldChange={handleFieldChange}
              onConditionChange={handleConditionChange}
              onCriteriaChange={handleCriteriaChange}
              onDelete={handleDeleteFilter}
              index={index}
            />
          ))}
          <button
            onClick={handleAddFilter}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            + Add Filter
          </button>
          <div className="mb-4">
            <label className="block text-sm font-medium">Conjunction</label>
            <div className="flex items-center mt-1">
              <button
                className={`px-4 py-2 rounded-md ${conjunction === '&&' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                onClick={handleConjunctionChange}
              >
                AND
              </button>
              <button
                className={`ml-2 px-4 py-2 rounded-md ${conjunction === '||' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                onClick={handleConjunctionChange}
              >
                OR
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <strong className="mr-2">Query:</strong> 
            <span className="mr-2">{queryString}</span>
            <button onClick={copyToClipboard} className="p-2 border border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faCopy}/>
            </button>
          </div>
          {copied && <p className="text-green-500 mt-2">Query copied to clipboard!</p>}
        </>
      )}
    </div>
  );
};

export default QueryBuilder;
