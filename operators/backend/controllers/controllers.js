const { Product, Order } = require("../models/product_model");

const getdata = async (req, res) => {
  try {
    const products = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userdetails",
        },
      },
      {
        $unwind: "$userdetails",
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productdetails",
        },
      },
      {
        $unwind: "$productdetails",
      },

      {
        $project: {
          uname: "$userdetails.name",
          uemail: "$userdetails.email",
          pname: "$productdetails.name",
          qty: "$products.quantity",
          price: "$productdetails.price",
          total: { $multiply: ["$products.quantity", "$productdetails.price"] },
        },
      },
    ]);

    return res.status(200).json({
      status: false,
      data: { message: "all data get", data: products },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, data: { message: "Internal server error" } });
  }
};

module.exports = { getdata };

// const { Product } = require("../models/product_model");

// const getdata = async (req, res) => {
//   try {
//     const products = await Product.find({
//       price: { $nin: [462.89, 22.45, 383.55] },
//     }).sort({ price: 1 });

//     return res
//       .status(200)
//       .json({
//         status: false,
//         data: { message: "all data get", data: products },
//       });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ status: false, data: { message: "Internal server error" } });
//   }
// };

// module.exports = { getdata };
