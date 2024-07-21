"use client";
import axios from "axios";
import config from "../../utils/config";
import { ICharacterFilters } from "@/types";
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
