"use client";
import { useState } from "react";
import styles from "./styles.module.css";

function teste() {
  console.log("teste");
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={isOpen ? styles.open : styles.close}>
        <img src="https://pbs.twimg.com/media/FEyAOL0X0AYWGan.jpg" />
      </div>
      <button
        className={styles.button}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? "click me" : "love you"}
      </button>
    </div>
  );
}
