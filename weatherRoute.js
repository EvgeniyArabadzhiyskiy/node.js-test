const axios = require("axios");
const express = require("express");
const routerWeather = express.Router();
require("dotenv").config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.weatherbit.io/v2.0";

routerWeather.get("/weatyer", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude) {
      return res.status(400).json({ message: "latitude parametr is require" });
    }

    if (!longitude) {
      return res.status(400).json({ message: "longitude parametr is require" });
    }

    const params = {
      key: API_KEY,
      lat: latitude,
      lon: longitude,
    };

    const response = await axios.get(`${BASE_URL}/current`, { params });
    const [result] = response.data.data;
    const {
      temp,
      weather: { description },
      city_name,
    } = result;

    const body = {
      temp,
      description,
      city_name,
    };

    res.json(body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  routerWeather,
};
