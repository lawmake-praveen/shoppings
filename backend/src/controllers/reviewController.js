import * as ReviewModal from "../models/reviewModel.js";
import { format } from "date-fns";

export const addOrUpdateReview = async (req, res) => {
  try {
    const body = req.body;
    const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const review = {
      userId: body.userId,
      productId: body.productId,
      review: body.review,
      reviewedAt: currentTime,
      reviewUpdatedAt: currentTime,
      stars: body.stars,
    };

    const [productDetails] = await ReviewModal.addNewReview(review);

    if (productDetails.affectedRows == 1) {
      res.status(200).json({ message: "Review added successfully", review });
    } else {
      res
        .status(409)
        .json({ message: "Could not add review. Please try again." });
    }
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const [productReviews] = await ReviewModal.getReviewsByProduct(productId)
    
    res.status(200).json({ productReviews });
  } catch (error) {
    res.status(500).json({ message: "Could not complete the request", error });
  }
};
