const instance = axios.create({
    baseURL: "https://ajax.test-danit.com/api/v2/cards",
});

instance.interceptors.request.use((config) => {
    try {
        if (localStorage.getItem('token')) {
            config.headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        return config;
    } catch (err) {
        console.log(err);
    }
});


export default instance;