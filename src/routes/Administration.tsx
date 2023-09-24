import * as React from 'react';
import Admin from '../components/Administration/Admin';
import useGetCurrentUserInformation from '../services/customHooks/useGetUserInformation';

const Administration = () => {
    const [getUserInformation, userInformation, error, loading] =
        useGetCurrentUserInformation();

    React.useEffect(() => {
        getUserInformation();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (userInformation?.isAdmin) {
        return (
            <>
                <Admin />
            </>
        );
    }
    return (
        <>
            <div>Not authorized to view this page</div>
        </>
    );
};

export default Administration;
