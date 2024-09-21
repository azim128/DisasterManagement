import { useParams } from "react-router-dom";
import AssignTaskToVolunteer from "../../components/admin/AssignTaskToVolunteer";
import { useAuth } from "../../context/AuthContext";
import useVolunteers from "../../hooks/useVolunteers";

const AssignTaskPage = () => {
    const { id } = useParams();
    const { token } = useAuth();
  
    const initialQueryParams = {
      role: "VOLUNTEER",
      status: "ACTIVE",
    };
  
    const {
      data: volunteersData,
      loading: volunteerLoading,
      error: volunteerError,
    } = useVolunteers(initialQueryParams, token);
    const volunteers = volunteersData.users;
  
    if (volunteerError) {
      return <p>Error: {volunteerError}</p>;
    }
  
    return (
      <div>
        
        <AssignTaskToVolunteer 
          crisisId={id} 
          volunteers={volunteers} 
          volunteerLoading={volunteerLoading}
        />
      </div>
    );
  };
export default AssignTaskPage;
