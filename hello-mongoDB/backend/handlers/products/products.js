const guard = require("../../guard");
const { Product } = require("./products.model");

module.exports = (app) => {
  app.get("/products", guard, async (req, res) => {
    res.send(await Product.find());
  });

  app.get("/products/:id", guard, async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(403).send("Product not found");
    }

    res.send(product);
  });

  app.post("/products", guard, async (req, res) => {
    const { name, price, discount } = req.body;

    if (!name || !price || !discount) {
      return res.status(403).send("required parameters missing");
    }

    const product = new Product({ name, price, discount });
    const obj = await product.save();

    res.send(obj);
  });

  app.put("/products/:id", guard, async (req, res) => {
    const { name, price, discount } = req.body;

    if (!name || !price || !discount) {
      return res.status(403).send("required parameters missing");
    }

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(403).send("Product not found");
    }

    product.name = name;
    product.price = price;
    product.discount = discount;

    product.save();

    res.send();
  });

  app.delete("/products/:id", guard, async (req, res) => {
    await Product.deleteOne({ _id: req.params.id });

    res.send();
  });

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
