import React from 'react';
import { FileText, X, Download } from 'lucide-react';
import { ThesisFile } from '../context/ThesisContext';
import { useAuth } from '../context/AuthContext';

interface FileCardProps {
  file: ThesisFile;
  sessionId: number;
  onRemove?: (fileId: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, sessionId, onRemove }) => {
  const { isAuthenticated } = useAuth();
  const { name, date, size, type } = file;

  // In a real app, this would download the actual file
  const handleDownload = () => {
    alert(`In a real implementation, this would download ${name}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-indigo-100 text-indigo-700 rounded-lg p-2 mr-3">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 truncate max-w-[200px]">{name}</h4>
              <p className="text-xs text-gray-500 mt-1">
                Uploaded on {date} • {size}
              </p>
            </div>
          </div>

          <div className="flex">
            {isAuthenticated && onRemove && (
              <button 
                onClick={() => onRemove(file.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Remove file"
              >
                <X size={18} />
              </button>
            )}
            <button 
              onClick={handleDownload}
              className="text-gray-400 hover:text-indigo-600 transition-colors p-1 ml-1"
              aria-label="Download file"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className={`
            inline-block px-2 py-1 text-xs font-medium rounded-full
            ${type === 'docx' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}
          `}>
            {type === 'docx' ? '.docx' : '.doc'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FileCard;