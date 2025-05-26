import styles from '../styles/Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.logo}>ZENØ</h1>
        <div className={styles.authButtons}>
          <Link href="/login" className={styles.authButton}>Login</Link>
          <Link href="/register" className={styles.authButton}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
