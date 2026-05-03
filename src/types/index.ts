export interface Quote {
  id: number;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface PaginatedQuotesData {
  page: number;
  limit: number;
  totalPages: number;
  previousPage: boolean;
  nextPage: boolean;
  totalItems: number;
  currentPageItems: number;
  data: Quote[];
}

export interface QuotesApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PaginatedQuotesData;
}
