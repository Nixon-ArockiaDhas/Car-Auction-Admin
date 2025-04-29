export const isSessionExpired = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return true; 

    const currentTime = new Date().getTime();
    const timeDifference = currentTime - parseInt(loginTime, 10);

    return timeDifference > 3600000; 
};