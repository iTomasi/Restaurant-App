import React from "react";

// Next
import { useRouter } from "next/router";

// Components
import Button from "components/Button";
import removeCookie from "libs/removeCookie";

// Redux
import { useSelector } from "react-redux";

// Types
import { IUser } from "types/User";

const Index = () => {
    const router = useRouter();
    const userData: IUser = useSelector((state: any) => state.user);

    if (userData.auth) {
        const handleLogoutBtn = () => {
            removeCookie("token");
            router.reload();
        };

        return (
            <div>
                {userData.data.rols.length === 1 &&
                userData.data.rols.includes("user") ? (
                    <>
                        <p className="mb-3 text-center">
                            No tienes ningun rol de trabajador, en caso de que
                            hayas sido contratad@ por favor espere hasta que le
                            notifiquen que ya se le haya asignado el rol
                        </p>
                    </>
                ) : (
                    <>
                        <p className="mb-3 text-center">
                            Bienvenido a la aplicacion Puerto Castilla!
                        </p>
                    </>
                )}

                <Button text="Cerrar sesion" onClick={handleLogoutBtn} />
            </div>
        );
    }

    return (
        <div>
            <p className="text-center mb-3">
                Para usar la applicacion por favor debe logearse
            </p>

            <Button
                text="Logearse"
                onClick={() => router.push("/auth/sign-in")}
            />
        </div>
    );
};

export default Index;
