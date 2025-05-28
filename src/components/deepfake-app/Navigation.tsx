
import React from 'react';
import { Home, Settings, History, Shield } from 'lucide-react';
import { Screen } from '@/pages/Index';
import { useTheme } from './ThemeProvider';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'models' as Screen, icon: Settings, label: 'Models' },
    { id: 'history' as Screen, icon: History, label: 'History' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      <div className="m-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl">
        <div className="flex items-center justify-around py-3 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                currentScreen === item.id
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
          >
            <Shield className="w-5 h-5" />
            <span className="text-xs font-medium">Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
};
