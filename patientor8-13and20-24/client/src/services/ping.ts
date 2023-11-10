import axios from "axios";
import { apiBaseUrl } from "../constants";

type Ping = Awaited<Promise<string>>;

export const getPing = async () => {
  const { data } = await axios.get<Ping>(
    `${apiBaseUrl}/ping`
  );
  return data;
};