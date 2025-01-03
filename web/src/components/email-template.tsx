import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {firstName}!
      </h1>
      <img src="https://github.com/adnanwahab/homelab/blob/main/web/public/personal/friends.jpg?raw=true" alt="Michael Pollan" className="w-1/2 mx-auto" />
      <img src="https://github.com/adnanwahab/homelab/blob/main/web/public/personal/1320.jpeg?raw=true" alt="Michael Pollan" className="w-1/2 mx-auto" />

      <p className="text-gray-600 leading-relaxed">
        We're excited to have you join our community. Thank you for signing up and becoming a part of our journey.
      </p>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Getting Started
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Connect with others</li>
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        If you have any questions, feel free to reach out to our support team.
      </p>
    </div>
  </div>
);