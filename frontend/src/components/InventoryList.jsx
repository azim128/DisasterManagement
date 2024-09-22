import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import { categories } from "../utils/enums";
import Button from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const InventoryList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    sort: "asc",
    category: "",
  });

  const { data, loading, error } = useFetchData("/api/v1/inventory", filters);

  const handleFilterChange = (key, value) => {
    console.log(`Changing ${key} to ${value}`); // Check if this logs on select change
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        [key]: value,
        page: key !== "page" ? 1 : value,
      };
      console.log("New filters:", newFilters); // Check the updated filters
      return newFilters;
    });
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          handleFilterChange("page", Math.max(1, filters.page - 1))
        }
        disabled={filters.page === 1 || loading}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span className="text-sm">Page {filters.page}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleFilterChange("page", filters.page + 1)}
        disabled={
          !data || filters.page >= data.pagination.totalPages || loading
        }
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory Items</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          disabled={loading}
          className="w-full  p-2 border rounded"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          disabled={loading}
          className="w-full  p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select
          value={filters.pageSize.toString()}
          onChange={(e) =>
            handleFilterChange("pageSize", parseInt(e.target.value))
          }
          disabled={loading}
          className="w-full  p-2 border rounded"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.data.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {item.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> $
                    {item.price.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {item.category}
                  </p>
                  <p>
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Updated:</span>{" "}
                    {new Date(item.updatedAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data && renderPagination()}
    </div>
  );
};

export default InventoryList;
