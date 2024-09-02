import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUsers } from "../../redux/userSlice";
import styles from "./Error.module.scss";
export const Error = () => {
  const { error } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  const handleRetry = () => {
    dispatch(fetchUsers());
  };
  return (
    <div className={styles.error}>
      Error: {error}
      <button className={styles.retryButton} onClick={handleRetry}>
        Try Again
      </button>
    </div>
  );
};
