
export enum ActivityType {
  SLEEPING = 'SLEEPING',
  BREAKFAST = 'BREAKFAST',
  WORKING = 'WORKING',
  LUNCH = 'LUNCH',
  TEA_TIME = 'TEA_TIME',
  COMMUTING = 'COMMUTING',
  DINNER = 'DINNER',
  RELAXING = 'RELAXING'
}

export interface LocationData {
  city: string;
  timezone: string;
  currentTime: Date;
  activity: ActivityType;
  statusText: string;
  color: string;
}

export interface ActivityConfig {
  icon: string;
  label: string;
  color: string;
  description: string;
}
