import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import fetchHomeFeedProjectsService from "../../services/fetchHomeFeedProjects";
import ProjectCardComponent from "../ProjectCardComponent/ProjectCardComponent";
import styles from "./HomeFeedProjectsComponent.module.css";
import useHomeFeedResetContext from "@/hooks/useHomeFeedResetContext";

const HomeFeedProjectsComponent = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchTerm, selectedTag } = useHomeFeedResetContext();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedProjects = await fetchHomeFeedProjectsService();
        setProjects(fetchedProjects);
      } catch {
        setError("Failed to fetch projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const lowercasedSearchTerm = debouncedSearchTerm?.toLowerCase();
    return (projects || []).filter((project) => {
      const matchesSearchTerm = project.title
        ?.toLowerCase()
        .includes(lowercasedSearchTerm);
      const matchesSelectedTag =
        selectedTag === "All" ||
        (project.tags &&
          project.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          ));
      return matchesSearchTerm && matchesSelectedTag;
    });
  }, [debouncedSearchTerm, selectedTag, projects]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.home_feed_projects_container}>
      <ProjectCardComponent
        filteredProjects={filteredProjects}
        isLoading={loading}
      />
    </div>
  );
};

HomeFeedProjectsComponent.propTypes = {
  searchTerm: PropTypes.string,
  selectedTag: PropTypes.string,
};

export default HomeFeedProjectsComponent;
