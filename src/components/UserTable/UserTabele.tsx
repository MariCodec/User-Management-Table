import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUsers } from "../../redux/userSlice";
import { filterType, matchesFilters } from "../../utils/filterUtils";
import { User } from "../../types/user";
import { useSearchParams } from "react-router-dom";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { Loader } from "../loader/Loader";
import { Error } from "../error/Error";
import styles from "./UserTable.module.scss";

export const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const filter = useSelector((state: RootState) => state.filter);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState({ email: "", phone: "" });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => matchesFilters(user, filter)));
  }, [users, filter]);

  useEffect(() => {
    const newParams: Record<string, string> = {};
    Object.keys(filter).forEach((key) => {
      if (filter[key as keyof typeof filter]) {
        newParams[key] = filter[key as keyof typeof filter];
      }
    });
    setSearchParams(newParams);
  }, [filter, setSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filterType(dispatch, name, value);
  };

  const handleCopy = (type: "email" | "phone", value: string) => {
    navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [type]: value }));
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableRow}>
            {["Name", "Username", "Email", "Phone"].map((header) => (
              <th key={header}>
                <div className={styles.headerContent}>
                  <span>{header}</span>
                  <input
                    type="text"
                    name={header.toLowerCase()}
                    placeholder={`Search by ${header.toLowerCase()}`}
                    value={
                      filter[header.toLowerCase() as keyof typeof filter] || ""
                    }
                    onChange={handleSearchChange}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Username">{user.username}</td>
              <td data-label="Email">
                {user.email}
                <span
                  className={copied.email === user.email ? styles.copied : ""}
                  data-tooltip="Copy email"
                  onClick={() => handleCopy("email", user.email)}
                >
                  {copied.email === user.email ? <LuCopyCheck /> : <LuCopy />}
                </span>
              </td>
              <td data-label="Phone">
                {user.phone}
                <span
                  className={copied.phone === user.phone ? styles.copied : ""}
                  data-tooltip="Copy phone"
                  onClick={() => handleCopy("phone", user.phone)}
                >
                  {copied.phone === user.phone ? <LuCopyCheck /> : <LuCopy />}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
