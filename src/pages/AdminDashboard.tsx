import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle, Clock, Pencil } from 'lucide-react';
import { useThesis } from '../context/ThesisContext';

const AdminDashboard: React.FC = () => {
  const { sessions } = useThesis();
  const navigate = useNavigate();
  
  const completedSessions = sessions.filter(session => session.isComplete).length;
  const pendingSessions = sessions.length - completedSessions;
  const totalFiles = sessions.reduce((acc, session) => acc + session.files.length, 0);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your thesis sessions and documents from here.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Completed Sessions
          </h3>
          <div className="flex items-end justify-between">
            <div className="flex items-center text-green-600">
              <CheckCircle size={20} className="mr-2" />
              <span className="text-2xl font-bold">{completedSessions}</span>
            </div>
            <span className="text-gray-500 text-sm">
              out of {sessions.length} sessions
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Pending Sessions
          </h3>
          <div className="flex items-end justify-between">
            <div className="flex items-center text-amber-600">
              <Clock size={20} className="mr-2" />
              <span className="text-2xl font-bold">{pendingSessions}</span>
            </div>
            <span className="text-gray-500 text-sm">
              still in progress
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Total Documents
          </h3>
          <div className="flex items-end justify-between">
            <div className="flex items-center text-indigo-600">
              <PlusCircle size={20} className="mr-2" />
              <span className="text-2xl font-bold">{totalFiles}</span>
            </div>
            <span className="text-gray-500 text-sm">
              across all sessions
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            All Sessions
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Files
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{session.title}</div>
                    {session.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {session.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${session.isComplete 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'}
                    `}>
                      {session.isComplete 
                        ? <CheckCircle size={12} className="mr-1" /> 
                        : <Clock size={12} className="mr-1" />
                      }
                      {session.isComplete ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {session.files.length} / 3
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/session/${session.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                    >
                      <Pencil size={14} className="mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;