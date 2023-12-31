import api from "./apiConfig";

// get all stills
export const getStills = async () => {
  try {
    const res = await api.get("/stills/");
    return res.data;
  } catch (error) {
    console.log("Error: fetching stills.", error);

    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
};

// get still by id
export const getStillById = async (id) => {
  try {
    const res = await api.get(`/stills/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// query directors
export const queryDirectors = async (query) => {
  try {
    const res = await api.get(`/directors/${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// query genres
export const queryGenres = async (query) => {
  try {
    const res = await api.get(`/genres/${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// query countries
export const queryCountries = async (query) => {
  try {
    const res = await api.get(`/countries/${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// query titles
export const queryTitles = async (query) => {
  try {
    const res = await api.get(`/titles/${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
