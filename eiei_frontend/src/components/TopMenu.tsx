"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { useSession } from "next-auth/react";

export default function TopMenu() {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className={styles.menucontainer}>
            {/* Logo */}
            <Image
                src="/img/logo.png"
                className={styles.logo}
                width={0}
                height={0}
                sizes="100vh"
                alt="logo"
            />

            {/* Hamburger Button */}
            <div className={styles.hamburger} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Menu Items */}
            <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
                <TopMenuItem title="Companies" pageRef="/mainpage" />
                <TopMenuItem title="My Booking" pageRef="/myBooking" />
                <TopMenuItem title="My Profile" pageRef="/myProfile" />
                <li className={styles.auth}>
                    {session ? (
                        <Link href="/api/auth/signout">
                            <div>Sign-Out</div>
                        </Link>
                    ) : (
                        <Link href="/api/auth/signin">
                            <div>Sign-In</div>
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
}
