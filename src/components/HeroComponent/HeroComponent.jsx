import { useEffect } from "react";
import styles from "./HeroComponent.module.css";
import ImageComponent from "../../elements/ImageComponent/ImageComponent";
import Rock1 from "../../assets/images/rocks/rock_1.webp";
import Rock2 from "../../assets/images/rocks/rock_2.webp";
import Rock3 from "../../assets/images/rocks/rock_3.webp";
import Rock4 from "../../assets/images/rocks/rock_4.webp";
import Rock5 from "../../assets/images/rocks/rock_5.webp";
import Rock6 from "../../assets/images/rocks/rock_6.webp";
import Rock7 from "../../assets/images/rocks/rock_7.webp";
import Rock8 from "../../assets/images/rocks/rock_8.webp";
import InputComponent from "../../elements/InputComponent/InputComponent";
import handleMouseMove from "../../utils/handleMouseMove";
import TagFilterComponent from "../../elements/TagFilterComponent/TagFilterComponent";
import HomeFeedProjectsComponent from "../HomeFeedProjectsComponent/HomeFeedProjectsComponent";
import useHomeFeedResetContext from "@/hooks/useHomeFeedResetContext";

const HeroComponent = () => {
  const { searchTerm, setSearchTerm } = useHomeFeedResetContext();
  const { selectedTag, setSelectedTag } = useHomeFeedResetContext();


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const rockSelector = `.${styles.floating_rock}`;
    const mouseMoveListener = (e) => handleMouseMove(e, rockSelector);

    window.addEventListener("mousemove", mouseMoveListener);

    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, []);

  return (
    <>
      <section className={styles.hero_section}>
        <div className="title_section_one">
          <h1 className={styles.hero_title}>
            <ImageComponent
              src={Rock1}
              alt="Rock 1"
              className={`${styles.floating_rock} ${styles.rock1}`}
            />
            <ImageComponent
              src={Rock2}
              alt="Rock 2"
              className={`${styles.floating_rock} ${styles.rock2}`}
            />
            Your Projects
          </h1>
          <h1 className={styles.hero_title}>
            <ImageComponent
              src={Rock4}
              alt="Rock 4"
              className={`${styles.floating_rock} ${styles.rock4}`}
            />
            Their Opportunities
          </h1>
        </div>

        <p className={styles.hero_subtitle}>
          Upload your best projects here, Get noticed by your next HR.
          <ImageComponent
            src={Rock5}
            alt="Rock 5"
            className={`${styles.floating_rock} ${styles.rock5}`}
          />
        </p>

        <div className={styles.search_and_filters}>
          <div className={styles.search_container}>
            {/* <ImageComponent
                            src={Rock6}
                            alt='Rock 6'
                            className={`${styles.floating_rock} ${styles.rock6}`}
                        /> */}
            <InputComponent
              type="text"
              className={styles.search_input}
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
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
          <div className={styles.tag_filters}>
            <TagFilterComponent
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />

            {/* <ImageComponent
                            src={Rock3}
                            alt='Rock 3'
                            className={`${styles.floating_rock} ${styles.rock3}`}
                        /> */}
            <ImageComponent
              src={Rock8}
              alt="Rock 8"
              className={`${styles.floating_rock} ${styles.rock8}`}
            />
          </div>
        </div>
        <div className={styles.project_display}>
          <ImageComponent
            src={Rock7}
            alt="Rock 7"
            className={`${styles.floating_rock} ${styles.rock7}`}
          />
          <HomeFeedProjectsComponent />
        </div>
      </section>
    </>
  );
};

export default HeroComponent;
