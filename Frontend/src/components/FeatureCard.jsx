import { Leaf, Bug, Droplets, CloudSun } from 'lucide-react';

const iconMap = {
  Leaf,
  Bug,
  Droplets,
  CloudSun
};

export default function FeatureCard({ icon, title, description }) {
  const IconComponent = iconMap[icon];
  
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-colors">
      <div className="mb-4">
        <IconComponent className="text-brand-green" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}