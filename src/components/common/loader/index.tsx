// src/components/CustomSkeletonLoader.tsx
import React, { useEffect } from "react";
import { CustomSkeleton } from "./CustomSkeleton";
import { useOnScreen } from "@/hooks/useOnScreen";

const CustomSkeletonLoader = ({ callback = () => {} }: { callback: any }) => {
  const [ref, isOnScreen] = useOnScreen({
    root: null, // or you can specify an ancestor element
    rootMargin: "0px",
    threshold: 0.1, // adjust as needed
  });

  useEffect(() => {
    if (isOnScreen) {
      callback();
    }
  }, [isOnScreen]);

  return (
    <div className="space-y-2" id="list-loader" ref={ref}>
      <CustomSkeleton width="150px" />
      <CustomSkeleton width="200px" />
      <CustomSkeleton width="250px" />
      <CustomSkeleton width="350px" />
    </div>
  );
};

export default CustomSkeletonLoader;
