import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  flag?: string;
  imageUrl?: string;
}

interface TeamGridProps {
  projects: TeamMember[];
  className?: string;
}

const TeamGrid: React.FC<TeamGridProps> = ({ projects, className = '' }) => {
  return (
    <div className={`bg-gray-50 py-12 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.map((member, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={member.imageUrl || "/api/placeholder/300/300"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-90">
                <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                <div className="flex items-center mt-1">
                  {member.flag && (
                    <span className="mr-1">{member.flag}</span>
                  )}
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamGrid;