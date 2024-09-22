import { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  Heading,
  Select,
  useColorModeValue,
  Text,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import useFetchData from "../hooks/useFetchData";

const DonationsExpensesChart = () => {
  const [days, setDays] = useState(7);
  
  const { data: donationData, loading: donationLoading, error: donationError } = useFetchData("/api/v1/donation/last-n-days", { days });
  const { data: expenseData, loading: expenseLoading, error: expenseError } = useFetchData("/api/v1/purchase/last-n-days", { days });

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const skeletonColor = useColorModeValue("gray.100", "gray.700");
  const skeletonHighlight = useColorModeValue("gray.200", "gray.600");

  const handleDaysChange = (e) => {
    setDays(Number(e.target.value));
  };

  const formatChartData = useMemo(() => {
    if (!donationData?.data || !expenseData?.data) return [];

    const donationMap = new Map(donationData.data.map(item => [item.date, item.total]));
    const expenseMap = new Map(expenseData.data.map(item => [item.date, item.total]));

    const allDates = new Set([...donationMap.keys(), ...expenseMap.keys()]);

    return Array.from(allDates).map(date => ({
      date,
      donations: donationMap.get(date) || 0,
      expenses: expenseMap.get(date) || 0,
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [donationData, expenseData]);

  const loading = donationLoading || expenseLoading;
  const error = donationError || expenseError;

  const skeletonData = useMemo(() => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      donations: 0,
      expenses: 0,
    })).reverse();
  }, [days]);

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
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg">Daily Donations and Expenses</Heading>
          <Flex alignItems="center">
            <Calendar size={20} color={textColor} />
            <Select value={days} onChange={handleDaysChange} ml={2} size="sm">
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
            </Select>
          </Flex>
        </Flex>

        {error && (
          <Text color="red.500">
            Error: {error}
          </Text>
        )}

        <Box h="400px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={loading ? skeletonData : formatChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="donations" fill={loading ? skeletonColor : "#38A169"} name="Donations" />
              <Bar dataKey="expenses" fill={loading ? skeletonHighlight : "#E53E3E"} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {loading && (
          <Flex justifyContent="space-between">
            <Skeleton height="20px" width="100px" />
            <Skeleton height="20px" width="100px" />
          </Flex>
        )}
      </VStack>
    </Box>
  );
};

export default DonationsExpensesChart;