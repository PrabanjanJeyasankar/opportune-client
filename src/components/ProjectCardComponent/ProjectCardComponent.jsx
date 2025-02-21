import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../../elements/ImageComponent/ImageComponent";
import ShareIconSvg from "../../svg/ShareIconSvg/ShareIconSvg";
import UpvoteIconSvg from "../../svg/UpvoteIconSvg/UpvoteIconSvg";
import { Skeleton } from "../ui/skeleton";
import styles from "./ProjectCardComponent.module.css";
import NumberFlow from "@number-flow/react";

const ProjectCardComponent = ({ filteredProjects, isLoading }) => {
  return (
    <div className={styles.initial_project_whole_container}>
      <div className={styles.project_display_container}>
        {isLoading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <div className={styles.no_results}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="100"
              height="100"
              className={styles.clock_svg}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ddd"
                strokeWidth="5"
                fill="none"
              />
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="20"
                stroke="#555"
                strokeWidth="4"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="50"
                y1="50"
                x2="75"
                y2="50"
                stroke="#888"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>

            <p>
              &quot;No projects here... yet! It&apos;s like an empty canvas
              waiting for your masterpiece!&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className={styles.skeleton_project_card_container}>
    <Skeleton className={styles.skeleton_project_card_image} />
    <Skeleton className={styles.skeleton_project_card_title} />
    <Skeleton className={styles.skeleton_project_card_tags} />
    <Skeleton className={styles.skeleton_project_card_description} />
  </div>
);
const ProjectCard = ({ project }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const navigate = useNavigate();
  const handleUpvoteClick = () => {
    setIsUpvoted(!isUpvoted);
  };

  const handleCardClick = () => {
    navigate(`/project-details`, { state: { project } });
  };

  return (
    <div className={styles.project_card_container} onClick={handleCardClick}>
      <div className={styles.project_card_image}>
        <ImageComponent
          className={styles.image_template}
          src={project.thumbnailUrl}
          alt={`Project ${project.projectTitle}`}
        />
      </div>
      <div className={styles.project_card_content}>
        <div className={styles.project_card_title}>{project.title}</div>
        <div className={styles.project_card_tags}>
          {project.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className={styles.project_card_tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.project_card_description}>
          {project.description}
        </div>
        <div className={styles.project_card_buttons}>
          <div
            className={`${styles.upvotes} ${isUpvoted ? styles.upvoted : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleUpvoteClick();
            }}
          >
            <UpvoteIconSvg
              className={styles.upvote_icon}
              style={{
                stroke: isUpvoted ? "#7DFF40" : "white",
                fill: isUpvoted ? "#7DFF40" : "none",
              }}
            />
            <span>
              <NumberFlow
                value={
                  isUpvoted ? project.upvoteCount + 1 : project.upvoteCount
                }
                format={{ notation: "compact" }}
              />
            </span>
          </div>

          <ShareIconSvg className={styles.share_icon} />
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    description: PropTypes.string,
    upvoteCount: PropTypes.number,
    projectTitle: PropTypes.string,
  }).isRequired,
};

ProjectCardComponent.propTypes = {
  filteredProjects: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ProjectCardComponent;
