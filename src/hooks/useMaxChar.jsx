import React from "react";
import useHead from "./useHead";

function useMaxChar() {
  const { setSnackbarData } = useHead();
  function maxLength(event, length) {
    if (event.target.value?.length > length) {
      setSnackbarData({
        status: true,
        message: `Maximum length must not exceed ${length} characters`,
        severity: "warning",
      });
      event.target.value = event.target.value?.slice(0, -1);
    }
  }
  return maxLength;
}

export default useMaxChar;
