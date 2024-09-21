import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { apiUrl } from "../../config/variables";
import Button from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Input from "../ui/Input";
import Label from "../ui/Label";

const DonationReportDownload = () => {
  const [days, setDays] = useState(1);
  const [format, setFormat] = useState("csv");
  const [isLoading, setIsLoading] = useState(false);

  const downloadReport = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Generating report...");

    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation/report`, {
        params: { days, format },
        responseType: "blob",
      });

      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : `donation_report.${format}`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Report downloaded successfully!", { id: toastId });
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error(
        "An error occurred while downloading the report. Please try again.",
        { id: toastId }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Download Donation Report</CardTitle>
        <CardDescription>
          Select options to generate your report
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="days">Number of Days</Label>
          <Input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(Math.max(1, parseInt(e.target.value)))}
            min="1"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="format">Format</Label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none sm:text-sm transition-shadow duration-200 ease-in-out"
            disabled={isLoading}
          >
            <option value="csv">CSV</option>
            <option value="xlsx">Excel</option>
          </select>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={downloadReport}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationReportDownload;
