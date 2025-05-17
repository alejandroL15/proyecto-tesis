import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { useThesis } from '../context/ThesisContext';
import { useAuth } from '../context/AuthContext';
import FileCard from '../components/FileCard';
import FileUploader from '../components/FileUploader';

const SessionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const sessionId = parseInt(id || '1');
  const { sessions, uploadFile, removeFile, updateSession } = useThesis();
  const { isAuthenticated } = useAuth();
  const session = sessions.find(s => s.id === sessionId);
  
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (session) {
      setTitle(session.title);
      setDescription(session.description);
      
      // Simulate loading for smoother transitions
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [session]);

  if (!session || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const handleFileUpload = (file: File) => {
    uploadFile(sessionId, file);
  };

  const handleRemoveFile = (fileId: string) => {
    if (confirm('Are you sure you want to remove this file?')) {
      removeFile(sessionId, fileId);
    }
  };

  const handleSaveChanges = () => {
    updateSession(sessionId, { 
      title, 
      description
    });
    setEditMode(false);
  };

  const toggleComplete = () => {
    updateSession(sessionId, { isComplete: !session.isComplete });
  };

  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to all sessions</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200 p-6">
          {editMode ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Title
                </label>
                <input 
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea 
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-white hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {session.title}
                </h1>
                
                {session.description ? (
                  <p className="text-gray-600">{session.description}</p>
                ) : (
                  <p className="text-gray-400 italic text-sm">
                    {isAuthenticated ? 'No description added yet' : ''}
                  </p>
                )}
              </div>
              
              <div className="flex items-center">
                {isAuthenticated && (
                  <button
                    onClick={toggleComplete}
                    className={`
                      flex items-center mr-3 px-3 py-1 rounded-full text-sm
                      ${session.isComplete 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}
                      transition-colors
                    `}
                  >
                    {session.isComplete ? (
                      <>
                        <CheckCircle size={14} className="mr-1" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock size={14} className="mr-1" />
                        In Progress
                      </>
                    )}
                  </button>
                )}
                
                {isAuthenticated && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-indigo-600 hover:text-indigo-800 px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Documents ({session.files.length}/3)
          </h2>
          
          {session.files.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {session.files.map(file => (
                <FileCard
                  key={file.id}
                  file={file}
                  sessionId={sessionId}
                  onRemove={isAuthenticated ? handleRemoveFile : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No documents have been uploaded for this session yet.</p>
            </div>
          )}
          
          {isAuthenticated && session.files.length < 3 && (
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Upload Document
              </h3>
              <FileUploader 
                onFileSelect={handleFileUpload}
                maxFiles={3}
                currentFileCount={session.files.length}
              />
              <p className="mt-2 text-xs text-gray-500">
                Note: In this demo version, files aren't actually uploaded to a server.
                In a real implementation, you would need to handle the file uploads to GitHub
                or another storage provider.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;