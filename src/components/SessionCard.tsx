import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Check, Clock } from 'lucide-react';
import { ThesisSession } from '../context/ThesisContext';

interface SessionCardProps {
  session: ThesisSession;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const { id, title, description, files, isComplete } = session;
  
  return (
    <Link 
      to={`/session/${id}`} 
      className="block group"
    >
      <div className={`
        bg-white rounded-lg shadow-md overflow-hidden
        border-l-4 ${isComplete ? 'border-green-500' : 'border-amber-500'}
        hover:shadow-lg transition-all duration-300 h-full
      `}>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-serif font-semibold text-indigo-900 group-hover:text-indigo-700 transition-colors">
              {title}
            </h3>
            <div className={`
              flex items-center justify-center rounded-full w-7 h-7
              ${isComplete 
                ? 'bg-green-100 text-green-600' 
                : 'bg-amber-100 text-amber-600'}
            `}>
              {isComplete ? <Check size={16} /> : <Clock size={16} />}
            </div>
          </div>

          {description && (
            <p className="text-gray-600 mb-3 text-sm line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center text-sm text-gray-500 mt-4">
            <FileText size={16} className="mr-1" />
            <span>{files.length} / 3 documents</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SessionCard;