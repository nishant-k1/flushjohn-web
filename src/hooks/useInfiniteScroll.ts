import { useState, useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  hasNextPage?: boolean;
  isFetching?: boolean;
}

interface UseInfiniteScrollReturn {
  targetRef: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
}

export const useInfiniteScroll = ({
  threshold = 0.1,
  rootMargin = "100px",
  hasNextPage = true,
  isFetching = false,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !hasNextPage || isFetching) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, hasNextPage, isFetching]);

  return { targetRef, isIntersecting };
};
