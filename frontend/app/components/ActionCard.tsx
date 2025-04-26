// "use client";
import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  color: 'orange' | 'purple' | 'blue' | 'teal';
  value?: string;
  subValue?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  color,
  value,
  subValue
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const getColors = () => {
    switch (color) {
      case 'orange':
        return {
          bg: 'bg-[#FF5C00]',
          gradient: 'from-[#FF5C00] to-[#FF8A00]',
          hover: 'hover:shadow-[#FF5C00]/20',
        };
      case 'purple':
        return {
          bg: 'bg-[#A259FF]',
          gradient: 'from-[#A259FF] to-[#BD7FFF]',
          hover: 'hover:shadow-[#A259FF]/20',
        };
      case 'blue':
        return {
          bg: 'bg-[#037DD6]',
          gradient: 'from-[#037DD6] to-[#1098FC]',
          hover: 'hover:shadow-[#037DD6]/20',
        };
      case 'teal':
        return {
          bg: 'bg-[#1A9A9A]',
          gradient: 'from-[#1A9A9A] to-[#20B9B9]',
          hover: 'hover:shadow-[#1A9A9A]/20',
        };
      default:
        return {
          bg: 'bg-gray-600',
          gradient: 'from-gray-600 to-gray-500',
          hover: 'hover:shadow-gray-600/20',
        };
    }
  };

  const colors = getColors();

  return (
    <div 
      ref={cardRef}
      className="group relative rounded-[24px] overflow-hidden perspective-1000 preserve-3d"
      style={{
        transform: isHovered 
          ? `scale(1.02) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          : 'scale(1) rotateX(0) rotateY(0)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Card Background with Gradient */}
      <div className={`
        absolute inset-0 bg-gradient-to-br ${colors.gradient}
        opacity-10 group-hover:opacity-15 transition-opacity duration-500
      `} />

      {/* Main Content Container */}
      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 h-full
        transition-all duration-500 group-hover:border-white/20">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-3xl font-bold text-white transition-transform duration-300 
            group-hover:translate-x-1">{title}</h3>
          
          <div className={`
            w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center
            shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6
            ${colors.hover}
          `}>
            <Icon size={24} className="text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* Description */}
        <p className="text-white/80 mb-6 transition-colors duration-300 group-hover:text-white">
          {description}
        </p>

        {/* Value Display */}
        {value && (
          <div className="mb-6 transform transition-all duration-300 group-hover:translate-x-1">
            <div className="text-3xl font-bold text-white group-hover:text-transparent 
              group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white 
              group-hover:to-white/70">{value}</div>
            {subValue && (
              <div className="text-white/80 text-sm mt-1 group-hover:text-white">{subValue}</div>
            )}
          </div>
        )}

        {/* Action Button */}
        

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 
          bg-gradient-to-br from-white/5 to-transparent rounded-full 
          transition-transform duration-700 ease-out transform 
          group-hover:scale-150 group-hover:rotate-12" />
        
        <div className="absolute bottom-0 left-0 w-40 h-40 -ml-20 -mb-20 
          bg-gradient-to-tr from-white/5 to-transparent rounded-full 
          transition-transform duration-700 ease-out transform 
          group-hover:scale-150 group-hover:-rotate-12" />
      </div>
    </div>
  );
};

export default ActionCard;