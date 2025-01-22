import express from "express";
import * as CommonController from "../controllers/controllers.js";
import * as ProductController from "../controllers/productController.js";
import * as UsersController from '../controllers/usersController.js'
import * as ReviewController from '../controllers/reviewController.js'

const router = express.Router();

router.get("/", CommonController.home);
router.post("/login", UsersController.login);
router.post("/register", UsersController.register);


router.get(
  "/getProducts/:startOffset/:pageSize",
  ProductController.getProducts
);
router.get("/getProductById/:id", ProductController.getProductById);
router.post("/addProduct", ProductController.addProduct);
router.post("/editProduct", ProductController.editProduct);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);


router.get("/getReviewsByProduct/:productId", ReviewController.getReviewsByProduct)
router.post("/addOrUpdateReview", ReviewController.addOrUpdateReview)


export default router;
