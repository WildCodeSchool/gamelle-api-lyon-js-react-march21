const axios = require('axios');
const db = require('../db');
const { API_URL } = require('../env');

const findProduct = async (id) => {
  const idInt = parseInt(id, 10);
  const product = await db.food.findUnique({
    where: {
      id: idInt,
    },
  });
  return product;
};

const findDetails = async (barcode) => {
  return axios
    .get(`${API_URL}/product/${barcode}`)
    .then((response) => response.data.data);
};

module.exports = { findProduct, findDetails };
