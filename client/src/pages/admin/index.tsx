// Next
import { useRouter } from "next/router";

// Config
import admin from "config/admin";

const Index = () => {
    const router = useRouter();

    return (
        <>
            <p className="mb-4 text-xl text-center">
                Que seccion quiere administrar?
            </p>
            {admin.categories.map((category, index) => (
                <div
                    key={index}
                    className="bg-gray-800 mb-5 cursor-pointer rounded-lg text-center py-4"
                    onClick={() => router.push(category.path)}
                >
                    <h2 className="text-xl">{category.name}</h2>
                </div>
            ))}
        </>
    );
};

Index.requireAdminRol = true;

export default Index;
