import React, { useRef } from "react";
import { toast } from "react-hot-toast";

interface IFormProductFileProps {
    url: string;
    onClickRemove: React.MouseEventHandler<HTMLButtonElement>;
    gettingImg: any;
}

const FormProductFile = ({
    url,
    onClickRemove,
    gettingImg,
}: IFormProductFileProps) => {
    const inputRef: any = useRef();

    const handleOnChangeInput = (e: any) => {
        try {
            const file = e.target.files[0];

            if (!file.type.includes("image")) {
                toast.error("Solamente imagenes");
                return;
            }

            const blobToUrl = URL.createObjectURL(file);

            inputRef.current.value = null;

            return gettingImg({
                img: blobToUrl,
                blob: file,
            });
        } catch (e) {
            console.log(e);
            inputRef.current.value = null;
        }
    };

    return (
        <>
            <div>
                {url ? (
                    <div className="mb-3">
                        <img
                            className="w-full max-h-56 object-cover object-center mb-3"
                            src={url}
                            alt="preview"
                        />

                        <button
                            className="bg-red-400 w-full hover:bg-red-500 h-10 rounded"
                            type="button"
                            onClick={onClickRemove}
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <label
                        htmlFor="inputFile"
                        className="bg-blue-400 block w-1/2 mx-auto mb-3 rounded cursor-pointer text-center py-2 hover:bg-blue-500"
                    >
                        Select a file
                    </label>
                )}
            </div>

            <input
                className="hidden"
                id="inputFile"
                type="file"
                accept="image/*"
                onChange={handleOnChangeInput}
                ref={inputRef}
            />
        </>
    );
};

export default FormProductFile;
