import React from 'react';
import { useThesis } from '../context/ThesisContext';
import SessionCard from '../components/SessionCard';
import ProgressBar from '../components/ProgressBar';

const Home: React.FC = () => {
  const { sessions } = useThesis();
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-indigo-900 mb-2">
          Progeso de tesis
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          
        </p>
      </div>
      
      <ProgressBar sessions={sessions} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sessions.map(session => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
};

export default Home;