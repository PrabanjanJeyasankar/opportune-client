import React, { useMemo,useState,useEffect } from 'react';
import styles from './ProjectDisplayComponent.module.css';
import projects from '../../data/data';
import ImageComponent from '../../elements/ImageComponent/ImageComponent';

const ProjectDisplayComponent = ({ searchTerm }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
 
  const filteredProjects = useMemo(() => {
    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();
    return projects.filter((project) =>
      project.projectTitle.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [debouncedSearchTerm, projects]);

  return (
    <div className={styles.initialProject_whole_container}>
      <div className={styles.project_display_container}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div key={index} className={styles.projectCard_container}>
              <div className={styles.projectCard_image}>
                <ImageComponent
                  className={styles.image_template}
                  src={project.src}
                  alt={`Project ${project.projectTitle}`}
                />
              </div>
              <div className={styles.projectCard_content}>
                <div className={styles.projectCard_title}>{project.projectTitle}</div>
                <div className={styles.projectCard_tags}>
                  {project.techStackTags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.projectCard_tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.projectCard_description}>
                  {project.description}
                </div>
                <div className={styles.projectCard_buttons}>
                  <svg
                    className={styles.upvote_icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4l8 8h-6v8h-4v-8H4l8-8z" />
                  </svg>
                  <span>{project.upvotes}</span>
                  <svg
                    className={styles.share_icon}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.no_results}>No projects found.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectDisplayComponent;
