import * as React from "react";
import UserListItem from "../components/Profile/UserListItem";
import { CircularProgress, Container } from "@mui/material";
import useGetUserInformation from "../services/customHooks/useGetUserInformation";

const Profile = () => {
  const [getUserInformation, userInformation, error] = useGetUserInformation();

  React.useEffect(() => {
    getUserInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <>{error}</>;
  }

  if (userInformation?.fullName)
    if (userInformation?.birthdate) {
      return (
        <>
          <Container>
            <UserListItem
              name={userInformation?.fullName}
              birthdate={userInformation?.birthdate}
            />
          </Container>
        </>
      );
    }

  return (
    <>
      <CircularProgress />
    </>
  );
};

export default Profile;
