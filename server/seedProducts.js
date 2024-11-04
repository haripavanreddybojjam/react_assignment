// seedProducts.js
const mongoose = require('mongoose');
const Product = require('./models/Product'); // Make sure this path points to your Product model
require('dotenv').config(); // Load environment variables

const products = [
  {
    title: "To Kill a Mockingbird",
    price: 12.99,
    description: "A novel about the serious issues of rape and racial inequality, seen through the eyes of a child.",
    image: "https://covers.openlibrary.org/b/id/8225266-L.jpg"
  },
  {
    title: "1984",
    price: 9.99,
    description: "A dystopian social science fiction novel and cautionary tale, warning of the dangers of totalitarianism.",
    image: "https://covers.openlibrary.org/b/id/11149785-L.jpg"
  },
  {
    title: "The Great Gatsby",
    price: 13.99,
    description: "A classic novel that explores themes of wealth, excess, and the American dream.",
    image: "https://covers.openlibrary.org/b/id/10212604-L.jpg"
  },
  {
    title: "Pride and Prejudice",
    price: 10.50,
    description: "A romantic novel of manners that explores the societal expectations of 19th-century England.",
    image: "https://covers.openlibrary.org/b/id/8225434-L.jpg"
  },
  {
    title: "Moby Dick",
    price: 15.99,
    description: "The voyage of the Pequod and Captain Ahab's obsessive quest to kill the giant white whale.",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    title: "The Catcher in the Rye",
    price: 11.99,
    description: "The story of teenage rebellion and confusion, as narrated by the disillusioned Holden Caulfield.",
    image: "https://covers.openlibrary.org/b/id/8231836-L.jpg"
  },
  {
    title: "The Hobbit",
    price: 14.50,
    description: "Bilbo Baggins embarks on a fantastical journey in this classic prelude to The Lord of the Rings.",
    image: "https://covers.openlibrary.org/b/id/8305836-L.jpg"
  },
  {
    title: "Brave New World",
    price: 10.99,
    description: "A dystopian novel that imagines a future society controlled by technology and conditioning.",
    image: "https://covers.openlibrary.org/b/id/11155845-L.jpg"
  },
  {
    title: "Fahrenheit 451",
    price: 9.50,
    description: "In a future society, books are banned and 'firemen' burn any that are found.",
    image: "https://covers.openlibrary.org/b/id/10494189-L.jpg"
  },
  {
    title: "The Lord of the Rings",
    price: 22.99,
    description: "An epic high-fantasy trilogy that follows the quest to destroy the One Ring.",
    image: "https://covers.openlibrary.org/b/id/9255325-L.jpg"
  },
  {
    title: "Jane Eyre",
    price: 12.75,
    description: "An emotional story of love, independence, and morality, narrated by the titular character.",
    image: "https://covers.openlibrary.org/b/id/10554622-L.jpg"
  },
  {
    title: "Little Women",
    price: 10.99,
    description: "The story of four sisters growing up during the American Civil War, exploring family and friendship.",
    image: "https://covers.openlibrary.org/b/id/10473497-L.jpg"
  },
  {
    title: "The Picture of Dorian Gray",
    price: 11.99,
    description: "A novel about vanity, moral corruption, and the consequences of living a hedonistic life.",
    image: "https://covers.openlibrary.org/b/id/10502241-L.jpg"
  },
  {
    title: "Wuthering Heights",
    price: 9.75,
    description: "A tragic tale of love and revenge set on the wild, windswept Yorkshire moors.",
    image: "https://covers.openlibrary.org/b/id/10398142-L.jpg"
  },
  {
    title: "Great Expectations",
    price: 14.25,
    description: "A coming-of-age story that follows the life of Pip and explores themes of class and personal growth.",
    image: "https://covers.openlibrary.org/b/id/10473916-L.jpg"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
