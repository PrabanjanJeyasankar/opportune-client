const ProjectDetailsValidationFrom = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = "Title is required.";
  } else if (formData.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters long.";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required.";
  } else if (formData.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters long.";
  }

  if (!formData.thumbnail) {
    errors.thumbnail = "Thumbnail is required.";
  } else if (formData.thumbnail.size > 2 * 1024 * 1024) {
    errors.thumbnail = "Thumbnail size must not exceed 2MB.";
  }

  if (!formData.tags || formData.tags.length === 0) {
    errors.tags = "At least one tag must be selected.";
  }

  if (!formData.githubLink?.trim()) {
    errors.githubLink = "GitHub link is required.";
  } else if (!/^https?:\/\/.+/.test(formData.githubLink.trim())) {
    errors.githubLink = "Invalid URL format for GitHub link.";
  }

  if (formData.hostedLink) {
    if (!/^https?:\/\/.+/.test(formData.hostedLink.trim())) {
      errors.hostedLink = "Invalid URL format for live demo.";
    }
  }

  if (formData.documentation) {
    if (!/^https?:\/\/.+/.test(formData.documentation.trim())) {
      errors.documentation = "Invalid URL format for documentation.";
    }
  }

  return errors;
};

export default ProjectDetailsValidationFrom;
