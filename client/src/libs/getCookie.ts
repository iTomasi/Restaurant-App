/**
 * Return a cookie value
 */

const getCookie = (cookieName: string) => {
    const documentCookie = document.cookie;

    const match = documentCookie.match(
        new RegExp("(^| )" + cookieName + "=([^;]+)")
    );

    if (!match) return false;

    return match[2];
};

export default getCookie;
