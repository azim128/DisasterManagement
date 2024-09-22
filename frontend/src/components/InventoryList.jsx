import {
  ChakraProvider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
  Spinner,
  Text,
  Skeleton
} from "@chakra-ui/react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { apiUrl } from "../config/variables";
import { useAuth } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";
import Button from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const InventoryList = ({ showPurchaseButton = false }) => {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    sort: "asc",
    category: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { data, loading, error,refetch  } = useFetchData("/api/v1/inventory", filters);
  const { token } = useAuth();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value,
    }));
  };

  const handlePurchaseClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    onOpen();
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/volunteer/inventory/purchase/`,
        { itemId: selectedItem.id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Purchase successful",
        description: `You have purchased ${quantity} ${selectedItem.name}(s).`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      refetch();
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: error.response?.data?.message || "An error occurred during the purchase.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsProcessing(false);
    }
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
    <ChakraProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Inventory Items</h1>

        {/* Filters and other existing code... */}

        {error && <p className="text-red-500 mb-4">Error: {error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height="200px" borderRadius="md" />
          ))}
        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.description}
                  </p>
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
                  {showPurchaseButton && (
                    <Button
                      className="mt-4"
                      onClick={() => handlePurchaseClick(item)}
                    >
                      Purchase Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {data && renderPagination()}

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Purchase {selectedItem?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Text>Enter the quantity you wish to purchase:</Text>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  isDisabled={isProcessing}
                />
                {isProcessing && (
                  <VStack>
                    <Spinner size="xl" />
                    <Text>Processing your purchase...</Text>
                  </VStack>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handlePurchase}
                isDisabled={isProcessing}
                isLoading={isProcessing}
                loadingText="Purchasing..."
              >
                Confirm Purchase
              </Button>
              <Button variant="ghost" onClick={onClose} isDisabled={isProcessing}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
};

export default InventoryList;
