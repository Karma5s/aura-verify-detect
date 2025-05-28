
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mic, Video, CheckCircle, Clock, Zap } from 'lucide-react';
import { Screen } from '@/pages/Index';

interface ModelSelectionScreenProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
  onNavigate: (screen: Screen) => void;
}

export const ModelSelectionScreen: React.FC<ModelSelectionScreenProps> = ({
  selectedModel,
  onModelSelect,
  onNavigate,
}) => {
  const [category, setCategory] = useState<'audio' | 'video'>('audio');

  const audioModels = [
    {
      id: 'standard',
      name: 'Standard Audio Detection',
      description: 'Fast and reliable detection for most audio deepfakes',
      accuracy: 94,
      speed: 'Fast',
      icon: <Mic className="w-6 h-6" />,
      features: ['Real-time processing', 'Voice synthesis detection', 'Audio artifacts analysis'],
    },
    {
      id: 'advanced',
      name: 'Advanced Audio Detection',
      description: 'State-of-the-art model with highest accuracy',
      accuracy: 98,
      speed: 'Medium',
      icon: <Zap className="w-6 h-6" />,
      features: ['Deep spectral analysis', 'Emotion consistency check', 'Multi-language support'],
    },
  ];

  const videoModels = [
    {
      id: 'standard-video',
      name: 'Standard Video Detection',
      description: 'Efficient face swap and manipulation detection',
      accuracy: 92,
      speed: 'Medium',
      icon: <Video className="w-6 h-6" />,
      features: ['Face manipulation detection', 'Temporal consistency', 'Expression analysis'],
    },
    {
      id: 'advanced-video',
      name: 'Advanced Video Detection',
      description: 'Comprehensive analysis with frame-by-frame inspection',
      accuracy: 96,
      speed: 'Slow',
      icon: <Clock className="w-6 h-6" />,
      features: ['Frame-by-frame analysis', 'Lighting consistency', 'Micro-expression detection'],
    },
  ];

  const models = category === 'audio' ? audioModels : videoModels;

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
            Detection Models
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Choose the best model for your needs
          </p>
        </div>
      </div>

      {/* Category Selector */}
      <div className="flex bg-gray-100 dark:bg-slate-800 rounded-2xl p-1">
        <button
          onClick={() => setCategory('audio')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
            category === 'audio'
              ? 'bg-white dark:bg-slate-700 shadow-lg text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          <Mic className="w-5 h-5" />
          <span className="font-medium">Audio Models</span>
        </button>
        <button
          onClick={() => setCategory('video')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
            category === 'video'
              ? 'bg-white dark:bg-slate-700 shadow-lg text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          <Video className="w-5 h-5" />
          <span className="font-medium">Video Models</span>
        </button>
      </div>

      {/* Models Grid */}
      <div className="space-y-4">
        {models.map((model, index) => (
          <Card
            key={model.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              selectedModel === model.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-lg shadow-indigo-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600'
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
            onClick={() => onModelSelect(model.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${
                  selectedModel === model.id
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                  {model.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {model.description}
                  </p>
                </div>
              </div>
              {selectedModel === model.id && (
                <CheckCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              )}
            </div>

            {/* Metrics */}
            <div className="flex items-center space-x-6 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {model.accuracy}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <Badge
                  variant="secondary"
                  className={
                    model.speed === 'Fast'
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : model.speed === 'Medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300'
                      : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                  }
                >
                  {model.speed}
                </Badge>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {model.features.map((feature, i) => (
                <div key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <Button
        onClick={() => onNavigate('home')}
        className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Apply Selection
      </Button>
    </div>
  );
};
