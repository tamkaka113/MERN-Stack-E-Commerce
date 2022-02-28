import express from "express";
const router = express.Router();
import {
addOrderItems,
getOrderById,
updateOrderToPaid,
getUserOrders,
getOrderList,
updateOrderToDelivered
} from "../controllers/orderController.js";
import { protect,admin } from "../middleware/authMiddleware.js";
router.route('/').post(protect,addOrderItems).get(getOrderList,protect,admin)
router.route('/myorders').get(protect,getUserOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,updateOrderToDelivered)


export default router;
