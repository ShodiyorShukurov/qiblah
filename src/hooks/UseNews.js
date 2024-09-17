import React from "react";
import { useQuery, useQueryClient } from "react-query";
import Api from "../api";

const useNews = () => {
  const [open, setOpen] = React.useState(false);
  const [selectItem, setSelectedItem] = React.useState({});
  const [next, setNext] = React.useState(1);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**GET USERS**/
  const allUsers = async () => {
    try {
      const res = await Api.get(`/news/admin/list?limit=10&page=${next}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  const queryClient = useQueryClient();
  /**EDIT STATUS FUNCTION**/
  const handleEditStatus = async (status, id) => {
    const data = {
      news_id: id,
      status: status,
    };

    try {
      const res = await Api.put("/news/edit/status", data);
      if (res.data) {
        queryClient.invalidateQueries("news");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**EDIT FUNCTION**/
  const handleEdit = (item) => {
    handleClickOpen();
    setSelectedItem(item);
  };

  const response = useQuery("news", allUsers);

  return {
    data: response.data,
    isLoading: response.isLoading,
    error: response.error,
    open,
    handleClickOpen,
    handleClose,
    setOpen,
    handleEdit,
    selectItem,
    setSelectedItem,
    allUsers,
    setNext,
    next,
    handleEditStatus,
  };
};

export default useNews;
