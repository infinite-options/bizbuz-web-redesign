import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Make sure to have axios installed
import { useNavigate } from 'react-router-dom';
const EventRedirect = () => {
    const navigate = useNavigate();
    const [event , setEvent ] = useState(null)
    const { regCode } = useParams();

  useEffect(() => {
    const fetchEventAndRedirect = async () => {

      try {
        const response = await axios.get(`http://localhost:4000/api/v2/${regCode}`);
        // Assuming the API call is successful and you want to redirect
        // Redirect to /registration after successful API call
        // navigate('/eventInfo/'+regCode);
        setEvent(event);
        response.data.pre_event_questionnaire = response.data.eventObject.pre_event_questionnaire
        navigate(`/eventInfo/${regCode}`, { state: { event: response.data.eventObject } });

      } catch (error) {
        console.error('Error fetching event:', error);
        // Handle error if needed
      }
    };

    fetchEventAndRedirect();
  }, [regCode]);

  return (
    <div>
      <h1>Redirecting...</h1>
      {/* You can add a loading spinner or message here */}
    </div>
  );
};

export default EventRedirect;
