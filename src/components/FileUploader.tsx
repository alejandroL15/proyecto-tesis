import React, { useState, useRef } from 'react';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  maxFiles: number;
  currentFileCount: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileSelect, 
  maxFiles,
  currentFileCount 
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const remainingFiles = maxFiles - currentFileCount;
  const isDisabled = remainingFiles <= 0;

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0] && !isDisabled) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div
      className={`
        border-2 ${dragActive ? 'border-indigo-500' : 'border-dashed border-gray-300'}
        rounded-lg p-8 text-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${dragActive ? 'bg-indigo-50' : 'bg-gray-50'} 
        transition-all duration-300
      `}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={isDisabled ? undefined : handleButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".doc,.docx"
        onChange={handleChange}
        className="hidden"
        disabled={isDisabled}
      />
      
      <div className="flex flex-col items-center justify-center">
        {isDisabled ? (
          <div className="bg-gray-200 rounded-full p-3 mb-3">
            <File size={24} className="text-gray-500" />
          </div>
        ) : (
          <div className="bg-indigo-100 rounded-full p-3 mb-3">
            <Upload size={24} className="text-indigo-600" />
          </div>
        )}
        
        <h4 className="font-medium text-gray-700 mb-1">
          {isDisabled 
            ? "Maximum files reached" 
            : "Upload Word Document"
          }
        </h4>
        
        <p className="text-sm text-gray-500 mb-2">
          {isDisabled 
            ? "You've uploaded the maximum number of files allowed"
            : "Drag and drop or click to select"
          }
        </p>
        
        {!isDisabled && (
          <p className="text-xs text-gray-400">
            .doc or .docx files only • {remainingFiles} file{remainingFiles !== 1 ? 's' : ''} remaining
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUploader;