import React from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import DonationForm from "../../components/DonationForm";
import DonationsExpensesChart from "../../components/DonationsExpensesChart";
import TotalDonationsExpenses from "../../components/TotalDonationsExpenses";

export default function DonationPage() {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="1400px">
        <VStack spacing={8} align="stretch">
          

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            <Box>
              <VStack spacing={8} align="stretch">
                <TotalDonationsExpenses />
                <DonationsExpensesChart />
              </VStack>
            </Box>

            <Box>
              <DonationForm />
            </Box>
          </SimpleGrid>

          <Divider />

          
        </VStack>
      </Container>
    </Box>
  );
}