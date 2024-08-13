import axios from "axios";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 30 * 1000,
  headers: { "Content-Type": "application/json" },
});

const requestCount = { sended: 0, resolved: 0};

axiosInstance.interceptors.request.use(
  (config) => {
    

    const l = window.document.getElementById("loader");
    if(l) {
        l.style.display = "block";
    }

    requestCount.sended += 1;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    requestCount.resolved += 1;

    if(requestCount.resolved === requestCount.sended) {

        const l = window.document.getElementById("loader");
        if(l) {
            l.style.display = "none";
        }

       
        requestCount.resolved = 0;
        requestCount.sended = 0;
    }


    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export { axiosInstance };
