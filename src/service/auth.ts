import axios, { AxiosResponse } from "axios";
import processRequest from "./processRequest";

const authService = {
  async getUser(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);

    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response?.data;
    } catch (error) {
      return error;
    }
  },
  async createNewUser(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);
    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response?.data;
    } catch (error) {
      return error;
    }
  },
};

export default authService;
