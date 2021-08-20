export interface IProduct {
    type: string;
    _id: string;
    name: string;
    img: string;
    fileBlob: Blob | null;
    category: string;
    quantity: string;
    price: string;
}
