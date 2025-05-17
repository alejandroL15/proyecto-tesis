import React from 'react';
import { ThesisSession } from '../context/ThesisContext';

interface ProgressBarProps {
  sessions: ThesisSession[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ sessions }) => {
  const completedSessions = sessions.filter(session => session.isComplete).length;
  const totalSessions = sessions.length;
  const progressPercentage = (completedSessions / totalSessions) * 100;
  
  return (
    <div className="w-full mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">Progreso general</h3>
        <span className="text-indigo-700 font-medium">
          {completedSessions} of {totalSessions} sesiones
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-700 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;