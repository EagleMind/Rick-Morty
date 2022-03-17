import axios from "axios";
axios.defaults.baseURL = "https://rickandmortyapi.com";
export const getCharacterFilteredService = async (name) => {
  return await axios
    .get(`/api/character/?name=${name}`)
    .then((response) => response.data.results);
};
export const getCharacterByIdService = async (id) => {
  return await axios
    .get(`/api/character/${id}`, { mode: "cors" })
    .then((response) => response.data);
};
export const getAllCharactersService = async () => {
  return await axios
    .get("/api/character/")
    .then((response) => response.data.results);
};
