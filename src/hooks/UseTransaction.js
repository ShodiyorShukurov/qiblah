import React from "react";
import { useQuery, } from "react-query";
import Api from "../api";

const useTransaction = () => {
  const [next, setNext] = React.useState(1);

  /**GET USERS**/
  const transactionsData = async () => {
    try {
      const res = await Api.get(`/transactions?limit=50&page=${next}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const response = useQuery(["transactions", next], transactionsData, {
    keepPreviousData: true,
    enabled: next > 0,
  });

  return {
    data: response.data,
    isLoading: response.isLoading,
    error: response.error,
    next,
    setNext,
  };
};

export default useTransaction;
