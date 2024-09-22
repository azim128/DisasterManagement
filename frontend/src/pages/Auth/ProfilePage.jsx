import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Container,
  Divider,
  Stat,
  StatLabel,
  StatGroup,
  StatHelpText,
  Avatar,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import axios from "axios";
import { apiUrl } from "../../config/variables";

const ProfilePage = () => {
  const { user, token } = useAuth();
  const toast = useToast();
  const { data, loading, error, refetch } = useFetchData(
    `/api/v1/user/get-profile/${user.user_id}`,
    {},
    {
      Authorization: `Bearer ${token}`,
    }
  );

  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/v1/user/update-profile/${user.user_id}`,
        {
          name: formData.name || data.user.name,
          phone_number: formData.phone || data.user.phone_number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch();
      }
    } catch (err) {
      toast({
        title: "Update failed",
        description: err.response?.data?.message || "Failed to update profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUpdating(false);
    }
  };

  if (error) {
    return (
      <Container maxW="container.md" py={10}>
        <Text color="red.500">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Flex direction="column" align="center">
          {loading ? (
            <SkeletonCircle size="150px" mb={4} />
          ) : (
            <Avatar size="2xl" name={data.user.name} mb={4} />
          )}
          {loading ? (
            <Skeleton height="40px" width="200px" mb={2} />
          ) : (
            <Heading size="xl" mb={2}>
              {data.user.name}
            </Heading>
          )}
          {loading ? (
            <Skeleton height="20px" width="150px" />
          ) : (
            <Text color="gray.500">{data.user.email}</Text>
          )}
        </Flex>

        <Box bg="white" shadow="md" borderRadius="lg" p={6}>
          <StatGroup>
            {['Phone', 'Role', 'Status'].map((label) => (
              <Stat key={label}>
                <StatLabel>{label}</StatLabel>
                {loading ? (
                  <SkeletonText noOfLines={1} width="100px" />
                ) : (
                  <StatHelpText>
                    {data.user[label.toLowerCase()] || data.user.phone_number}
                  </StatHelpText>
                )}
              </Stat>
            ))}
          </StatGroup>
        </Box>

        <Divider />

        <Box as="form" onSubmit={handleUpdate}>
          <Heading size="md" mb={4}>
            Update Profile
          </Heading>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={loading ? "Loading..." : data.user.name}
                isDisabled={loading}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={loading ? "Loading..." : data.user.phone_number}
                isDisabled={loading}
              />
            </FormControl>
            <Button 
              type="submit" 
              colorScheme="blue" 
              width="full"
              isLoading={updating}
              loadingText="Updating"
              isDisabled={loading}
            >
              Update Profile
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default ProfilePage;