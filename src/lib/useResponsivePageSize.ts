"use client";

import { useEffect, useState } from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 900px)";

export function useResponsivePageSize(
  mobilePageSize: number,
  desktopPageSize: number,
) {
  const [pageSize, setPageSize] = useState(mobilePageSize);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updatePageSize = () => {
      setPageSize(mediaQuery.matches ? mobilePageSize : desktopPageSize);
    };

    updatePageSize();
    mediaQuery.addEventListener("change", updatePageSize);
    return () => mediaQuery.removeEventListener("change", updatePageSize);
  }, [desktopPageSize, mobilePageSize]);

  return pageSize;
}
