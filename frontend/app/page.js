import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8">
          Shipo
        </h1>
        <p className="text-xl text-white mb-12 max-w-md mx-auto opacity-90">
          Track and manage all your shipments in one place
        </p>
        
        <div className="flex gap-4 justify-center">
          <a 
            href="/signin"
            className="px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sign In
          </a>
          <a 
            href="/signup"
            className="px-8 py-3 bg-blue-800 text-white text-lg font-semibold rounded-lg hover:bg-blue-900 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}