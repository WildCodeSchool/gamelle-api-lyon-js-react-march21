const axios = require('axios');
const db = require('../db');
const { API_URL } = require('../env');

const findBarcode = async (id) => {
  const idInt = parseInt(id, 10);
  const product = await db.food.findUnique({
    where: {
      id: idInt,
    },
  });
  return product.barcode;
};

const findDetails = async (barcode) => {
  return axios
    .get(`${API_URL}/product/${barcode}`)
    .then((response) => response.data.data);
};

module.exports = { findBarcode, findDetails };
