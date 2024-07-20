import { Skeleton } from "@/components/ui/skeleton";
import { ISkeletonProps } from "@/types";
export const CustomSkeleton = ({ width }: ISkeletonProps) => {
  return <Skeleton className={`h-4 w-[${width}]`} />;
};
