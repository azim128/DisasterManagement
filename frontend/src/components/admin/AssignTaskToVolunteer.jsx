import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import {
  AlertTriangle,
  FileText,
  HelpCircle,
  MapPin,
  Send,
  User,
} from "lucide-react";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";

const CrisisDetails = React.memo(({ crisis }) => (
  <VStack align="stretch" bg="gray.50" p={4} borderRadius="md" height="100%">
    <Heading size="md" mb={2}>
      Crisis Details
    </Heading>
    <HStack justify="space-between">
      <HStack>
        <FileText size={18} />
        <Text fontWeight="bold">Title:</Text>
      </HStack>
      <Text>{crisis?.title}</Text>
    </HStack>
    <HStack justify="space-between">
      <HStack>
        <AlertTriangle size={18} />
        <Text fontWeight="bold">Severity:</Text>
      </HStack>
      <Badge colorScheme={crisis?.severity === "HIGH" ? "red" : "orange"}>
        {crisis?.severity}
      </Badge>
    </HStack>
    <HStack justify="space-between">
      <HStack>
        <MapPin size={18} />
        <Text fontWeight="bold">Location:</Text>
      </HStack>
      <Text>{crisis?.location}</Text>
    </HStack>
    <HStack justify="space-between">
      <HStack>
        <HelpCircle size={18} />
        <Text fontWeight="bold">Required Help:</Text>
      </HStack>
      <Text>{crisis?.requiredHelp}</Text>
    </HStack>
  </VStack>
));

CrisisDetails.displayName = "CrisisDetails";

const AssignmentForm = React.memo(
  ({
    selectedVolunteerId,
    setSelectedVolunteerId,
    taskDetails,
    setTaskDetails,
    handleAssignTask,
    volunteers,
  }) => {
    const handleTextareaChange = useCallback(
      (e) => {
        setTaskDetails(e.target.value);
      },
      [setTaskDetails]
    );

    return (
      <VStack spacing={4} align="stretch" height="100%">
        <Heading size="md" mb={2}>
          Assign Task
        </Heading>
        <HStack>
          <User size={18} />
          <Select
            placeholder="Select a volunteer"
            value={selectedVolunteerId}
            onChange={(e) => setSelectedVolunteerId(e.target.value)}
          >
            {volunteers?.map((volunteer) => (
              <option key={volunteer.user_id} value={volunteer.user_id}>
                {volunteer.name}
              </option>
            ))}
          </Select>
        </HStack>
        <HStack alignItems="flex-start">
          <FileText size={18} style={{ marginTop: "8px" }} />
          <Textarea
            placeholder="Enter task details"
            value={taskDetails}
            onChange={handleTextareaChange}
            rows={4}
            width="100%"
            resize="vertical"
          />
        </HStack>
        <Button
          leftIcon={<Send size={18} />}
          colorScheme="blue"
          onClick={handleAssignTask}
          width="full"
          mt="auto"
        >
          Assign Task
        </Button>
      </VStack>
    );
  }
);

AssignmentForm.displayName = "AssignmentForm";

const AssignTaskToVolunteer = ({ crisisId, volunteers, volunteerLoading }) => {
  const [selectedVolunteerId, setSelectedVolunteerId] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const { token } = useAuth();
  const toast = useToast();

  const {
    data: crisisData,
    loading: crisisLoading,
    error: crisisError,
  } = useFetchData(`/api/v1/crisis/${crisisId}/`);

  const handleAssignTask = useCallback(async () => {
    if (!selectedVolunteerId || !taskDetails) {
      toast({
        title: "Missing fields",
        description: "Please select a volunteer and enter task details.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:3001/api/v1/admin/crisis/${crisisId}/assign`,
        {
          volunteerId: selectedVolunteerId,
          taskDetails,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Task Assigned",
        description: `Task has been assigned to volunteer.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedVolunteerId("");
      setTaskDetails("");
    } catch (error) {
      toast({
        title: "Error assigning task",
        description: error.response?.data?.message || "An error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [selectedVolunteerId, taskDetails, crisisId, token, toast]);

  if (crisisLoading || volunteerLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      </Flex>
    );
  }

  if (crisisError) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <AlertTriangle size={50} color="red" />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Error loading crisis data
        </Heading>
        <Text color={"gray.500"}>{crisisError}</Text>
      </Box>
    );
  }

  return (
    <Card maxW={{ base: "xl", lg: "5xl" }} mx="auto" mt={8}>
      <CardHeader>
        <Heading size="lg" textAlign="center">
          Assign Task to Volunteer
        </Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          <CrisisDetails crisis={crisisData} />

          {crisisData.assignedToId ? (
            <VStack
              spacing={4}
              align="stretch"
              height="100%"
              bg="gray.50"
              p={4}
              borderRadius="md"
            >
              <Heading size="md" mb={2}>
                Task Assignment Status
              </Heading>
              <HStack>
                <User size={18} />
                <Text fontWeight="bold">Status:</Text>
                <Badge colorScheme="green">Assigned</Badge>
              </HStack>
              <HStack>
                <User size={18} />
                <Text fontWeight="bold">Assigned To:</Text>
                <Text>{crisisData.assignedTo?.name}</Text>
              </HStack>
              <Text color="gray.600" fontSize="sm" mt={2}>
                This crisis has already been assigned to a volunteer. If you
                need to make changes, please change the volunteer.
              </Text>
            </VStack>
          ) : (
            <AssignmentForm
              selectedVolunteerId={selectedVolunteerId}
              setSelectedVolunteerId={setSelectedVolunteerId}
              taskDetails={taskDetails}
              setTaskDetails={setTaskDetails}
              handleAssignTask={handleAssignTask}
              volunteers={volunteers}
            />
          )}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

AssignTaskToVolunteer.propTypes = {
  crisisId: PropTypes.string.isRequired,
  volunteers: PropTypes.array.isRequired,
  volunteerLoading: PropTypes.bool.isRequired,
};

export default AssignTaskToVolunteer;
