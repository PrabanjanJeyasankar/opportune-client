import React, { useState } from "react";
import InputComponent from "@/elements/InputComponent/InputComponent";
import ButtonComponent from "@/elements/ButtonComponent/ButtonComponent";
import styles from "../UpdateProfileComponent/UpdateProfileComponent.module.css";
import userProfileService from "@/services/userProfileservice";
import ReactModal from "react-modal";
import ImageComponent from "@/elements/ImageComponent/ImageComponent";
import { toast } from "@/hooks/use-toast";
import updateProfileValidation from "@/utils/updateProfileValidation";

const UpdateProfileComponent = () => {
  const [formData, setFormData] = useState({
    bio: "",
    portfolioLink: "",
    resumeLink: "",
    passedOutYear: "",
    accounts: [
      { domain: "linkedin", url: "" },
      { domain: "instagram", url: "" },
      { domain: "reddit", url: "" },
      { domain: "leetcode", url: "" },
      { domain: "hackerrank", url: "" },
      { domain: "hackerearth", url: "" },
      { domain: "codechef", url: "" },
      { domain: "geeksforgeeks", url: "" },
    ],
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setProfilePicture(files[0]);
  };

  const handleAccountChange = (index, value) => {
    setFormData((prev) => {
      const updatedAccounts = [...prev.accounts];
      updatedAccounts[index].url = value;
      return { ...prev, accounts: updatedAccounts };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = updateProfileValidation(formData);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const filteredAccounts = formData.accounts.filter(
      (account) => account.url.trim() !== ""
    );

    try {
      const response = await userProfileService.updateProfile({
        ...formData,
        profilePicture,
        accounts: filteredAccounts,
      });

      if (response.status === 200) {
        toast({
          description: "Profile updated successfully.",
        });
        setFormData({
          bio: "",
          portfolioLink: "",
          resumeLink: "",
          passedOutYear: "",
          accounts: [
            { domain: "linkedin", url: "" },
            { domain: "instagram", url: "" },
            { domain: "reddit", url: "" },
            { domain: "leetcode", url: "" },
            { domain: "hackerrank", url: "" },
            { domain: "hackerearth", url: "" },
            { domain: "codechef", url: "" },
            { domain: "geeksforgeeks", url: "" },
          ],
        });
        setProfilePicture(null);
        setErrors({});
      } else {
        setErrors(response.data.errors || {});
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const openPreviewModal = () => {
    if (profilePicture) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_wrapperr}>
        <div className={styles.title_container}>
          <h2 className={styles.form_title}>Update Your Profile</h2>
          <p>( * are required field)</p>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="bio" className={styles.label}>
            Bio *
          </label>
          <textarea
            id="bio"
            className={`${styles.input_field} ${styles.textarea}`}
            placeholder="Enter your bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={8}
          />
          {errors.bio && <p className={styles.error_message}>{errors.bio}</p>}

          <label htmlFor="portfolioLink" className={styles.label}>
            Portfolio Link *
          </label>
          <InputComponent
            id="portfolioLink"
            className={styles.input_field}
            placeholder="Enter your portfolio link"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleInputChange}
            error={errors.portfolioLink}
          />
          {errors.portfolioLink && (
            <p className={styles.error_message}>{errors.portfolioLink}</p>
          )}

          <label htmlFor="resumeLink" className={styles.label}>
            Resume Link *
          </label>
          <InputComponent
            id="resumeLink"
            className={styles.input_field}
            placeholder="Enter your resume link"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleInputChange}
            error={errors.resumeLink}
          />
          {errors.resumeLink && (
            <p className={styles.error_message}>{errors.resumeLink}</p>
          )}

          <label htmlFor="profile_picture_upload" className={styles.label}>
            Profile Picture
          </label>
          <div className={styles.thumbnail_upload}>
            <input
              id="profile_picture_upload"
              type="file"
              name="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="profile_picture_upload"
              className={styles.thumbnail_label}
            >
              {profilePicture ? (
                <div className={styles.thumbnail_preview_container}>
                  <ImageComponent
                    src={URL.createObjectURL(profilePicture)}
                    alt="Profile Picture Preview"
                    className={styles.thumbnail_preview}
                  />
                  <button
                    type="button"
                    className={styles.preview_button}
                    onClick={openPreviewModal}
                  >
                    Preview
                  </button>
                </div>
              ) : (
                <span className={styles.thumbnail_placeholder}>
                  Upload Profile Picture
                </span>
              )}
            </label>
            {errors.profilePicture && (
              <p className={styles.error_message}>{errors.profilePicture}</p>
            )}
          </div>

          <label htmlFor="passedOutYear" className={styles.label}>
            Passed Out Year *
          </label>
          <InputComponent
            id="passedOutYear"
            className={styles.input_field}
            placeholder="Enter your passed out year"
            name="passedOutYear"
            value={formData.passedOutYear}
            onChange={handleInputChange}
            error={errors.passedOutYear}
          />
          {errors.passedOutYear && (
            <p className={styles.error_message}>{errors.passedOutYear}</p>
          )}

          <label className={styles.label}>Accounts</label>
          <br></br>
          <br></br>
          {formData.accounts.map((account, index) => (
            <div key={index} className={styles.account_field}>
              <label htmlFor={`account_${index}`} className={styles.label}>
                {account.domain.charAt(0).toUpperCase() +
                  account.domain.slice(1)}
                {(account.domain === "linkedin" ||
                  account.domain === "leetcode") &&
                  " *"}
              </label>
              <InputComponent
                id={`account_${index}`}
                className={styles.input_field}
                placeholder={`Enter ${account.domain} URL`}
                value={account.url}
                onChange={(e) => handleAccountChange(index, e.target.value)}
                error={errors[`accounts_${index}`]}
              />
              {errors[`accounts_${index}`] && (
                <p className={styles.error_message}>
                  {errors[`accounts_${index}`]}
                </p>
              )}
            </div>
          ))}

          <ButtonComponent
            type="submit"
            className={styles.submit_button}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </ButtonComponent>
        </form>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thumbnail Preview"
        className={styles.modal_content}
        overlayClassName={styles.modal_overlay}
      >
        <button onClick={closeModal} className={styles.close_modal_button}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
            fill="#FFFFFF"
          >
            <path d="m332-285.33 148-148 148 148L674.67-332l-148-148 148-148L628-674.67l-148 148-148-148L285.33-628l148 148-148 148L332-285.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Zm0-66.67q139.33 0 236.33-97.33t97-236q0-139.33-97-236.33t-236.33-97q-138.67 0-236 97-97.33 97-97.33 236.33 0 138.67 97.33 236 97.33 97.33 236 97.33ZM480-480Z" />
          </svg>
        </button>
        {profilePicture && (
          <ImageComponent
            src={URL.createObjectURL(profilePicture)}
            alt="Thumbnail Preview in Modal"
            className={styles.thumbnail_preview}
          />
        )}
      </ReactModal>
    </div>
  );
};

export default UpdateProfileComponent;
