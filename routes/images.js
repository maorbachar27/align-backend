const express = require("express");
const router = express.Router();

const axios = require("axios");

/* GET images. */
let imagesCache = [];

router.get("/", async function (req, res, next) {
  const page = req.query.page;
  const limit = req.query.limit;

  if (!imagesCache.length) {
    const res = await axios.get(
      `${process.env.IMAGES_ENDPOINT}?page=1&limit=${process.env.MAX_IMAGES_IN_CACHE}`
    );
    imagesCache = res.data;
  }

  const data = imagesCache.slice((page - 1) * limit, page * limit);

  res.json(data);
});

module.exports = router;
