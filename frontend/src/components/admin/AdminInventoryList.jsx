import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    useToast,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { useAuth } from "../../context/AuthContext";
  import useFetchData from "../../hooks/useFetchData";
  import { apiUrl } from "../../config/variables";
  
  const AdminInventoryList = () => {
    const [filters, setFilters] = useState({
      page: 1,
      pageSize: 10,
      sort: "asc",
      category: "",
    });
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [initialItem, setInitialItem] = useState(null); // Store the initial state
    const { data, loading, error, refetch } = useFetchData(
      "/api/v1/inventory",
      filters
    );
    const { token } = useAuth(); // Get token for authorization
    const toast = useToast();
  
    const handleUpdateClick = (item) => {
      setSelectedItem(item);
      setInitialItem(item); // Store initial state for comparison
      setIsUpdateModalOpen(true);
    };
  
    const handleDeleteClick = async (id) => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/admin/inventory/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          toast({
            title: "Item deleted successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          refetch();
        } else {
          toast({
            title: "Failed to delete item.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error deleting item.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
  
    const handleUpdateSubmit = async () => {
      const updatedData = {};
  
      // Only include changed fields
      if (selectedItem.name !== initialItem.name) {
        updatedData.name = selectedItem.name;
      }
      if (selectedItem.description !== initialItem.description) {
        updatedData.description = selectedItem.description;
      }
      if (selectedItem.quantity !== initialItem.quantity) {
        updatedData.quantity = parseInt(selectedItem.quantity, 10);
      }
      if (selectedItem.price !== initialItem.price) {
        updatedData.price = parseFloat(selectedItem.price);
      }
      if (selectedItem.category !== initialItem.category) {
        updatedData.category = selectedItem.category;
      }
  
      if (Object.keys(updatedData).length === 0) {
        toast({
          title: "No changes detected.",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        setIsUpdateModalOpen(false);
        return;
      }
  
      try {
        const response = await fetch(`${apiUrl}/api/v1/admin/inventory/${selectedItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          toast({
            title: "Item updated successfully.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          refetch();
          setIsUpdateModalOpen(false);
        } else {
          const errorData = await response.json();
          toast({
            title: "Failed to update item.",
            description: errorData.message || "An error occurred.",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error updating item.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    };
  
    const handleChange = (e) => {
      setSelectedItem({
        ...selectedItem,
        [e.target.name]: e.target.value,
      });
    };
  
    return (
      <>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} height="200px" borderRadius="md" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Category: {item.category}</p>
                <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>
                <Button
                  onClick={() => handleUpdateClick(item)}
                  colorScheme="blue"
                  size="sm"
                  className="mr-2"
                >
                  Update
                </Button>
                <Button
                  onClick={() => handleDeleteClick(item.id)}
                  colorScheme="red"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
  
        {/* Update Modal */}
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Item</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Name"
                name="name"
                value={selectedItem?.name || ""}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Description"
                name="description"
                value={selectedItem?.description || ""}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Quantity"
                name="quantity"
                type="number" // Ensure quantity is a number input
                value={selectedItem?.quantity || ""}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Price"
                name="price"
                type="number" // Ensure price is a number input
                step="0.01" // Allow decimals for price
                value={selectedItem?.price || ""}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Category"
                name="category"
                value={selectedItem?.category || ""}
                onChange={handleChange}
                mb={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleUpdateSubmit} colorScheme="blue">
                Save
              </Button>
              <Button onClick={() => setIsUpdateModalOpen(false)} ml={3}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AdminInventoryList;
  