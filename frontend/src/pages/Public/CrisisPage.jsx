import React, { useState } from 'react';
import { Box, Flex, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import CrisisListComponent from "../../components/CrisisListComponent";
import CreateCrisis from "../../components/CreateCrisis";

const CrisisPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="4">
      <Heading as="h1" size="2xl" textAlign="center" mb="8">
        Crisis Management Center
      </Heading>

      <Tabs index={activeTab} onChange={handleTabChange} variant="enclosed">
        <TabList>
          <Tab>Ongoing Crises</Tab>
          <Tab>Create New Crisis</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CrisisListComponent />
          </TabPanel>
          <TabPanel>
            <CreateCrisis />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex justifyContent="center" mt="8">
        <Box as="button" 
             bg={activeTab === 0 ? "blue.500" : "green.500"} 
             color="white" 
             px="4" 
             py="2" 
             borderRadius="md"
             onClick={() => handleTabChange(activeTab === 0 ? 1 : 0)}
        >
          {activeTab === 0 ? "Create New Crisis" : "View Ongoing Crises"}
        </Box>
      </Flex>
    </Box>
  );
};

export default CrisisPage;