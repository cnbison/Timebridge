
import React, { useState, useEffect, useCallback } from 'react';
import { Globe, RefreshCw } from 'lucide-react';
import ClockCard from './components/ClockCard';
import { LocationData, ActivityType } from './types';
import { TIMEZONES, getActivityForHour } from './constants';
import { getContextualStatus } from './services/geminiService';

const App: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [beijingStatus, setBeijingStatus] = useState("正在同步中...");
  const [svStatus, setSvStatus] = useState("正在同步中...");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to refresh AI statuses
  const refreshAI = useCallback(async () => {
    setIsRefreshing(true);
    
    const bjTime = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONES.BEIJING,
      hour: 'numeric',
      hour12: false
    }).format(new Date());
    
    const svTime = new Intl.DateTimeFormat('en-US', {
      timeZone: TIMEZONES.SILICON_VALLEY,
      hour: 'numeric',
      hour12: false
    }).format(new Date());

    const bjAct = getActivityForHour(parseInt(bjTime));
    const svAct = getActivityForHour(parseInt(svTime));

    const [statusBJ, statusSV] = await Promise.all([
      getContextualStatus("北京", bjTime, bjAct),
      getContextualStatus("硅谷", svTime, svAct)
    ]);

    setBeijingStatus(statusBJ);
    setSvStatus(statusSV);
    setIsRefreshing(false);
  }, []);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    // Initial AI fetch
    refreshAI();

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recalculate activities based on 'now'
  const bjHour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONES.BEIJING,
    hour: 'numeric',
    hour12: false
  }).format(now));

  const svHour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONES.SILICON_VALLEY,
    hour: 'numeric',
    hour12: false
  }).format(now));

  const bjData: LocationData = {
    city: "Beijing",
    timezone: TIMEZONES.BEIJING,
    currentTime: now,
    activity: getActivityForHour(bjHour),
    statusText: beijingStatus,
    color: "from-amber-500 to-orange-600"
  };

  const svData: LocationData = {
    city: "Silicon Valley",
    timezone: TIMEZONES.SILICON_VALLEY,
    currentTime: now,
    activity: getActivityForHour(svHour),
    statusText: svStatus,
    color: "from-cyan-500 to-blue-600"
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 lg:p-12 relative">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600 opacity-10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600 opacity-10 blur-[120px]"></div>
      </div>

      <header className="w-full max-w-6xl flex justify-between items-center mb-12 z-10 px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">
            <Globe className="text-indigo-400" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Time Bridge</h1>
            <p className="text-xs opacity-40 uppercase tracking-widest font-semibold">Pacific & Asia Synchronization</p>
          </div>
        </div>
        
        <button 
          onClick={refreshAI}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-sm font-medium disabled:opacity-50"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Thinking...' : 'Refresh AI Context'}
        </button>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        <ClockCard data={bjData} />
        <ClockCard data={svData} />
      </main>

      <footer className="mt-16 text-center z-10">
        <div className="px-6 py-2 glass rounded-full inline-flex items-center gap-4 text-xs font-medium opacity-60">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            Beijing UTC+8
          </div>
          <div className="h-3 w-px bg-white/10"></div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
            Silicon Valley UTC-7/8
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
