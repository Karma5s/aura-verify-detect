
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, Share, Download, Eye, AlertTriangle, Shield } from 'lucide-react';
import { Screen } from '@/pages/Index';

interface VideoResultsScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const VideoResultsScreen: React.FC<VideoResultsScreenProps> = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  const result = {
    status: 'fake',
    confidence: 87,
    duration: 165, // seconds
    filename: 'Interview_Recording.mp4',
    analysisTime: '2.4s',
    frameCount: 4950,
    resolution: '1920x1080',
  };

  const metrics = [
    { label: 'Face Manipulation', value: 92, status: 'high' },
    { label: 'Temporal Consistency', value: 15, status: 'low' },
    { label: 'Lighting Analysis', value: 78, status: 'medium' },
    { label: 'Expression Coherence', value: 23, status: 'low' },
  ];

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
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
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
      <Card className="p-6 border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              DEEPFAKE DETECTED
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
                  className="text-red-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
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

      {/* Video Player */}
      <Card className="p-4">
        <div className="relative bg-black rounded-xl overflow-hidden aspect-video mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>
          
          {showHeatmap && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-yellow-500/30 to-green-500/30 opacity-70" />
          )}
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
              variant="outline"
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={showHeatmap ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700' : ''}
            >
              <Eye className="w-4 h-4 mr-1" />
              Heatmap
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
            <span className="text-gray-600 dark:text-gray-400">Frame Count</span>
            <p className="font-medium text-gray-900 dark:text-white">{result.frameCount.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Resolution</span>
            <p className="font-medium text-gray-900 dark:text-white">{result.resolution}</p>
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
