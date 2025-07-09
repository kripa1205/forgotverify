const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const {
  Category,
  ProductGroup,
  Product,
  User,
  Order,
} = require("../models/product_model");

mongoose.connect("mongodb://localhost:27017/sample");

async function bulkSeed() {
  await Category.deleteMany();
  await ProductGroup.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  const categoryNames = [
    "Electronics",
    "Clothing",
    "Books",
    "Toys",
    "Home",
    "Beauty",
    "Shoes",
    "Grocery",
    "Garden",
    "Automotive",
  ];
  const categories = await Category.insertMany(
    categoryNames.map((name) => ({ name }))
  );

  const groupNames = ["Samsung", "Nike", "Sony", "Apple", "Adidas", "Dell"];
  const groups = await ProductGroup.insertMany(
    groupNames.map((name) => ({
      name,
      description: faker.commerce.productDescription(),
    }))
  );

  const products = [];
  for (let i = 0; i < 20; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500 })),
      category: faker.helpers.arrayElement(categories)._id,
      group: faker.helpers.arrayElement(groups)._id,
    });
  }
  const createdProducts = await Product.insertMany(products);

  const users = [];
  for (let i = 0; i < 5; i++) {
    users.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }
  const createdUsers = await User.insertMany(users);

  const orders = [];
  for (let i = 0; i < 50; i++) {
    const user = faker.helpers.arrayElement(createdUsers);
    const selectedProducts = faker.helpers.arrayElements(
      createdProducts,
      faker.number.int({ min: 1, max: 5 })
    );
    orders.push({
      user: user._id,
      products: selectedProducts.map((p) => ({
        product: p._id,
        quantity: faker.number.int({ min: 1, max: 5 }),
      })),
    });
  }
  await Order.insertMany(orders);

  console.log("Data seeded with product groups!");
  mongoose.connection.close();
}

bulkSeed();
