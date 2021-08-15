const removeCookie = (cookie: string) => {
    document.cookie = `${cookie}=; expires = Thu, 01 Jan 1970 00:00:01 GMT`;
};

export default removeCookie;
