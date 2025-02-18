import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError, AxiosRequestConfig } from "axios";

// Function to send a POST request
const addData = async <T, R>(endpoint: string, postData: T, requestConfig?: AxiosRequestConfig): Promise<R> => {
  const { data } = await axiosInstance.post<R>(endpoint, postData, requestConfig);
  return data;
};

// Custom Hook for adding data
const useAdd = <T, R>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ endpoint, postData, requestConfig }: { endpoint: string; postData: T; requestConfig?: AxiosRequestConfig }) =>
      addData<T, R>(endpoint, postData, requestConfig),

    onSuccess: (_data, variables) => {
      // ✅ Automatically refresh the cache for this endpoint
      queryClient.invalidateQueries({ queryKey: [variables.endpoint] });

      console.log("Data added successfully!");
    },

    onError: (error: AxiosError) => {
      console.error("Error adding data:", error.response?.data || error.message);
    },
  });
};

export default useAdd;
