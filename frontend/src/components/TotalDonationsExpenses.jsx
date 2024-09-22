import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";
import { TrendingUp, TrendingDown } from 'lucide-react';
import useFetchData from "../hooks/useFetchData";

const TotalDonationsExpenses = () => {
  const { data: donationData, loading: donationLoading, error: donationError } = useFetchData("/api/v1/donation/total-donations");
  const { data: expenseData, loading: expenseLoading, error: expenseError } = useFetchData("/api/v1/purchase/total-expenses");

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const renderStat = (label, value, loading, error, icon) => (
    <Stat>
      <StatLabel color={textColor}>{label}</StatLabel>
      {loading ? (
        <Skeleton height="24px" width="120px" my={2} />
      ) : error ? (
        <StatNumber color="red.500">Error</StatNumber>
      ) : (
        <Flex alignItems="center">
          <StatNumber>{formatCurrency(value)}</StatNumber>
          {icon}
        </Flex>
      )}
      <StatHelpText>{error || ' '}</StatHelpText>
    </Stat>
  );

  const totalDonations = donationData?.totalDonations?._sum?.amount || 0;
  const totalExpenses = expenseData?.totalExpenses?._sum?.quantity || 0;

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={6}
      boxShadow="md"
      borderWidth={1}
      borderColor={borderColor}
    >
      <Flex justifyContent="center">
        {renderStat(
          "Total Donations",
          totalDonations,
          donationLoading,
          donationError,
          <TrendingUp color="#38A169" size={24} style={{ marginLeft: '8px' }} />
        )}
        {renderStat(
          "Total Expenses",
          totalExpenses,
          expenseLoading,
          expenseError,
          <TrendingDown color="#E53E3E" size={24} style={{ marginLeft: '8px' }} />
        )}
      </Flex>
    </Box>
  );
};

export default TotalDonationsExpenses;