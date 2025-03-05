import React from "react";
import InputComponent from "../../elements/InputComponent/InputComponent";
import ButtonComponent from "../../elements/ButtonComponent/ButtonComponent";
import TagSelectComponent from "../TagSelectComponent/TagSelectComponent";
import ThumbnailUploadComponent from "../ThumbnailUploadComponent/ThumbnailUploadComponent";
import styles from "../ProjectDetailsFormFieldsComponent/ProjectDetailsFormFieldsComponent.module.css";

const ProjectDetailsFormFieldsComponent = ({
    formData,
    errors,
    handleInputChange,
    handleTagClick,
    handleSubmit,
    loading,
    buttonLabel = "Submit Project",
    existingThumbnailUrl = null,
    headingTitle = "Submit your project",
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.form_wrapper}>
                <div className={styles.title_container}>
                    <h2 className={styles.form_title}>{headingTitle}</h2>
                    <h3 className={styles.form_subtitle}>
                        ( * are required field)
                    </h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <label className={styles.label}>Title *</label>
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
                            <p className={styles.error_message}>
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <div className={styles.label}>Description *</div>
                        <textarea
                            id="description"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="Enter project description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={8}
                        />
                        {errors.description && (
                            <p className={styles.error_message}>
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <div className={styles.label}>Problem Statement *</div>
                        <textarea
                            id="problemStatement"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="What problem does your project solve?"
                            name="problemStatement"
                            value={formData.problemStatement}
                            onChange={handleInputChange}
                            rows={5}
                        />
                        {errors.problemStatement && (
                            <p className={styles.error_message}>
                                {errors.problemStatement}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <div className={styles.label}>Problem Solution *</div>
                        <textarea
                            id="problemSolution"
                            className={`${styles.input_field} ${styles.textarea}`}
                            placeholder="How does your project solve this problem?"
                            name="problemSolution"
                            value={formData.problemSolution}
                            onChange={handleInputChange}
                            rows={5}
                        />
                        {errors.problemSolution && (
                            <p className={styles.error_message}>
                                {errors.problemSolution}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
                        <div className={styles.label}>Thumbnail *</div>
                        <ThumbnailUploadComponent
                            thumbnail={formData.thumbnail}
                            existingImageUrl={existingThumbnailUrl}
                            handleInputChange={handleInputChange}
                            error={errors.thumbnail}
                            placeholderText="Upload thumbnail (max 2MB)"
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TagSelectComponent
                            tags={["Tag1", "Tag2", "Tag3", "Tag4"]}
                            handleTagClick={handleTagClick}
                            selectedTags={formData.tags}
                            error={errors.tags}
                        />
                    </div>
                    <div className={styles.input_container}>
                        <div className={styles.label}>GithubLink *</div>
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
                            <p className={styles.error_message}>
                                {errors.githubLink}
                            </p>
                        )}
                    </div>
                    <div className={styles.input_container}>
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
                    </div>
                    <div className={styles.input_container}>
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
                    </div>
                    <ButtonComponent
                        type="submit"
                        className={styles.submit_button}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : buttonLabel}
                    </ButtonComponent>
                </form>
            </div>
        </div>
    );
};

export default ProjectDetailsFormFieldsComponent;
