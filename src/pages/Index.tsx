
import React, { useState } from 'react';
import { HomeScreen } from '@/components/deepfake-app/HomeScreen';
import { ModelSelectionScreen } from '@/components/deepfake-app/ModelSelectionScreen';
import { RecordingsHistoryScreen } from '@/components/deepfake-app/RecordingsHistoryScreen';
import { VideoResultsScreen } from '@/components/deepfake-app/VideoResultsScreen';
import { AudioResultsScreen } from '@/components/deepfake-app/AudioResultsScreen';
import { Navigation } from '@/components/deepfake-app/Navigation';
import { ThemeProvider } from '@/components/deepfake-app/ThemeProvider';

export type Screen = 'home' | 'models' | 'history' | 'video-results' | 'audio-results';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedModel, setSelectedModel] = useState('standard');
  const [isRecording, setIsRecording] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            selectedModel={selectedModel}
            isRecording={isRecording}
            onRecordingChange={setIsRecording}
            onNavigate={setCurrentScreen}
          />
        );
      case 'models':
        return (
          <ModelSelectionScreen
            selectedModel={selectedModel}
            onModelSelect={setSelectedModel}
            onNavigate={setCurrentScreen}
          />
        );
      case 'history':
        return <RecordingsHistoryScreen onNavigate={setCurrentScreen} />;
      case 'video-results':
        return <VideoResultsScreen onNavigate={setCurrentScreen} />;
      case 'audio-results':
        return <AudioResultsScreen onNavigate={setCurrentScreen} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 transition-all duration-500">
        <div className="relative max-w-md mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl min-h-screen shadow-2xl">
          {renderScreen()}
          <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
