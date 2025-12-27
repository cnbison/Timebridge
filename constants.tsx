
import React from 'react';
import { Coffee, Moon, Laptop, Utensils, Car, Tv, BookOpen } from 'lucide-react';
import { ActivityType, ActivityConfig } from './types';

export const TIMEZONES = {
  BEIJING: 'Asia/Shanghai',
  SILICON_VALLEY: 'America/Los_Angeles'
};

export const ACTIVITY_MAP: Record<ActivityType, ActivityConfig> = {
  [ActivityType.SLEEPING]: {
    icon: 'Moon',
    label: 'Sleeping',
    color: 'from-indigo-900 to-slate-900',
    description: 'Resting for a productive tomorrow.'
  },
  [ActivityType.BREAKFAST]: {
    icon: 'Coffee',
    label: 'Breakfast',
    color: 'from-orange-400 to-yellow-500',
    description: 'Starting the day with energy.'
  },
  [ActivityType.WORKING]: {
    icon: 'Laptop',
    label: 'Working',
    color: 'from-blue-500 to-indigo-600',
    description: 'Focused on making progress.'
  },
  [ActivityType.LUNCH]: {
    icon: 'Utensils',
    label: 'Lunch',
    color: 'from-green-400 to-emerald-600',
    description: 'Fueling up for the afternoon.'
  },
  [ActivityType.TEA_TIME]: {
    icon: 'Coffee',
    label: 'Afternoon Tea',
    color: 'from-pink-400 to-rose-500',
    description: 'Taking a mindful break.'
  },
  [ActivityType.COMMUTING]: {
    icon: 'Car',
    label: 'Commuting',
    color: 'from-slate-400 to-slate-600',
    description: 'On the move.'
  },
  [ActivityType.DINNER]: {
    icon: 'Tv',
    label: 'Dinner',
    color: 'from-purple-500 to-pink-600',
    description: 'Enjoying a hearty meal.'
  },
  [ActivityType.RELAXING]: {
    icon: 'BookOpen',
    label: 'Relaxing',
    color: 'from-violet-400 to-purple-500',
    description: 'Winding down for the night.'
  }
};

export const getActivityForHour = (hour: number): ActivityType => {
  if (hour >= 0 && hour < 7) return ActivityType.SLEEPING;
  if (hour >= 7 && hour < 9) return ActivityType.BREAKFAST;
  if (hour >= 9 && hour < 12) return ActivityType.WORKING;
  if (hour >= 12 && hour < 14) return ActivityType.LUNCH;
  if (hour >= 14 && hour < 17) return ActivityType.TEA_TIME;
  if (hour >= 17 && hour < 19) return ActivityType.COMMUTING;
  if (hour >= 19 && hour < 21) return ActivityType.DINNER;
  return ActivityType.RELAXING;
};
