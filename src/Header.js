import React from "react";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>DRINKS</h1>
            <p className={styles.description}>
                just search by cocktails and see<br />required ingredients
            </p>
        </div>
    );
}; 