import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import Logo from "../../../../assets/images/LightLogo.svg"
import clsx from "clsx";

function Header() {

    return (
        <header className={styles.navbar}>
            <nav className={styles.navbarContainer}>
                <Link className={styles.homeLink} to="/">
                    <div className={styles.navbarLogo}><img src={Logo} alt={"logo"}/></div>
                </Link>

                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <ul className={styles.navbarLinks}>
                        <>
                            <li className={styles.navbarItem}>
                                <Link className={styles.navbarLink} to="/teamproject/projects">
                                    Аналитика Teamproject
                                </Link>
                            </li>
                        </>
                    </ul>
                </div>

                {/*<div id="navbar-menu" aria-labelledby="navbar-toggle" className={styles.navbarLastContainer}>*/}
                {/*    <ul className={styles.navbarLinks}>*/}
                {/*        <li className={styles.navbarItem}>*/}
                {/*            <Link className={styles.navbarLink} to="/login">*/}
                {/*                Войти*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </nav>
        </header>
    )
}

export default Header;
