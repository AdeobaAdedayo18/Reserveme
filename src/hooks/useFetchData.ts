import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { AxiosRequestConfig } from "axios";

const fetchData = async <T>(endpoint: string, requestConfig?: AxiosRequestConfig) => {
  const { data } = await axiosInstance.get<T>(endpoint, requestConfig);
  console.log("fetching data");
  
  return data;
};

const useFetchData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig) => {
  return useQuery({
    queryKey: [endpoint], // Cache key
    queryFn: () => fetchData<T>(endpoint, requestConfig),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 2, // Retry twice before failing
  });
};

export default useFetchData;
