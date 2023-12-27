const guard = require("../../guard");
const { Product } = require("./products.model");

module.exports = (app) => {
  app.get("/dashboard/products/amount", guard, async (req, res) => {
    const amount = await Product.countDocuments();
    res.send(amount.toString());
  });

  app.get("/dashboard/products/avg", guard, async (req, res) => {
    const avg = await Product.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: "$price" },
        },
      },
    ]);
    res.send(avg[0].avg.toString());
  });

  app.get("/dashboard/products/min", guard, async (req, res) => {
    const min = await Product.aggregate([
      {
        $group: {
          _id: null,
          min: { $min: "$price" },
        },
      },
    ]);
    res.send(min[0].min.toString());
  });

  app.get("/dashboard/products/max", guard, async (req, res) => {
    const max = await Product.aggregate([
      {
        $group: {
          _id: null,
          max: { $max: "$price" },
        },
      },
    ]);
    res.send(max[0].max.toString());
  });
};
