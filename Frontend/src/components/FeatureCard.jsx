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
    <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <IconComponent className="text-brand-green" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}