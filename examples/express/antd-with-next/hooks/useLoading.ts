import { useState } from "react";

const useLoading = (state: boolean = false) => {
  const [loading, setLoading] = useState(state);

  function showLoading() {
    setLoading(true);
  }

  function hideLoading() {
    setLoading(false);
  }

  return {
    loading,
    setLoading,
    hideLoading,
    showLoading
  };
};

export default useLoading;
