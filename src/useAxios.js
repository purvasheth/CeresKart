import axios from "axios";
import { useState } from "react";
import { errorToast, successToast } from "./components/toasts";
import { useAuth } from "./pages/Auth/auth-context";

const getMainURL = (url) => {
  return url.split("/")[3];
};

export const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const config = token ? { headers: { token } } : {};
  async function genericRequest(callback, successMessage) {
    try {
      setIsLoading(true);
      const data = await callback();
      return data;
    } catch (err) {
      errorToast("Reqest Falied! Server Error");
    } finally {
      setIsLoading(false);
      if (successMessage) {
        successToast(successMessage);
      }
    }
  }

  async function getData() {
    return genericRequest(async () => {
      const response = await axios.get(url, config);
      return response.data;
    });
  }

  async function postData(newItem) {
    return genericRequest(async () => {
      const response = await axios.post(url, newItem, config);
      return response.data;
    }, `${newItem.name} added to your ${getMainURL(url)}`);
  }

  async function deleteData({ id, name }, showMessage = true) {
    const deleteRequest = async () => {
      const response = await axios.delete(`${url}/${id}`, config);
      if (response.status === 204) {
        return "success";
      }
    };
    if (showMessage) {
      return genericRequest(
        deleteRequest,
        `${name} removed from your ${getMainURL(url)}`
      );
    }
    return genericRequest(deleteRequest);
  }
  async function updateData(id, body) {
    const updateRequest = async () => {
      const response = await axios.post(`${url}/${id}`, body, config);
      if (response.status === 201) {
        return response.data;
      }
    };
    return genericRequest(updateRequest);
  }

  return { isLoading, getData, postData, deleteData, updateData };
};
