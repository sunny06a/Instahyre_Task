const { User, Contact, SpamReport } = require('../src/models');
const { faker } = require('@faker-js/faker'); 

const populateDatabase = async () => {
  // Create users
  for (let i = 0; i < 10; i++) {
    await User.create({
      name: faker.person.fullName(), 
      phoneNumber: faker.phone.number(), 
      email: faker.internet.email(), 
      password: 'password123',
    });
  }

  // Create contacts
  const users = await User.findAll();
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      await Contact.create({
        name: faker.person.fullName(), 
        phoneNumber: faker.phone.number(), 
        userId: user.id,
      });
    }
  }

  // Create spam reports
  for (let i = 0; i < 20; i++) {
    await SpamReport.create({
      phoneNumber: faker.phone.number(), 
    });
  }

  console.log('Database populated with sample data!');
};

populateDatabase();