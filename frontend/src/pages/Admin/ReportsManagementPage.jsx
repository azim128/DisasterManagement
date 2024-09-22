import { Box, SimpleGrid } from "@chakra-ui/react";
import ReportDownload from "../../components/reports/ReportDownload";
export default function ReportsManagementPage() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <ReportDownload reportType="donation" />
        <ReportDownload reportType="purchase" />
      </SimpleGrid>
    </Box>
  );
}
