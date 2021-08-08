import React from "react";
import { ILoginUser } from "types/User";

// Next
import { useRouter } from "next/router";

// Components
import FormSection from "components/form/FormSection";
import Button from "components/Button";
import { toast } from "react-hot-toast";

// Axios
import loginUser from "axiosSrc/auth/loginUser";

// Redux
import { useDispatch } from "react-redux";
import { userIsLoggin } from "reduxSrc/user/userState";

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username").toString();
        const password = formData.get("password").toString();

        if (!username) return toast.error("Usuario vacio");
        else if (!password) return toast.error("Password vacio");

        const payload: ILoginUser = {
            username,
            password,
        };

        const { error, success, data } = await loginUser(payload);

        if (error) return toast.error(error);

        dispatch(userIsLoggin(data));

        toast.success(success);
        router.push("/");
    };

    return (
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <FormSection title="Username" name="username" />

            <FormSection type="password" title="Password" name="password" />

            <Button type="submit" text="Log In" />
        </form>
    );
};

export default SignIn;
