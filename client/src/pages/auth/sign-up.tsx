import React from "react";

// Components
import FormSection from "components/form/FormSection";
import Button from "components/Button";
import { toast } from "react-hot-toast";

const SignUp = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const username = formData.get("username").toString();
        const password = formData.get("password").toString();
        const confirm_password = formData.get("confirm_password").toString();

        if (!username) return toast.error("Nombre de usuario vacio");
        else if (!password) return toast.error("Contrasena vacio");
        else if (password !== confirm_password)
            return toast.error("Tus contrasenas no coinciden");

        toast.success("Pro!");
    };

    return (
        <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
            <FormSection title="Username" name="username" />

            <FormSection type="password" title="Password" name="password" />

            <FormSection
                type="password"
                title="Confirm Password"
                name="confirm_password"
            />

            <Button type="submit" text="Sign Up" />
        </form>
    );
};

export default SignUp;
