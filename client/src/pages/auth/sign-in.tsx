import React from "react";

// Components
import FormSection from "components/form/FormSection";
import Button from "components/Button";
import { toast } from "react-hot-toast";

const SignIn = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username").toString();
        const password = formData.get("password").toString();

        if (!username) return toast.error("Usuario vacio");
        else if (!password) return toast.error("Password vacio");

        toast.success("PROO");
    };

    return (
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <FormSection title="Username" name="username" />

            <FormSection title="Password" name="password" />

            <Button type="submit" text="Log In" />
        </form>
    );
};

export default SignIn;
