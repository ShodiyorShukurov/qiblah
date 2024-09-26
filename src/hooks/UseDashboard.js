import { useQuery } from "react-query";
import Api from "../api";

const useDashboard = () => {
  // API chaqiradigan funksiya
  const allUsers = async () => {
    try {
      const res = await Api.get("/users/count");
      return res.data.data; // Ma'lumotlarni qaytaramiz
    } catch (error) {
      console.log(error);
      // Agar xato 401 bo'lsa, foydalanuvchini sahifani qayta yuklaydi
    //   if (error.response?.status === 401) {
    //     window.location.reload();
    //   }
      throw error; 
    }
  };

  // useQuery chaqirishi
  const response = useQuery("users", allUsers);

  // Konsolda natijalarni ko'rsatish
  console.log(response);

  // Zarur bo'lgan qiymatlarni qaytarish
  return {
    data: response.data,
    isLoading: response.isLoading,
    error: response.error,
  };
};

export default useDashboard;
