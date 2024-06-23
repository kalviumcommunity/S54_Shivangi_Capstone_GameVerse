const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config({ path: '../.env' });

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    // Dummy users
    const users = [
      { username: 'user1', name: "person1",email: 'user1@example.com', password: 'password1' },
      { username: 'user2', name: "person2",email: 'user2@example.com', password: 'password2' },
      { username: 'user3', name: "person3",email: 'user3@example.com', password: 'password3' },
      // Add more users as needed
    ];

    // Insert dummy data
    await User.insertMany(users);
    console.log('Dummy users inserted successfully');

    // Disconnect after seeding
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

seedUsers();
