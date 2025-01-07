import React from "react";
import styles from "../TagSelectComponent/TagSelectComponent.module.css";
import ButtonComponent from "../../elements/ButtonComponent/ButtonComponent";

const TagSelectComponent = ({ tags, handleTagClick, selectedTags, error }) => {
  return (
    <div className={styles.tags_section}>
      <label className={styles.tags_label}>Tags <span className={styles.user_instruction}>(Select upto 3 tags)</span></label>
      <div class="tags_container">
        {tags.map((tag) => (
          <ButtonComponent
            key={tag}
            type="button"
            className={`${styles.tag_button} ${
              selectedTags.includes(tag) ? styles.selected : ""
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </ButtonComponent>
        ))}
      </div>
      {error && <p className={styles.error_message}>{error}</p>}
    </div>
  );
};

export default TagSelectComponent;
