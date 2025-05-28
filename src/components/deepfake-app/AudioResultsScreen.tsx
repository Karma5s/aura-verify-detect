
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, Share, Download, Shield } from 'lucide-react';
import { Screen } from '@/pages/Index';

interface AudioResultsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const AudioResultsScreen: React.FC<AudioResultsScreenProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  const result = {
    status: 'real',
    confidence: 94,
    duration: 32, // seconds
    filename: 'Voice_Message.wav',
    analysisTime: '0.8s',
    sampleRate: '44.1 kHz',
    bitrate: '320 kbps',
  };

  const metrics = [
    { label: 'Voice Synthesis', value: 8, status: 'low' },
    { label: 'Spectral Analysis', value: 12, status: 'low' },
    { label: 'Temporal Consistency', value: 95, status: 'high' },
    { label: 'Emotion Coherence', value: 89, status: 'high' },
  ];

  const waveformData = Array.from({ length: 100 }, (_, i) => ({
    time: (i / 99) * result.duration,
    amplitude: Math.sin(i * 0.1) * 50 + Math.random() * 30,
    suspicious: i > 40 && i < 60 ? true : false,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedConfidence(prev => {
          if (prev >= result.confidence) {
            clearInterval(interval);
            return result.confidence;
          }
          return prev + 1;
        });
      }, 20);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'high': return result.status === 'real' ? 'bg-green-500' : 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return result.status === 'real' ? 'bg-red-500' : 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 pt-16 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('history')}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Analysis Results
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
            {result.filename}
          </p>
        </div>
      </div>

      {/* Result Hero */}
      <Card className="p-6 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              AUTHENTIC AUDIO
            </h2>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="100, 100"
                  className="text-gray-200 dark:text-gray-700"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${animatedConfidence}, 100`}
                  className="text-green-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {animatedConfidence}%
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Confidence Level
            </p>
          </div>
        </div>
      </Card>

      {/* Audio Player & Waveform */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Waveform */}
          <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-end justify-center h-full space-x-1">
              {waveformData.map((point, index) => (
                <div
                  key={index}
                  className={`transition-all duration-300 ${
                    point.suspicious
                      ? 'bg-red-400'
                      : index < (currentTime / result.duration) * 100
                      ? 'bg-indigo-500'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  style={{
                    height: `${Math.max(4, point.amplitude)}%`,
                    width: '2px',
                  }}
                />
              ))}
            </div>
            
            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-indigo-600 transition-all duration-100"
              style={{ left: `${4 + (currentTime / result.duration) * 92}%` }}
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(currentTime)}
              </span>
              <Progress value={(currentTime / result.duration) * 100} className="flex-1" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(result.duration)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Analysis Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Detailed Analysis
        </h3>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{metric.label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{metric.value}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${getMetricColor(metric.status)}`}
                  style={{
                    width: `${metric.value}%`,
                    animationDelay: `${index * 200}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Frequency Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Frequency Analysis
        </h3>
        <div className="h-32 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-end justify-center h-full space-x-1">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-indigo-500 to-purple-500 transition-all duration-300"
                style={{
                  height: `${Math.max(10, Math.sin(i * 0.2) * 40 + 50)}%`,
                  width: '3px',
                }}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Technical Details */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Technical Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Analysis Time</span>
            <p className="font-medium text-gray-900 dark:text-white">{result.analysisTime}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Sample Rate</span>
            <p className="font-medium text-gray-900 dark:text-white">{result.sampleRate}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Bitrate</span>
            <p className="font-medium text-gray-900 dark:text-white">{result.bitrate}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Duration</span>
            <p className="font-medium text-gray-900 dark:text-white">{formatTime(result.duration)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
