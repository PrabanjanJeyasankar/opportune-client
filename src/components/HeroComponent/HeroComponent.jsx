import React, { useEffect, useState } from "react";
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
import ProjectDisplayComponent from "../ProjectDisplayComponent/ProjectDisplayComponent";

function HeroComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      //To move rocks in the opposite direction to the mouse direction
      // const offsetX = (0.5 - x / windowWidth) * 100
      // const offsetY = (0.5 - y / windowHeight) * 100

      const rocks = document.querySelectorAll(`.${styles.floating_rock}`);
      rocks.forEach((rock) => {
        // Get the position of the rock in the DOM
        const rockRect = rock.getBoundingClientRect();
        const rockCenterX = rockRect.left + rockRect.width / 2;
        const rockCenterY = rockRect.top + rockRect.height / 2;

        // Calculate the distance between the mouse position and the rock center
        const distance = Math.sqrt(
          (x - rockCenterX) ** 2 + (y - rockCenterY) ** 2
        );

        // value that calculates how close you want the mouse to be
        const threshold = 300;

        // If the mouse is within the threshold, move the rock
        if (distance < threshold) {
          // To move the rock repelling agains the mouse movement
          const repelX = ((rockCenterX - x) / windowWidth) * 130;
          const repelY = ((rockCenterY - y) / windowHeight) * 130;

          rock.style.transition = "transform 0.5s ease-out";
          rock.style.transform = `translate(${repelX}px, ${repelY}px)`;
        } else {
          // Reset the transformation if the mouse is not near the rock
          rock.style.transform = `translate(0px, 0px)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <section className={styles.hero_section}>
        <ImageComponent
          src={Rock1}
          alt="Rock 1"
          className={`${styles.floating_rock} ${styles.rock1}`}
        />

        <ImageComponent
          src={Rock3}
          alt="Rock 3"
          className={`${styles.floating_rock} ${styles.rock3}`}
        />
        <div className="title_section_one">
          <h1 className={styles.hero_title}>
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
        <div className={styles.search_container}>
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
        {/* <div>
          sort // pannitruken boss
        </div> */}
        <ProjectDisplayComponent searchTerm={searchTerm} />
        {/* <ImageComponent
                    src={Rock7}
                    alt='Rock 7'
                    className={`${styles.floating_rock} ${styles.rock7}`}
                />  
                <ImageComponent
                    src={Rock8}
                    alt='Rock 8'
                    className={`${styles.floating_rock} ${styles.rock8}`}
                /> */}
      </section>
    </>
  );
}

export default HeroComponent;
