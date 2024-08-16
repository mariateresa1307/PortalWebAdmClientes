import axios from "axios";
import Swal from "sweetalert2";

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
    console.log("request error")
    return Promise.reject(error);
  }
);

const handleResolvedRequest = () => {
  requestCount.resolved += 1;

  if(requestCount.resolved === requestCount.sended) {

      const l = window.document.getElementById("loader");
      if(l) {
          l.style.display = "none";
      }

     
      requestCount.resolved = 0;
      requestCount.sended = 0;
  }
}

axiosInstance.interceptors.response.use(
  (response) => {

    handleResolvedRequest()
    return response;
  },
  (error) => {
    console.log("response error", error)
    handleResolvedRequest()

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data.detail || "Internal error",
    });
    return Promise.reject(error);
  }
);


export { axiosInstance };
