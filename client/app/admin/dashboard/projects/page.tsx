'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Eye,
  Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProjectModal from '@/components/admin/ProjectModal';
import { getDirectProjects } from '@/lib/direct-queries';

interface Project {
  id: number;
  title: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  client: string;
  description: string;
  tech: string[];
  image: string;
  start_date: string;
  end_date: string;
  link: string;
  github: string;
}

// const initialProjects: Project[] = [
//   {
//     id: 1,
//     title: 'E-Commerce Platform',
//     category: 'Web Development',
//     status: 'completed',
//     client: 'TechCorp',
//     description: 'A modern e-commerce platform with AI-powered recommendations.',
//     tech: ['Next.js', 'TypeScript', 'Stripe', 'AI'],
//     image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
//     start_date: '2023-10-01',
//     end_date: '2023-12-15',
//     link: 'https://example-ecommerce.com',
//     github: 'https://github.com/example/ecommerce-platform'
//   },
//   {
//     id: 2,
//     title: 'FinTech Mobile App',
//     category: 'Mobile Development',
//     status: 'in-progress',
//     client: 'StartupXYZ',
//     description: 'Revolutionary financial app with blockchain transactions.',
//     tech: ['React Native', 'Blockchain', 'Node.js'],
//     image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg',
//     start_date: '2023-11-15',
//     end_date: '2024-03-01',
//     link: 'https://example-fintech.com',
//     github: 'https://github.com/example/fintech-app'
//   }
// ];

const statusColors = {
  'completed': 'text-green-400 border-green-500',
  'in-progress': 'text-blue-400 border-blue-500',
  'planning': 'text-orange-400 border-orange-500'
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getDirectProjects();
      
      // Transform data to match our interface if needed
      interface RawProject {
        id: number;
        title: string;
        category: string;
        status: 'completed' | 'in-progress' | 'planning';
        client: string;
        description: string;
        tech: string | string[];
        image: string;
        start_date: string;
        end_date: string;
        link: string;
        github: string;
      }
      
      const transformedProjects = (data as RawProject[]).map((project) => ({
        ...project,
        tech: typeof project.tech === 'string' ? JSON.parse(project.tech) : project.tech,
        start_date: project.start_date,
        end_date: project.end_date
      }));
      setProjects(transformedProjects);
      console.log('Admin projects fetched directly from database:', transformedProjects.length);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      // TODO: Show error toast
    }
  };

  const handleSaveProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      if (editingProject) {
        // Update existing project
        const response = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...projectData,
            start_date: projectData.start_date,
            end_date: projectData.end_date,
            tech: projectData.tech
          }),
        });

        if (response.ok) {
          const updatedProject = await response.json();
          setProjects(projects.map(p => 
            p.id === editingProject.id 
              ? {
                  ...updatedProject,
                  tech: typeof updatedProject.tech === 'string' ? JSON.parse(updatedProject.tech) : updatedProject.tech,
                  start_date: updatedProject.start_date,
                  end_date: updatedProject.end_date
                }
              : p
          ));
        }
      } else {
        
        const response = await fetch('/api/admin/projects/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...projectData,
            start_date: projectData.start_date,
            end_date: projectData.end_date,
            tech: projectData.tech
          }),
        });

        if (response.ok) {
          const newProject = await response.json();
          setProjects([{
            ...newProject,
            tech: typeof newProject.tech === 'string' ? JSON.parse(newProject.tech) : newProject.tech,
            start_date: newProject.start_date,
            end_date: newProject.end_date
          }, ...projects]);
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#F8FAFC' }}>
            Manage <span style={{ color: '#3B82F6' }}>Projects</span>
          </h1>
          <p style={{ color: '#94A3B8' }}>Create, edit, and manage your project portfolio</p>
        </div>
        
        <Button
          onClick={handleAddProject}
          className="font-semibold rounded-lg group"
          style={{ 
            backgroundColor: '#3B82F6', 
            color: '#F8FAFC',
            border: '1px solid #3B82F6'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2563EB';
            e.currentTarget.style.borderColor = '#2563EB';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3B82F6';
            e.currentTarget.style.borderColor = '#3B82F6';
          }}
        >
          <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
          Add Project
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#94A3B8' }} />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            style={{ 
              backgroundColor: '#1A1B23', 
              border: '1px solid #374151',
              color: '#F8FAFC'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#374151';
            }}
          />
        </div>
        <Button
          variant="outline"
          className="font-semibold"
          style={{ 
            borderColor: '#374151', 
            color: '#94A3B8',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1A1B23';
            e.currentTarget.style.borderColor = '#3B82F6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#374151';
          }}
        >
          <Filter className="w-5 h-5 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (          <motion.div
            key={project.id}
            className="rounded-2xl overflow-hidden transition-all duration-300 group"
            style={{ 
              backgroundColor: '#1A1B23', 
              border: '1px solid #374151'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#374151';
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10, 10, 11, 0.8) 0%, transparent 50%, transparent 100%)' }} />
              
              <div className="absolute top-4 left-4">
                <span 
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}
                  style={{ backgroundColor: '#0A0A0B' }}
                >
                  {project.status?.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: '#3B82F6' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3B82F6';
                  }}
                >
                  <Edit3 className="w-4 h-4" style={{ color: '#F8FAFC' }} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: '#EF4444' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EF4444';
                  }}
                >
                  <Trash2 className="w-4 h-4" style={{ color: '#F8FAFC' }} />
                </button>
              </div>
            </div>            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#3B82F6' }}>{project.category}</span>
                <div className="flex space-x-2">
                  {project.link && (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors"
                    >
                      <ExternalLink 
                        className="w-4 h-4 cursor-pointer transition-colors" 
                        style={{ color: '#94A3B8' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#94A3B8';
                        }}
                      />
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors"
                    >
                      <Github 
                        className="w-4 h-4 cursor-pointer transition-colors" 
                        style={{ color: '#94A3B8' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#94A3B8';
                        }}
                      />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 
                className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-blue-400"
                style={{ color: '#F8FAFC' }}
              >
                {project.title}
              </h3>
              
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#94A3B8' }}>
                {project.description}
              </p>

              <div className="flex items-center justify-between text-sm mb-4" style={{ color: '#94A3B8' }}>
                <span>Client: {project.client}</span>
                <span>{new Date(project.start_date).toLocaleDateString()}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full border"
                    style={{ 
                      backgroundColor: '#0A0A0B',
                      color: '#94A3B8',
                      borderColor: '#374151'
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span 
                    className="px-2 py-1 text-xs rounded-full border"
                    style={{ 
                      backgroundColor: '#0A0A0B',
                      color: '#94A3B8',
                      borderColor: '#374151'
                    }}
                  >
                    +{project.tech.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
}