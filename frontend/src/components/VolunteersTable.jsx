import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { apiUrl } from "../config/variables";
import { useAuth } from "../context/AuthContext";
import useVolunteers from "../hooks/useVolunteers";

const VolunteersTable = () => {
  const [searchName, setSearchName] = useState("");
  const { token } = useAuth();
  const toast = useToast();

  const initialQueryParams = useMemo(
    () => ({
      name: "",
      role: "VOLUNTEER",
      status: "PENDING",
      page: 1,
      limit: 10,
    }),
    []
  );

  const { data, loading, error, updateQueryParams, refetch } = useVolunteers(
    initialQueryParams,
    token
  );

  const debouncedSearch = useCallback(
    debounce((value) => updateQueryParams({ name: value, page: 1 }), 300),
    [updateQueryParams]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchName(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleFilterChange = useCallback(
    (key, value) => {
      updateQueryParams({ [key]: value, page: 1 });
    },
    [updateQueryParams]
  );

  const handlePageChange = useCallback(
    (direction) => {
      updateQueryParams((prevParams) => ({
        page:
          direction === "next"
            ? prevParams.page + 1
            : Math.max(1, prevParams.page - 1),
      }));
    },
    [updateQueryParams]
  );

  const updateUserStatus = useCallback(
    async (userId, newStatus) => {
      try {
        await axios.put(
          `${apiUrl}/api/v1/admin/users/${userId}`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({
          title: "Status updated",
          description: `User status has been updated to ${newStatus}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch();
      } catch (error) {
        toast({
          title: "Error updating status",
          description:
            error.response?.data?.message ||
            "An error occurred while updating status",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [token, refetch, toast]
  );

  const showActionColumn = data.users.some((user) => user.role !== "ADMIN");

  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
      <Heading size="lg" mb={6}>
        Volunteers Management
      </Heading>
      <VStack spacing={4} align="stretch" mb={6}>
        <HStack spacing={4}>
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={handleSearchChange}
            flex={1}
          />
          <Select
            onChange={(e) => handleFilterChange("role", e.target.value)}
            w="200px"
          >
            <option value="ADMIN">Admin</option>
            <option value="VOLUNTEER">Volunteer</option>
          </Select>
          <Select
            onChange={(e) => handleFilterChange("status", e.target.value)}
            w="200px"
          >
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="DISABLED">Disabled</option>
          </Select>
        </HStack>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>Items per page:</Text>
          <NumberInput
            defaultValue={10}
            min={1}
            max={100}
            w="100px"
            onChange={(value) => handleFilterChange("limit", parseInt(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </VStack>

      {error && (
        <Box color="red.500" mb={4}>
          Error: {error}
        </Box>
      )}

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              {showActionColumn && <Th>Action</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {loading
              ? Array.from({ length: data.pagination?.limit || 10 }).map(
                  (_, index) => (
                    <Tr key={index}>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      {showActionColumn && (
                        <Td>
                          <Skeleton height="20px" />
                        </Td>
                      )}
                    </Tr>
                  )
                )
              : data.users.map((volunteer) => (
                  <Tr key={volunteer.user_id}>
                    <Td>{volunteer.name}</Td>
                    <Td>{volunteer.email}</Td>
                    <Td>{volunteer.phone_number}</Td>
                    <Td>{volunteer.role}</Td>
                    <Td>{volunteer.status}</Td>
                    {volunteer.role !== "ADMIN" && (
                      <Td>
                        <Select
                          value={volunteer.status}
                          onChange={(e) =>
                            updateUserStatus(volunteer.user_id, e.target.value)
                          }
                          size="sm"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="PENDING">Pending</option>
                          <option value="DISABLED">Disabled</option>
                        </Select>
                      </Td>
                    )}
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </Box>

      <Flex mt={6} justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => handlePageChange("prev")}
          isDisabled={data.pagination?.currentPage === 1 || loading}
        >
          Previous
        </Button>
        <Text>
          Page {data.pagination?.currentPage || 1} of{" "}
          {data.pagination?.totalPages || 1}
        </Text>
        <Button
          onClick={() => handlePageChange("next")}
          isDisabled={
            data.pagination?.currentPage === data.pagination?.totalPages ||
            loading
          }
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default VolunteersTable;
