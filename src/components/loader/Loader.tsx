import styles from "./Loader.module.scss";

export const Loader = () => (
  <div className={styles.Loader} data-cy="loader">
    <div className={styles.loaderContent} />
    <div className={styles.loadingMessage}>Loading data, please wait...</div>
  </div>
);
