import React from "react";
import { useQuery, useQueryClient } from "react-query";
import Api from "../api";

const useNews = () => {
  const [open, setOpen] = React.useState(false);
  const [selectItem, setSelectedItem] = React.useState({});
  const [next, setNext] = React.useState(1);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [id, setId] = React.useState(null);

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
      throw error;
    }
  };

  /**EDIT FUNCTION**/
  const handleEdit = (item) => {
    handleClickOpen();
    setSelectedItem(item);
  };

  /**DELETE FUNCTION**/

  const openDeleteModal = (id) => {
    setId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setId(null);
  };

  const handleDelete = async () => {
    const data = { news_id: Number(id) };
    try {
      const res = await Api.delete("/news/delete", { data });
      if (res.data) {
        setDeleteModal(false);
        queryClient.invalidateQueries("news");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
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
    openDeleteModal,
    closeDeleteModal,
    deleteModal,
    handleDelete,
  };
};

export default useNews;
