const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database seeded!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fc2dd30e1b2a54a509f58ef',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores perferendis repudiandae voluptatem eaque ab fugit sint rem eum, cumque officiis temporibus soluta. Fuga sapiente debitis assumenda, atque hic accusamus cum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dq7yezkns/image/upload/v1606685015/YelpCamp/zejdzuvopczboihedugw.jpg',
                  filename: 'YelpCamp/zejdzuvopczboihedugw.jpg'
                },
                {
                  url: 'https://res.cloudinary.com/dq7yezkns/image/upload/v1606687502/YelpCamp/bcemfhfledce4lcornxg.jpg',
                  filename: 'YelpCamp/bcemfhfledce4lcornxg'
                }          
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})