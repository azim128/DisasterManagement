import {
  Box,
  Button,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import SkeletonLoader from "../ui/SkeletonLoader";
import { toNormalCase } from "../../utils/toNormalcase";
import { apiUrl } from "../../config/variables";

const statusEnum = ["PENDING", "APPROVED", "REJECTED", "ASSIGNED", "RESOLVED"];

const CrisisTable = () => {
  const { token } = useAuth(); // Get the token from useAuth
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); // Added state for limit
  const { data, loading, error, refetch } = useFetchData(
    `/api/v1/crisis?page=${currentPage}&limit=${limit}`,
    {
      status: statusFilter,
    }
  );

  const bgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    refetch();
  }, [statusFilter, currentPage, limit, refetch]);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.totalEntries / limit)); // Update total pages based on limit
    }
  }, [data, limit]);

  const handleStatusChange = (event, crisisId) => {
    const newStatus = event.target.value;

    // PUT request to update crisis status
    fetch(`${apiUrl}/api/v1/admin/crisis/${crisisId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update status");
        refetch(); // Refresh the crisis entries
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value)); // Update limit and reset page
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  return (
    <Box bg={bgColor} borderRadius="lg" boxShadow="md" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Crisis Entries
        </Text>
        <Flex>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            width="200px"
            placeholder="All Statuses"
          >
            {statusEnum.map((status) => (
              <option key={status} value={status}>
                {toNormalCase(status)}
              </option>
            ))}
          </Select>
          <Select
            value={limit}
            onChange={handleLimitChange}
            width="100px"
            ml={4}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Select>
        </Flex>
      </Flex>

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      <Box overflowX="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Location</Th>
              <Th>Status</Th>
              <Th>Assigned To</Th>
              <Th>Update Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <SkeletonLoader rows={5} columns={5} />
            ) : (
              data?.crisisEntries?.map((entry) => (
                <Tr key={entry.id}>
                  <Td>{entry.title}</Td>
                  <Td>{entry.location}</Td>
                  <Td>
                    {entry.status === "APPROVED" ||
                    entry.status === "ASSIGNED" ? (
                      <Link
                        to={`/admin/assign-task/${entry.id}`}
                        className="py-1 px-2 bg-blue-500 text-white rounded"
                      >
                        {entry.status === "APPROVED" ? "Assign Task" : "Assigned"}
                      </Link>
                    ) : (
                      entry.status
                    )}
                  </Td>

                  <Td>{entry.assignedTo?.name || "Not Assigned"}</Td>
                  <Td>
                    <Select
                      onChange={(e) => handleStatusChange(e, entry.id)}
                      placeholder="Update Status"
                    >
                      {statusEnum.map((status) => (
                        <option key={status} value={status}>
                          {toNormalCase(status)}
                        </option>
                      ))}
                    </Select>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      <Flex justifyContent="space-between" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1 || totalPages === 1}
        >
          Previous
        </Button>
        <Text>
          Page {totalPages > 1 ? currentPage : 1} of{" "}
          {totalPages > 1 ? totalPages : 1}
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages || totalPages === 1}
        >
          Next
        </Button>
      </Flex>

      {!loading &&
        (!data?.crisisEntries || data.crisisEntries.length === 0) && (
          <Text mt={4} textAlign="center">
            No crisis entries found.
          </Text>
        )}
    </Box>
  );
};

export default CrisisTable;
