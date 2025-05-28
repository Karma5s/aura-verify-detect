
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Video, Mic, Filter, MoreVertical, Play, Shield, AlertTriangle } from 'lucide-react';
import { Screen } from '@/pages/Index';

interface RecordingsHistoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const RecordingsHistoryScreen: React.FC<RecordingsHistoryScreenProps> = ({
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'audio' | 'video'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'status'>('date');

  const recordings = [
    {
      id: '1',
      type: 'video',
      name: 'Interview_Recording.mp4',
      date: '2024-12-20',
      time: '14:30',
      duration: '2:45',
      status: 'completed',
      result: 'fake',
      confidence: 87,
      thumbnail: '/placeholder.svg',
    },
    {
      id: '2',
      type: 'audio',
      name: 'Voice_Message.wav',
      date: '2024-12-20',
      time: '12:15',
      duration: '0:32',
      status: 'completed',
      result: 'real',
      confidence: 94,
    },
    {
      id: '3',
      type: 'video',
      name: 'Conference_Call.mp4',
      date: '2024-12-19',
      time: '16:45',
      duration: '15:20',
      status: 'processing',
      result: null,
      confidence: null,
      thumbnail: '/placeholder.svg',
    },
    {
      id: '4',
      type: 'audio',
      name: 'Podcast_Segment.mp3',
      date: '2024-12-19',
      time: '11:30',
      duration: '5:12',
      status: 'failed',
      result: null,
      confidence: null,
    },
  ];

  const filteredRecordings = recordings.filter(recording => {
    if (filter === 'all') return true;
    return recording.type === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">Failed</Badge>;
      default:
        return null;
    }
  };

  const getResultIcon = (result: string | null, confidence: number | null) => {
    if (!result) return null;
    
    if (result === 'real') {
      return (
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">{confidence}% Real</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">{confidence}% Fake</span>
        </div>
      );
    }
  };

  return (
    <div className="p-6 pt-16 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('home')}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recordings
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View your analysis history
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="whitespace-nowrap"
        >
          <Filter className="w-4 h-4 mr-1" />
          All
        </Button>
        <Button
          variant={filter === 'audio' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('audio')}
          className="whitespace-nowrap"
        >
          <Mic className="w-4 h-4 mr-1" />
          Audio
        </Button>
        <Button
          variant={filter === 'video' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('video')}
          className="whitespace-nowrap"
        >
          <Video className="w-4 h-4 mr-1" />
          Video
        </Button>
      </div>

      {/* Recordings List */}
      <div className="space-y-4">
        {filteredRecordings.map((recording, index) => (
          <Card
            key={recording.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
            onClick={() => {
              if (recording.status === 'completed') {
                onNavigate(recording.type === 'video' ? 'video-results' : 'audio-results');
              }
            }}
          >
            <div className="flex items-start space-x-4">
              {/* Thumbnail/Icon */}
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                {recording.type === 'video' ? (
                  <div className="relative">
                    <Video className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    {recording.status === 'completed' && (
                      <Play className="absolute inset-0 w-4 h-4 m-auto text-white bg-black/50 rounded-full p-1" />
                    )}
                  </div>
                ) : (
                  <Mic className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {recording.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span>{recording.date}</span>
                      <span>•</span>
                      <span>{recording.time}</span>
                      <span>•</span>
                      <span>{recording.duration}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                {/* Status and Result */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(recording.status)}
                    {recording.status === 'processing' && (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    )}
                  </div>
                  {getResultIcon(recording.result, recording.confidence)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecordings.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mic className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No recordings yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by recording or uploading media to analyze
          </p>
          <Button onClick={() => onNavigate('home')} className="bg-gradient-to-r from-indigo-600 to-purple-600">
            Start Recording
          </Button>
        </div>
      )}
    </div>
  );
};
