import React from "react";

// Config
import jobs from "config/jobs";

// Next
import { useRouter } from "next/router";

// Components
import Button from "components/Button";
import removeCookie from "libs/removeCookie";
import Job from "components/home/Job";

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
                {(userData.data.rols.length === 1 &&
                    userData.data.rols.includes("user")) ||
                userData.data.rols[0] === undefined ? (
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

                        <div className="mb-5">
                            {jobs.map((job, index) => {
                                if (
                                    userData.data.rols.includes(
                                        job.rol.toLowerCase()
                                    ) ||
                                    userData.data.rols.includes("admin")
                                ) {
                                    return (
                                        <Job
                                            key={index}
                                            img={job.img}
                                            name={job.name}
                                            path={job.path}
                                        />
                                    );
                                }
                            })}
                        </div>
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
