import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  Skeleton,
  SkeletonText,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import useFetchData from "../hooks/useFetchData";

const PurchaseHistory = () => {
  const { token } = useAuth();
  const { data, error } = useFetchData(
    "/api/v1/volunteer/inventory/purchase/",
    {},
    { Authorization: `Bearer ${token}` }
  );

  const renderTableContent = () => {
    if (error) {
      return (
        <Tr>
          <Td colSpan={7}>
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          </Td>
        </Tr>
      );
    }

    if (!data) {
      return Array.from({ length: 5 }).map((_, index) => (
        <Tr key={index}>
          {Array.from({ length: 7 }).map((_, cellIndex) => (
            <Td key={cellIndex}>
              <SkeletonText noOfLines={1} />
            </Td>
          ))}
        </Tr>
      ));
    }

    if (data.data.length === 0) {
      return (
        <Tr>
          <Td colSpan={7}>
            <Text>No purchase history available.</Text>
          </Td>
        </Tr>
      );
    }

    return data.data.map((purchase) => (
      <Tr key={purchase.id}>
        <Td>{purchase.id}</Td>
        <Td>{purchase.item.name}</Td>
        <Td>{purchase.quantity}</Td>
        <Td>${purchase.item.price.toFixed(2)}</Td>
        <Td>${(purchase.quantity * purchase.item.price).toFixed(2)}</Td>
        <Td>{purchase.item.category}</Td>
        <Td>{new Date(purchase.createdAt).toLocaleString()}</Td>
      </Tr>
    ));
  };

  return (
    <Box p={5}>
      <Skeleton isLoaded={!!data}>
        <Heading mb={5}>Purchase History</Heading>
      </Skeleton>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Item</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Total</Th>
            <Th>Category</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>{renderTableContent()}</Tbody>
      </Table>
    </Box>
  );
};

export default PurchaseHistory;
