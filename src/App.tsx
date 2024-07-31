import React from 'react';
import QueryBuilder from './components/QueryBuilder';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Query Builder</h1>
      <QueryBuilder />
    </div>
  );
};

export default App;
