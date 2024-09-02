import { AppDispatch } from "../redux/store";
import {
  setEmailFilter,
  setNameFilter,
  setPhoneFilter,
  setUsernameFilter,
} from "../redux/filterSlice";
import { User } from "../types/user";

interface Filters {
  name: string;
  username: string;
  email: string;
  phone: string;
}
export const matchesFilters = (user: User, filters: Filters): boolean => {
  return (
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );
};
export const filterType = (
  dispatch: AppDispatch,
  type: string,
  value: string
) => {
  switch (type) {
    case "name":
      dispatch(setNameFilter(value));
      break;
    case "email":
      dispatch(setEmailFilter(value));
      break;
    case "username":
      dispatch(setUsernameFilter(value));
      break;
    case "phone":
      dispatch(setPhoneFilter(value));
      break;
  }
};
