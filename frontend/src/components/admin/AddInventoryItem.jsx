import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { apiUrl } from "../../config/variables";
import { useAuth } from "../../context/AuthContext";

const AddInventoryItem = () => {
  const { token } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        quantity: parseInt(formData.quantity, 10),
        price: parseFloat(formData.price),
      };

      const response = await axios.post(
        `${apiUrl}/api/v1/admin/inventory`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Item added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Reset form after successful submission
        setFormData({
          name: "",
          description: "",
          quantity: 0,
          price: 0,
          category: "",
        });
        setIsModalOpen(false); // Close modal after submission
      } else {
        throw new Error(response.data.message || "Failed to add item");
      }
    } catch (error) {
      toast({
        title: "Error adding item",
        description: error.message || "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="500px"  padding={5}>
      <Button onClick={() => setIsModalOpen(true)} colorScheme="blue">
        Add Item
      </Button>

      {/* Add Item Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Inventory Item</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter item name"
                    isDisabled={loading}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter item description"
                    isDisabled={loading}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput min={0} isDisabled={loading}>
                    <NumberInputField
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                    />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Price</FormLabel>
                  <NumberInput min={0} precision={2} isDisabled={loading}>
                    <NumberInputField
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Select category"
                    isDisabled={loading}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Food">Food</option>
                    <option value="Emergency Supplies">
                      Emergency Supplies
                    </option>
                    <option value="Personal Protective Equipment">
                      Personal Protective Equipment
                    </option>
                    {/* Add more categories as needed */}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  width="full"
                  isLoading={loading}
                  isDisabled={loading}
                >
                  Add Item
                </Button>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsModalOpen(false)} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddInventoryItem;
