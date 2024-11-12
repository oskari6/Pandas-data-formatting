// import Customer from "../models/customer";
// import express, { Request, Response } from "express";
// const app = express();

// //GET
// app.get("/api/orders/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await Customer.findOne({ "orders._id": req.params.id });
//     if (result) {
//       res.json(result);
//     } else {
//       res.status(404).json({ error: "Order not found" });
//     }
//   } catch (e) {
//     res.status(500).json({ error: "something went wrong" });
//   }
// });

// //PATCH
// app.patch("/api/orders/:id", async (req: Request, res: Response) => {
//   const orderId = req.params.id;
//   req.body._id = orderId;
//   try {
//     const result = await Customer.findOneAndUpdate(
//       { "orders._id": orderId }, //"orders._id" when nested
//       { $set: { "orders.$": req.body } },
//       { new: true }
//     );

//     if (result) {
//       res.json(result);
//     } else {
//       res.status(404).json({ error: "something went wrong" });
//     }
//   } catch (e) {
//     res.status(500).json({ error: "something went wrong" });
//   }
// });
