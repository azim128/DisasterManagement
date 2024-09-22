import {
    Alert,
    AlertIcon,
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    Select,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import useFetchData from "../hooks/useFetchData";
  
  const CrisisListComponent = () => {
    const [severity, setSeverity] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10); // State to manage the limit
  
    const { data, loading, error, refetch } = useFetchData("/api/v1/crisis", {
      severity,
      page,
      limit, // Include limit in the data fetch
    });
  
    const handleSeverityChange = (event) => {
      setSeverity(event.target.value);
      setPage(1);
    };
  
    const handleLimitChange = (event) => {
      setLimit(Number(event.target.value));
      setPage(1); // Reset to the first page when limit changes
    };
  
    const handlePageChange = (newPage) => {
      setPage(newPage);
    };
  
    const { crisisEntries = [], totalPages = 1 } = data || {};
  
    return (
      <Box p={5}>
        <Heading mb={5}>Ongoing Crisis Overview</Heading>
  
        <Flex mb={5}>
          <Select
            placeholder="Filter by Severity"
            value={severity}
            onChange={handleSeverityChange}
            mr={3}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </Select>
  
          <Select
            placeholder="Items per Page"
            value={limit}
            onChange={handleLimitChange}
            mr={3}
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Select>
  
          <Button onClick={() => refetch()} isLoading={loading}>
            Refresh
          </Button>
        </Flex>
  
        {error && (
          <Alert status="error" mb={5}>
            <AlertIcon />
            {error}
          </Alert>
        )}
  
        <Box position="relative" minHeight="200px">
          {loading && (
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(255, 255, 255, 0.8)"
              zIndex="1"
              justify="center"
              align="center"
            >
              <Spinner size="xl" />
            </Flex>
          )}
  
          {crisisEntries.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Title</Th>
                  <Th>Severity</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {crisisEntries.map((crisis) => (
                  <Tr key={crisis.id}>
                    <Td>{crisis.id}</Td>
                    <Td>{crisis.title}</Td>
                    <Td>
                      <Badge
                        colorScheme={
                          crisis.severity === "LOW"
                            ? "green"
                            : crisis.severity === "MEDIUM"
                            ? "yellow"
                            : crisis.severity === "HIGH"
                            ? "orange"
                            : "red"
                        }
                      >
                        {crisis.severity}
                      </Badge>
                    </Td>
                    <Td>{crisis.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" fontWeight="medium">
                No crisis entries available
              </Text>
              <Text color="gray.500">
                Try adjusting your filters or adding new entries
              </Text>
            </Box>
          )}
        </Box>
  
        <Flex justify="space-between" mt={5}>
          <Button
            onClick={() => handlePageChange(page - 1)}
            isDisabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Text>
            Page {page} of {totalPages}
          </Text>
          <Button
            onClick={() => handlePageChange(page + 1)}
            isDisabled={page === totalPages || loading}
          >
            Next
          </Button>
        </Flex>
      </Box>
    );
  };
  
  export default CrisisListComponent;
  