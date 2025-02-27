import React from 'react';

interface Project {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  priority?: boolean;
}

interface ProjectsGridProps {
  projects: Project[];
  gap?: number;  // Agregado de nuevo
  minCards?: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div 
      className={`
        relative rounded-xl bg-white shadow-md overflow-hidden 
        transition-all duration-300 hover:scale-105 hover:z-10
        aspect-square w-full
        ${project.priority ? 'z-5' : 'opacity-75'}
      `}
    >
      <div className="w-full h-full relative">
        <img 
          src={project.imageUrl}
          alt={project.name}
          className={`
            w-full h-full object-cover
            ${project.priority ? 'contrast-105 brightness-105' : 'contrast-95 brightness-95'}
          `}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white/85 backdrop-blur-sm p-3">
          <div className="font-medium text-xs sm:text-sm line-clamp-1">{project.name}</div>
          <div className="text-xs sm:text-sm text-gray-600 line-clamp-1">{project.type}</div>
        </div>
      </div>
    </div>
  );
};

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  gap = 8,  // valor por defecto
  minCards = 60
}) => {
  const getRandomProject = (originalProjects: Project[]): Project => {
    const randomIndex = Math.floor(Math.random() * originalProjects.length);
    const project = originalProjects[randomIndex];
    return {
      ...project,
      id: `${project.id}-${Math.random()}`,
      priority: false
    };
  };

  const getDisplayProjects = () => {
    if (projects.length >= minCards) {
      return shuffleArray(projects);
    }

    const filledProjects = [...projects];
    while (filledProjects.length < minCards) {
      filledProjects.push(getRandomProject(projects));
    }
    return shuffleArray(filledProjects);
  };

  const displayProjects = getDisplayProjects();

  // Calculamos la clase de gap basada en la prop
  const gapClass = `gap-${gap}`;

  return (
    <div className="w-screen h-full bg-gray-50 overflow-hidden opacity-60">
      <div className="w-full h-full p-8 md:p-16">
        <div 
          className="w-full h-full overflow-hidden"
          style={{
            transform: 'rotate(10deg) scale(1.5)',
            transformOrigin: 'center center',
          }}
        >
          <div className={`
            w-full h-full 
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10
            ${gapClass}
          `}>
            {displayProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;