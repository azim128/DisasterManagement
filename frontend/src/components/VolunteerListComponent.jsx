import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorModeValue,
  Skeleton,
  IconButton,
  TableContainer,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Users } from "lucide-react";
import useFetchData from "../hooks/useFetchData";

const VolunteerListComponent = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const { data, loading, error } = useFetchData("/api/v1/user/get-volunteers", {
    page,
    limit,
  });

  const handleNextPage = () => {
    if (page < data?.pagination?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFirstPage = () => setPage(1);
  const handleLastPage = () => setPage(data?.pagination?.totalPages || 1);

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const volunteers = data?.volunteers || [];
  const pagination = data?.pagination || {};

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={6}
      boxShadow="md"
      borderWidth={1}
      borderColor={borderColor}
    >
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <HStack>
            <Users size={24} />
            <Heading size="lg">Volunteer List</Heading>
          </HStack>
          <HStack>
            <Text fontSize="sm" color={textColor}>Show:</Text>
            <Select size="sm" w="auto" value={limit} onChange={handleLimitChange}>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </Select>
          </HStack>
        </Flex>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading
                ? Array.from({ length: limit }).map((_, index) => (
                    <Tr key={index}>
                      <Td><Skeleton height="20px" /></Td>
                      <Td><Skeleton height="20px" /></Td>
                      <Td><Skeleton height="20px" /></Td>
                      <Td><Skeleton height="20px" /></Td>
                    </Tr>
                  ))
                : volunteers.map((volunteer) => (
                    <Tr key={volunteer.user_id}>
                      <Td>{volunteer.name}</Td>
                      <Td>{volunteer.email}</Td>
                      <Td>{volunteer.phone_number}</Td>
                      <Td>{volunteer.status}</Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </TableContainer>

        {error && <Text color="red.500">Error: {error}</Text>}

        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <IconButton
              icon={<ChevronsLeft size={18} />}
              aria-label="First Page"
              onClick={handleFirstPage}
              isDisabled={page === 1}
              size="sm"
            />
            <IconButton
              icon={<ChevronLeft size={18} />}
              aria-label="Previous Page"
              onClick={handlePrevPage}
              isDisabled={page === 1}
              size="sm"
            />
          </HStack>

          <Text fontSize="sm" color={textColor}>
            Page {pagination.currentPage} of {pagination.totalPages}
          </Text>

          <HStack spacing={2}>
            <IconButton
              icon={<ChevronRight size={18} />}
              aria-label="Next Page"
              onClick={handleNextPage}
              isDisabled={page >= pagination.totalPages}
              size="sm"
            />
            <IconButton
              icon={<ChevronsRight size={18} />}
              aria-label="Last Page"
              onClick={handleLastPage}
              isDisabled={page >= pagination.totalPages}
              size="sm"
            />
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default VolunteerListComponent;