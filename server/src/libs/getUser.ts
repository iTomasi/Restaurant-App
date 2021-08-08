export default (userData: any) => {
    const copyUserData = { ...userData };
    const theUserData = copyUserData._doc;

    delete theUserData.password;
    delete theUserData.__v;
    delete theUserData.username_lower;

    return theUserData;
};
