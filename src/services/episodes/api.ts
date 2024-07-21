"use client";
import axios from "axios";
import config from "../../utils/config";
const API_URL = config.API_URL;

export const getEpisodes = async (pg: number) => {
  try {
    const res = await axios(`${API_URL}/episode/?page=${pg}`, {
      method: "GET",
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject();
  }
};
