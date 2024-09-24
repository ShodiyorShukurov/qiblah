import React from "react";
import { useQuery, useQueryClient } from "react-query";
import Api from "../api";

const useUsers = () => {
  const [open, setOpen] = React.useState(false);
  const [selectItem, setSelectedItem] = React.useState({});
  const [userRoute, setUserRoute] = React.useState("users");
  const [user, setUser] = React.useState(50);
  const [next, setNext] = React.useState(1);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   const queryClient = useQueryClient();
  /**GET USERS**/
  const usersData = async () => {
    try {
      const res = await Api.get(`/${userRoute}/list?limit=${user}&page=${next}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleEdit = () => {
    
  }

  const response = useQuery(["users", next, user, userRoute], usersData, {
    keepPreviousData: true,
    enabled: next > 0 && user > 0,
  });

  return {
    data: response.data,
    isLoading: response.isLoading,
    error: response.error,
    setUserRoute,
    setUser,
    next,
    setNext,
  };
};

export default useUsers;
