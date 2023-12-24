const guard = require("../../guard");
const { Product } = require("./products.model");

module.exports = app => {
    app.get('/products', guard, async (req, res) => {
        res.send(await Product.find());
    });

    app.get('/products/:id', guard, async (req, res) => {
        const product = await Product.findById({ _id: req.params.id });

        if(!product){
            res.status(403).send({ message: 'Product not found' });
        }

        res.send(product);
    });

    app.post('/products', guard, async (req, res) => {
        const { name , price, discount } = req.body;

        if(!name || !price || !discount){
            return res.status(403).send({ message: 'Please provide all fields' });
        }

        const product = new Product({ name, price, discount });
        const obj = await product.save();
        
        res.send(obj);
    });
}