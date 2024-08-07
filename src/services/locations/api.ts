"use client";
import axios from "axios";
import config from "../../utils/config";
import { ICharacterFilters, ILocationFilters } from "@/types";
const API_URL = config.API_URL;

export const getLocations = async (name: string) => {
  try {
    const res = await axios(
      `${API_URL}${!name ? "/location" : `/location/?name=${name}`}`,
      {
        method: "GET",
      }
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject();
  }
};

export const getLocationsByFilter = async (payload: any) => {
  let query = "";
  if (Object.keys(payload).length > 1) query += "/?";
  for (let key of Object.keys(payload)) {
    if (key !== "page" && payload[key]) {
      if (query.length > 0 && query[query.length - 1] !== "?") query += "&";
      query += `${key}=${payload[key]}`;
    }
  }
  try {
    const res = await axios(
      `${API_URL}/location${query}`,
      {
        method: "GET",
      }
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject();
  }
};
