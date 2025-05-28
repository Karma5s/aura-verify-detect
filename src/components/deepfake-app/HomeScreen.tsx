
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Video, Upload, Settings, Shield } from 'lucide-react';
import { Screen } from '@/pages/Index';
import { WaveformVisualization } from './WaveformVisualization';
import { RecordButton } from './RecordButton';

interface HomeScreenProps {
  selectedModel: string;
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  selectedModel,
  isRecording,
  onRecordingChange,
  onNavigate,
}) => {
  const [recordingMode, setRecordingMode] = useState<'audio' | 'video'>('audio');
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordComplete = () => {
    onRecordingChange(false);
    if (recordingMode === 'video') {
      onNavigate('video-results');
    } else {
      onNavigate('audio-results');
    }
  };

  return (
    <div className="p-6 pt-16 pb-24 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            DeepGuard AI
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Advanced deepfake detection powered by AI
        </p>
      </div>

      {/* Model Status */}
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Active Model</p>
            <Badge 
              variant="secondary" 
              className="mt-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700"
            >
              {selectedModel === 'standard' ? 'Standard Detection' : 'Advanced Detection'}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('models')}
            className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          >
            <Settings className="w-4 h-4 mr-1" />
            Change
          </Button>
        </div>
      </div>

      {/* Recording Mode Toggle */}
      <div className="flex bg-gray-100 dark:bg-slate-800 rounded-2xl p-1">
        <button
          onClick={() => setRecordingMode('audio')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
            recordingMode === 'audio'
              ? 'bg-white dark:bg-slate-700 shadow-lg text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          <Mic className="w-5 h-5" />
          <span className="font-medium">Audio</span>
        </button>
        <button
          onClick={() => setRecordingMode('video')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
            recordingMode === 'video'
              ? 'bg-white dark:bg-slate-700 shadow-lg text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          <Video className="w-5 h-5" />
          <span className="font-medium">Video</span>
        </button>
      </div>

      {/* Recording Area */}
      <div className="text-center space-y-6">
        {isRecording && (
          <div className="space-y-4">
            <div className="text-xl font-mono text-indigo-600 dark:text-indigo-400">
              {formatTime(recordingTime)}
            </div>
            {recordingMode === 'audio' && <WaveformVisualization isActive={isRecording} />}
          </div>
        )}

        <RecordButton
          isRecording={isRecording}
          recordingMode={recordingMode}
          onToggleRecording={() => onRecordingChange(!isRecording)}
          onComplete={handleRecordComplete}
        />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isRecording 
            ? `Recording ${recordingMode}... Tap to stop`
            : `Tap to start ${recordingMode} recording`
          }
        </p>
      </div>

      {/* Upload Option */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white/80 dark:bg-slate-900/80 text-gray-500 dark:text-gray-400">
            or
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300"
        onClick={() => {
          // Simulate file upload and navigate to results
          setTimeout(() => onNavigate('video-results'), 1000);
        }}
      >
        <Upload className="w-5 h-5 mr-2" />
        Upload Media File
      </Button>
    </div>
  );
};
