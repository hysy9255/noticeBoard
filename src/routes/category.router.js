const express = require("express");
const categoryRouter = express.Router();
const { verifyUser, verifyAdmin } = require("../middlewares/signInRequired");
const {
  retrieveMainCats,
  createMainCat,
  deleteMainCat,
  retrieveSubCats,
  createSubCat,
  deleteSubCat,
  requestSubCat,
  retrieveRequests,
  acceptARequest,
  denyARequest,
} = require("../controllers/category.controller.js");

categoryRouter.get("", retrieveMainCats);
categoryRouter.post("/admin", verifyAdmin, createMainCat);
categoryRouter.delete("/admin", verifyAdmin, deleteMainCat);

categoryRouter.get("/sub", retrieveSubCats);
categoryRouter.post("/sub/admin", verifyAdmin, createSubCat);
categoryRouter.delete("/sub/admin", verifyAdmin, deleteSubCat);

categoryRouter.post("/sub/request/user", verifyUser, requestSubCat);

categoryRouter.get("/sub/request/admin", verifyAdmin, retrieveRequests);
categoryRouter.post("/sub/request/admin", verifyAdmin, acceptARequest);
categoryRouter.delete("/sub/request/admin", verifyAdmin, denyARequest);

module.exports = categoryRouter;
