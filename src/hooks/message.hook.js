import { useCallback } from "react";
import toast from "react-hot-toast";

export const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      toast.success(text);
    }
  }, []);
};
