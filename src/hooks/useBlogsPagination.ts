import { useState, useEffect, useCallback } from "react";
import { apiBaseUrls } from "@/constants";

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImageS3?: {
    src: string;
    alt: string;
  };
  coverImageUnsplash?: {
    src: string;
    alt: string;
  };
  coverImage?: {
    // Legacy field for backward compatibility
    src: string;
    alt: string;
  };
  author?: string;
  createdAt: string;
  slug?: string;
}

interface BlogsResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface UseBlogsPaginationOptions {
  status?: string;
  search?: string;
  limit?: number;
  initialData?: Blog[];
  initialPagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface UseBlogsPaginationReturn {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loadMore: () => void;
  refresh: () => void;
  isFetchingMore: boolean;
}

export const useBlogsPagination = ({
  status = "published",
  search = "",
  limit = 12,
  initialData = [],
  initialPagination,
}: UseBlogsPaginationOptions = {}): UseBlogsPaginationReturn => {
  const [blogs, setBlogs] = useState<Blog[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(
    initialPagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: initialData.length,
      hasNextPage: false,
      hasPrevPage: false,
    }
  );

  const { API_BASE_URL } = apiBaseUrls;

  const fetchBlogs = useCallback(
    async (page: number, isLoadMore = false) => {
      try {
        if (!isLoadMore) {
          setLoading(true);
        } else {
          setIsFetchingMore(true);
        }
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          status,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (search) {
          params.append("search", search);
        }

        const response = await fetch(`${API_BASE_URL}/blogs?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: BlogsResponse = await response.json();

        if (result.success) {
          if (isLoadMore) {
            setBlogs((prev) => [...prev, ...result.data]);
          } else {
            setBlogs(result.data);
          }
          setPagination(result.pagination);
        } else {
          throw new Error("Failed to fetch blogs");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [API_BASE_URL, limit, status, search]
  );

  const loadMore = useCallback(() => {
    if (pagination.hasNextPage && !isFetchingMore && !loading) {
      fetchBlogs(pagination.currentPage + 1, true);
    }
  }, [
    fetchBlogs,
    pagination.hasNextPage,
    pagination.currentPage,
    isFetchingMore,
    loading,
  ]);

  const refresh = useCallback(() => {
    setBlogs([]);
    setPagination({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      hasNextPage: false,
      hasPrevPage: false,
    });
    fetchBlogs(1, false);
  }, [fetchBlogs]);

  useEffect(() => {
    if (!initialData.length) {
      fetchBlogs(1, false);
    }
  }, [fetchBlogs, initialData.length]);

  return {
    blogs,
    loading,
    error,
    hasNextPage: pagination.hasNextPage,
    hasPrevPage: pagination.hasPrevPage,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    totalItems: pagination.totalItems,
    loadMore,
    refresh,
    isFetchingMore,
  };
};
