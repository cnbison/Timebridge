
import React from 'react';
import { 
  Coffee, 
  Moon, 
  Laptop, 
  Utensils, 
  Car, 
  Tv, 
  BookOpen,
  LucideProps
} from 'lucide-react';
import { ActivityType } from '../types';

interface Props extends LucideProps {
  type: ActivityType;
}

const ActivityIcon: React.FC<Props> = ({ type, ...props }) => {
  switch (type) {
    case ActivityType.SLEEPING: return <Moon {...props} />;
    case ActivityType.BREAKFAST: return <Coffee {...props} />;
    case ActivityType.WORKING: return <Laptop {...props} />;
    case ActivityType.LUNCH: return <Utensils {...props} />;
    case ActivityType.TEA_TIME: return <Coffee {...props} />;
    case ActivityType.COMMUTING: return <Car {...props} />;
    case ActivityType.DINNER: return <Tv {...props} />;
    case ActivityType.RELAXING: return <BookOpen {...props} />;
    default: return <Coffee {...props} />;
  }
};

export default ActivityIcon;
