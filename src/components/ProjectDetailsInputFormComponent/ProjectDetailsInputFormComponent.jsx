import React, { useState } from "react";
import ButtonComponent from "../../elements/ButtonComponent/ButtonComponent";
import styles from "../ProjectDetailsInputFormComponent/ProjectDetailsInputFormComponent.module.css";
import InputComponent from "../../elements/InputComponent/InputComponent";
import ProjectDetailsValidationFrom from "../../utils/ProjectDetailsValidationFrom";
import ThumbnailUploadComponent from '../ThumbnailUploadComponent/ThumbnailUploadComponent';
import TagSelectComponent from "../TagSelectComponent/TagSelectComponent";

const ProjectDetailsInputFormComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    tags: [],
    githubLink: "",
    hostedLink: "",
    documentation: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, type, files } = event.target;

    if (type === "file") {
      if (files && files[0]) {
        if (files[0].size > 2 * 1024 * 1024) {
          alert("File size should not exceed 2MB.");
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
          }));
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.value,
      }));
    }
  };

  const handleTagClick = (tag) => {
    setFormData((prevData) => {
      let newTags = [...prevData.tags];

      if (newTags.includes(tag)) {
        newTags = newTags.filter((t) => t !== tag);
      } else if (newTags.length < 3) {
        newTags.push(tag);
      }

      return { ...prevData, tags: newTags };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = ProjectDetailsValidationFrom(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted", formData);
      setFormData({
        title: "",
        description: "",
        thumbnail: null,
        tags: [],
        githubLink: "",
        hostedLink: "",
        documentation: "",
      });
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.form_wrapperr}>
          <h2 className={styles.form_title}>Submit Your Project</h2>
          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Title</label>
            <InputComponent
              className={styles.input_field}
              placeholder="Enter project title"
              name="title"
              value={formData.title}
              label="Title"
              onChange={handleInputChange}
              error={errors.title}
            />
            {errors.title && (
              <p className={styles.error_message}>{errors.title}</p>
            )}

            <div className={styles.label}>Description</div>
            <InputComponent
              className={styles.textarea_field}
              placeholder="Enter project description"
              name="description"
              value={formData.description}
              label="Description"
              onChange={handleInputChange}
              error={errors.description}
            />
            {errors.description && (
              <p className={styles.error_message}>{errors.description}</p>
            )}

            <ThumbnailUploadComponent
              thumbnail={formData.thumbnail}
              handleInputChange={handleInputChange}
              error={errors.thumbnail}
            />

            <TagSelectComponent
              tags={["Tag1", "Tag2", "Tag3", "Tag4"]}
              handleTagClick={handleTagClick}
              selectedTags={formData.tags}
              error={errors.tags}
            />
            <div className={styles.label}>GithubLink</div>
            <InputComponent
              className={styles.input_field}
              placeholder="Enter GitHub repository URL"
              name="githubLink"
              value={formData.githubLink}
              label="GitHub Link"
              onChange={handleInputChange}
              error={errors.githubLink}
            />
            {errors.githubLink && (
              <p className={styles.error_message}>{errors.githubLink}</p>
            )}

            <div className={styles.label}>HostedLink</div>
            <InputComponent
              className={styles.input_field}
              placeholder="Enter live demo URL"
              name="hostedLink"
              value={formData.hostedLink}
              label="Hosted Link"
              onChange={handleInputChange}
              error={errors.hostedLink}
            />
            {errors.hostedLink && (
              <p className={styles.error_message}>{errors.hostedLink}</p>
            )}

            <div className={styles.label}>Documentation</div>
            <InputComponent
              className={styles.input_field}
              placeholder="Enter Documentation URL"
              name="documentation"
              value={formData.documentation}
              label="Documentation"
              onChange={handleInputChange}
              error={errors.documentation}
            />
            {errors.documentation && (
              <p className={styles.error_message}>{errors.documentation}</p>
            )}

            <ButtonComponent type="submit" className={styles.submit_button}>
              Submit Project
            </ButtonComponent>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsInputFormComponent;
