
import React from 'react';
import { ActivityType, LocationData } from '../types';
import { ACTIVITY_MAP } from '../constants';
import ActivityIcon from './ActivityIcon';

interface ClockCardProps {
  data: LocationData;
}

const ClockCard: React.FC<ClockCardProps> = ({ data }) => {
  const activityConfig = ACTIVITY_MAP[data.activity];
  
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: data.timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(data.currentTime);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    timeZone: data.timezone,
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(data.currentTime);

  return (
    <div className="flex-1 min-w-[320px] p-8 glass rounded-[2.5rem] transition-all duration-700 hover:scale-[1.02] relative overflow-hidden group">
      {/* Background Gradient Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${activityConfig.color} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase opacity-50 mb-1">{data.city}</h2>
            <p className="text-xl font-medium">{formattedDate}</p>
          </div>
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${activityConfig.color} shadow-lg shadow-indigo-500/10`}>
            <ActivityIcon type={data.activity} size={32} strokeWidth={1.5} className="text-white" />
          </div>
        </div>

        <div className="mb-12">
          <span className="text-8xl font-bold tracking-tighter block mb-2">{formattedTime}</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium opacity-70">{activityConfig.label}</span>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6">
          <p className="text-lg italic font-light leading-relaxed text-indigo-100/90">
            {data.statusText || "..."}
          </p>
          <p className="text-xs mt-3 opacity-40">AI Context Analysis</p>
        </div>
      </div>
    </div>
  );
};

export default ClockCard;
