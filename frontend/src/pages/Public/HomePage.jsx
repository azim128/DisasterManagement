import React from 'react';
import { Link } from 'react-router-dom';
import CreateCrisis from "../../components/CreateCrisis";
import TotalDonationsExpenses from "../../components/TotalDonationsExpenses";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Crisis Management Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering communities to respond effectively to crises and make a lasting impact.
          </p>
        </header>

        <div className="mb-12">
          <TotalDonationsExpenses />
        </div>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Empower Change: Report a Crisis</h2>
          <p className="text-lg text-center text-gray-700 max-w-2xl mx-auto mb-8">
            Your voice matters! Help us make a difference by sharing crucial information about crises in your community.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">How You Can Help:</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🔍</span>
                  <span>Identify local crises affecting your neighborhood.</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">📣</span>
                  <span>Share vital information to raise awareness.</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🤝</span>
                  <span>Connect those in need with resources and support.</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-600">
                Join us in our mission to foster a proactive community. Together, we can ensure that no one faces a crisis alone.
              </p>
            </div>
            <div>
              <CreateCrisis />
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Make a Difference: Donate Today</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Your generous donations fuel our ability to respond swiftly and effectively to crises. Every contribution, no matter the size, helps us:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-2xl mr-3">💊</span>
                  <span>Provide essential medical supplies</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🏠</span>
                  <span>Offer temporary housing to displaced individuals</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🍲</span>
                  <span>Distribute food and clean water to affected areas</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🚑</span>
                  <span>Support emergency response teams</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-xl mb-6">
                Your support can transform lives and communities in times of crisis.
              </p>
              <Link 
                to="/donation" 
                className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  );
}