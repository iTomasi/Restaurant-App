import React from "react";

// Redux
import { useSelector } from "react-redux";

// Types
import { IUser } from "types/User";

const Index = () => {
    const userData: IUser = useSelector((state: any) => state.user);

    return (
        <>
            <h1>Index!</h1>
            {userData.auth && (
                <>
                    <h1>Hi! {userData.data.username}</h1>
                </>
            )}
        </>
    );
};

export default Index;
