import { Box, VStack, Grid, GridItem, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import { apiUrl } from "../config/variables";

const severityEnum = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

const CreateCrisis = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [requiredHelp, setRequiredHelp] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `${apiUrl}/api/v1/crisis/create`,
        { title, description, severity, requiredHelp, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Crisis Created",
        description: "The crisis has been successfully created, and Visible after admin approval.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setTitle("");
      setDescription("");
      setSeverity("");
      setRequiredHelp("");
      setLocation("");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while creating the crisis.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      bg="gray.50"
      py={10}
      px={6}
      rounded="md"
      shadow="md"
      maxWidth="700px"
      mx="auto"
      mt={12}
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          {/* Title and Severity in the same row on large screens */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <GridItem>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter crisis title"
                required
              />
            </GridItem>
            <GridItem>
              <Label htmlFor="severity">Severity</Label>
              <select
                id="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              >
                <option value="" disabled>
                  Select severity
                </option>
                {severityEnum.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </GridItem>
          </Grid>

          {/* Description */}
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the crisis"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
          />

          {/* Required Help and Location in the same row on large screens */}
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <GridItem>
              <Label htmlFor="requiredHelp">Required Help</Label>
              <Input
                id="requiredHelp"
                type="text"
                value={requiredHelp}
                onChange={(e) => setRequiredHelp(e.target.value)}
                placeholder="Specify required help"
                required
              />
            </GridItem>
            <GridItem>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                required
              />
            </GridItem>
          </Grid>

          <Button type="submit" disabled={isLoading} className="mt-4">
            {isLoading ? "Creating..." : "Create Crisis"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateCrisis;
