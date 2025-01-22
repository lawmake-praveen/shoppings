import db from "../config/db.js";

export const addNewReview = async (review) =>
  db.execute(
    `insert into reviews (userId, productId, review, reviewedAt, reviewUpdatedAt, stars) values (?, ?, ?, ?, ?, ?)`,
    [
      review.userId,
      review.productId,
      review.review,
      review.reviewedAt,
      review.reviewUpdatedAt,
      review.stars,
    ]
  );

export const getReviewsByProduct = async (id) =>
  db.execute(`select * from reviews where productId = ?`, [id]);
