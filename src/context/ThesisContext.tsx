import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThesisFile {
  id: string;
  name: string;
  date: string;
  size: string;
  type: string;
}

export interface ThesisSession {
  id: number;
  title: string;
  description: string;
  date: string;
  files: ThesisFile[];
  isComplete: boolean;
}

interface ThesisContextType {
  sessions: ThesisSession[];
  currentSession: number;
  setCurrentSession: (id: number) => void;
  uploadFile: (sessionId: number, file: File) => void;
  removeFile: (sessionId: number, fileId: string) => void;
  updateSession: (sessionId: number, data: Partial<ThesisSession>) => void;
}

const ThesisContext = createContext<ThesisContextType | undefined>(undefined);

// Initial data
const initialSessions: ThesisSession[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  title: `Session ${i + 1}`,
  description: '',
  date: '',
  files: [],
  isComplete: false,
}));

export const ThesisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ThesisSession[]>(() => {
    const savedSessions = localStorage.getItem('thesisSessions');
    return savedSessions ? JSON.parse(savedSessions) : initialSessions;
  });
  
  const [currentSession, setCurrentSession] = useState<number>(1);

  useEffect(() => {
    localStorage.setItem('thesisSessions', JSON.stringify(sessions));
  }, [sessions]);

  const uploadFile = (sessionId: number, file: File) => {
    if (!file) return;
    
    // Check if session already has 3 files
    const session = sessions.find(s => s.id === sessionId);
    if (session && session.files.length >= 3) {
      alert('Maximum 3 files per session allowed.');
      return;
    }
    
    // Check if file is a Word document
    if (!file.name.endsWith('.doc') && !file.name.endsWith('.docx')) {
      alert('Only Word documents (.doc or .docx) are allowed.');
      return;
    }

    // Create a mock file object since we can't actually upload
    const newFile: ThesisFile = {
      id: Date.now().toString(),
      name: file.name,
      date: new Date().toLocaleDateString(),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.name.split('.').pop() || 'docx',
    };

    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId
          ? { ...session, files: [...session.files, newFile] }
          : session
      )
    );
  };

  const removeFile = (sessionId: number, fileId: string) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId
          ? { ...session, files: session.files.filter(file => file.id !== fileId) }
          : session
      )
    );
  };

  const updateSession = (sessionId: number, data: Partial<ThesisSession>) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId
          ? { ...session, ...data }
          : session
      )
    );
  };

  return (
    <ThesisContext.Provider value={{ 
      sessions, 
      currentSession, 
      setCurrentSession, 
      uploadFile, 
      removeFile,
      updateSession
    }}>
      {children}
    </ThesisContext.Provider>
  );
};

export const useThesis = (): ThesisContextType => {
  const context = useContext(ThesisContext);
  if (context === undefined) {
    throw new Error('useThesis must be used within a ThesisProvider');
  }
  return context;
};