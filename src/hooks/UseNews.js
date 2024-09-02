import React from "react";
import { useQuery } from "react-query";
import Api from "../api";

const useNews = () => {
  const [open, setOpen] = React.useState(false);
  const [selectItem, setSelectedItem] = React.useState({});

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // API chaqiradigan funksiya
  const allUsers = async () => {
    try {
      const res = await Api.get("/news/admin/list?limit=10&page=1");
      return res.data.data; // Ma'lumotlarni qaytaramiz
    } catch (error) {
      console.log(error);
      throw error; // Xatoni tashlab yuboramiz, shunda `useQuery` uni ko'rishi mumkin
    }
  };

  const handleEdit = (item) => {
    handleClickOpen();
    setSelectedItem(item);
  };

  // useQuery chaqirishi
  const response = useQuery("news", allUsers);

  // Zarur bo'lgan qiymatlarni qaytarish
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
  };
};

export default useNews;
