const express = require("express");
const categoryRouter = express.Router();
const { verifyUser, verifyAdmin } = require("../middlewares/signInRequired");
const { mainCat, subCat, subCatRequest} = require("../controllers/category.controller.js");

categoryRouter.get("", mainCat.retrieveAll);
categoryRouter.post("/admin", verifyAdmin, mainCat.create);
categoryRouter.delete("/admin", verifyAdmin, mainCat.delete);

categoryRouter.get("/sub", subCat.retrieveAll);
categoryRouter.post("/sub/admin", verifyAdmin, subCat.create);
categoryRouter.delete("/sub/admin", verifyAdmin, subCat.delete);

categoryRouter.post("/sub/request/user", verifyUser, subCatRequest.submit);

categoryRouter.get("/sub/request/admin", verifyAdmin, subCatRequest.retrieveAll);
categoryRouter.post("/sub/request/admin", verifyAdmin, subCatRequest.accept);
categoryRouter.delete("/sub/request/admin", verifyAdmin, subCatRequest.deny);

module.exports = categoryRouter;
