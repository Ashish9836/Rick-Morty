"use client";
import axios from "axios";
import config from "../../utils/config";
import { ICharacterFilters } from "@/types";
const API_URL = config.API_URL;

export const getCharacters = async (payload:ICharacterFilters) => {
  try {
    const res = await axios(`${API_URL}/character`, {
      method: "GET",
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject();
  }
};
