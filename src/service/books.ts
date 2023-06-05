import axios, { AxiosResponse } from "axios";
import processRequest from "./processRequest";

const booksService = {
  async getAllBooks(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);

    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response?.data;
    } catch (error) {
      return error;
    }
  },
  async createBook(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);

    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response?.data;
    } catch (error) {
      return error;
    }
  },
  async editBook(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);

    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response?.data;
    } catch (error) {
      return error;
    }
  },
  async deleteBook(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);

    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response?.data;
    } catch (error) {
      return error;
    }
  },
  async searchBook(axiosConfig: any) {
    const requestConfig: any = processRequest(axiosConfig);

    try {
      const response: AxiosResponse = await axios(requestConfig);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default booksService;
