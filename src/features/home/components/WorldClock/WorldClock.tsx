import React, { useState, useEffect } from 'react';
import './WorldClock.css';

interface TimeZoneInfo {
  city: string;
  country: string;
  flag: string;
  timezone: string;
  offset: number;
}

const timeZones: TimeZoneInfo[] = [
  { city: 'SEOUL', country: 'KR', flag: '🇰🇷', timezone: 'Asia/Seoul', offset: 9 },
  { city: 'BEIJING', country: 'CN', flag: '🇨🇳', timezone: 'Asia/Shanghai', offset: 8 },
  { city: 'INDIANA', country: 'US', flag: '🇺🇸', timezone: 'America/Indiana/Indianapolis', offset: -5 }
];

interface TimeDisplay {
  time: string;
  period: string;
  date: string;
}

const WorldClock: React.FC = () => {
  const [times, setTimes] = useState<Record<string, TimeDisplay>>({});

  const formatTime = (date: Date): { time: string; period: string; date: string } => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    return {
      time: `${displayHours.toString().padStart(2, '0')}:${minutes}:${seconds}`,
      period,
      date: ''
    };
  };

  const updateTimes = () => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;

    const newTimes: Record<string, TimeDisplay> = {};
    timeZones.forEach((zone) => {
      const localTime = new Date(utc + zone.offset * 60 * 60000);
      newTimes[zone.city] = formatTime(localTime);
    });

    setTimes(newTimes);
  };

  useEffect(() => {
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="world-clock">
      {timeZones.map((zone) => {
        const timeData = times[zone.city];
        return (
          <div key={zone.city} className="clock-item">
            <span className="clock-flag">{zone.flag}</span>
            <span className="clock-city">{zone.city}</span>
            <span className="clock-time">
              {timeData?.time || '00:00:00'}
              <span className="clock-period">{timeData?.period || 'AM'}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default WorldClock;