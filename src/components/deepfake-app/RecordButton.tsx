
import React, { useState } from 'react';
import { Mic, Video, Square } from 'lucide-react';

interface RecordButtonProps {
  isRecording: boolean;
  recordingMode: 'audio' | 'video';
  onToggleRecording: () => void;
  onComplete: () => void;
}

export const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  recordingMode,
  onToggleRecording,
  onComplete,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    if (isRecording) {
      onComplete();
    } else {
      onToggleRecording();
    }
    setTimeout(() => setIsPressed(false), 150);
  };

  return (
    <div className="flex justify-center">
      <button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={handlePress}
        className={`relative w-24 h-24 rounded-full transition-all duration-300 transform ${
          isPressed ? 'scale-95' : 'scale-100'
        } ${
          isRecording
            ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-2xl shadow-red-500/50'
            : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:scale-105'
        }`}
      >
        {/* Pulse animation rings */}
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20" />
            <div className="absolute inset-2 rounded-full bg-red-400 animate-ping opacity-30" style={{ animationDelay: '0.5s' }} />
          </>
        )}
        
        {/* Inner button */}
        <div className={`absolute inset-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
          isRecording ? 'bg-white/30' : ''
        }`}>
          {isRecording ? (
            <Square className="w-8 h-8 text-white fill-white" />
          ) : recordingMode === 'audio' ? (
            <Mic className="w-8 h-8 text-white" />
          ) : (
            <Video className="w-8 h-8 text-white" />
          )}
        </div>

        {/* Outer glow */}
        <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isRecording
            ? 'bg-gradient-to-br from-red-400/50 to-red-600/50 blur-md'
            : 'bg-gradient-to-br from-indigo-400/50 to-purple-600/50 blur-md'
        }`} />
      </button>
    </div>
  );
};
