import React from 'react';
import ApiTest from '../components/estimation/ApiTest';

const ApiTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">API Test Page</h1>
        <ApiTest />
      </div>
    </div>
  );
};

export default ApiTestPage;