import React from "react";
import { View} from "@aws-amplify/ui-react";

import User from '../user/User'
import "./Profile.css";
import BackButton from "../../components/backBtn/Backbtn";

const Profile = () => {
  // const { tokens } = useTheme();
  return (
    <>
      <div>
        <h2>Profile</h2>
      </div>
      <View maxWidth="100%" padding="0rem" minHeight="100vh">





        
        <User/>
      

      
      </View>

      <BackButton/>

    </>
  );
};

export default Profile;
