import ButtonComponent from '@/elements/ButtonComponent/ButtonComponent'
import ImageComponent from '@/elements/ImageComponent/ImageComponent'
import { NavLink } from 'react-router-dom'
import AppLogo from '../../assets/images/opportune_logo_svg.svg'
import UserImage1 from '../../assets/images/people_joined_already/user_1.webp'
import UserImage2 from '../../assets/images/people_joined_already/user_2.webp'
import UserImage3 from '../../assets/images/people_joined_already/user_3.webp'
import styles from './FooterComponent.module.css'

function FooterComponent() {
    return (
        <footer className={styles.footer_container}>
            <div className={styles.footer_cta}>
                <h1 className={styles.footer_heading}>
                    Why wait? Post projects people can't ignore and get hired!
                </h1>
                <div className={styles.footer_info}>
                    <div className={styles.image_group}>
                        <ImageComponent
                            src={UserImage3}
                            alt='User 1'
                            className={styles.user_avatar}
                        />
                        <ImageComponent
                            src={UserImage2}
                            alt='User 2'
                            className={styles.user_avatar}
                        />
                        <ImageComponent
                            src={UserImage1}
                            alt='User 3'
                            className={styles.user_avatar}
                        />
                    </div>
                    <p className={styles.footer_subtext}>
                        340+ people already joined
                    </p>
                </div>
                <ButtonComponent className={styles.footer_button}>
                    Post a project 🚀
                </ButtonComponent>
            </div>
            <div className={styles.footer_content}>
                <div className={styles.footer_left}>
                    <div className={styles.logo}>
                        <ImageComponent
                            src={AppLogo}
                            alt='Opportune Logo'
                            className={styles.logo_image}
                        />
                        <div className={styles.app_name}>Opportune</div>
                    </div>
                    <p className={styles.app_tag_line}>
                        GPAs Are Overrated, Get Hired by Projects Instead.
                    </p>
                    <a
                        href='https://github.com/PrabanjanJeyasankar/opportune-client'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.github_button}>
                        ⭐ Star us on GitHub
                    </a>
                </div>

                <div className={styles.footer_right}>
                    <div className={styles.quick_links}>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>
                                <NavLink to='/' className={styles.nav_link}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/about'
                                    className={styles.nav_link}>
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to='/feedback'
                                    className={styles.nav_link}>
                                    Feedback
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.footer_socials}>
                        <span>Follow us</span>
                        <ul>
                            <li>
                                <a
                                    href='https://twitter.com'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href='https://instagram.com'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className={styles.copyright_text}>
                © 2025 Opportune. All rights reserved.
            </p>
        </footer>
    )
}

export default FooterComponent
