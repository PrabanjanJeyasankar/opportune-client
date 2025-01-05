import React from 'react';
import styles from '../InitialProjectsComponent/InitialProjectsComponent.module.css';
import InputComponent from '../../elements/InputComponent/InputComponent';
import dsavisualizer from '../../assets/images/ProjectTemplates/DSA_visualizer.png';
import projects from '../../data/data';
const InitialProjectsComponent = () => {
  return (
    <div className={styles.InitialProject_whole_container}>
      {/* Search Bar */}
      <div className={styles.search_container}>
        <InputComponent
          type="text"
          className={styles.search_input}
          placeholder="Search projects..."
        />
        <svg
          className={styles.search_icon}
          width="24"
          height="24"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4883 21.4883C17.735 21.4883 21.9883 17.235 21.9883 11.9883C21.9883 6.74158 17.735 2.48828 12.4883 2.48828C7.24158 2.48828 2.98828 6.74158 2.98828 11.9883C2.98828 17.235 7.24158 21.4883 12.4883 21.4883Z"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.0117 24.5117L20.9883 20.4883"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Project Cards */}
      <div className={styles.Project_display_container}>
  {projects.map((project, index) => (
    <div key={index} className={styles.ProjectCard_container}>
      <div className={styles.ProjectCard_image}>
        <img
          className={styles.image_template}
          src={project.src}
          alt={`Project ${project.projectTitle}`}
        />
      </div>
      <div className={styles.ProjectCard_content}>
        <div className={styles.ProjectCard_title}>{project.projectTitle}</div>
        <div className={styles.ProjectCard_tags}>
          {project.techStackTags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.ProjectCard_tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.ProjectCard_description}>
          {project.description}
        </div>
        {/* SVG Buttons */}
        <div className={styles.ProjectCard_buttons}>
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
          </svg><span>{project.upvotes}</span>
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
  ))}
</div>

    </div>
  );
};

export default InitialProjectsComponent;
