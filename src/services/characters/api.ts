"use client";
import axios from "axios";
import config from "../../utils/config";
import { ICharacterFilters } from "@/types";
const API_URL = config.API_URL;

export const getCharacters = async (payload:any) => {
  
  let query = "";
  if(Object.keys(payload).length>1) query +="/?"
  for (let key of Object.keys(payload)){
    if(key!=="page"){
      query+=`${key}=${payload[key]}`
    }
  }

  try {
    const res = await axios(`${API_URL}/character${query}`, {
      method: "GET",
    });
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject();
  }
};
