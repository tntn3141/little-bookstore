import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  content: {
    type: [Object],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;
