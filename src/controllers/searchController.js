const { User, Contact, SpamReport } = require('../models');
const { Op } = require('sequelize');

// Helper function to calculate spam likelihood
const calculateSpamLikelihood = async (phoneNumber) => {
  const spamReports = await SpamReport.count({
    where: { phoneNumber },
  });

  return spamReports > 0 ? 'High' : 'Low';
};

const searchByName = async (req, res) => {
  const { query } = req.query;

  try {
    // Search for users whose names start with the query
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `${query}%`, // Names starting with the query
        },
      },
    });

    // Search for contacts whose names start with the query
    const contacts = await Contact.findAll({
      where: {
        name: {
          [Op.like]: `${query}%`, // Names starting with the query
        },
      },
    });

    // Combine results and calculate spam likelihood
    const results = await Promise.all(
      [...users, ...contacts].map(async (result) => ({
        ...result.toJSON(),
        spamLikelihood: await calculateSpamLikelihood(result.phoneNumber),
      }))
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching by name', error });
  }
};

const searchByPhone = async (req, res) => {
  const { phoneNumber } = req.query;

  try {
    // Check if the number belongs to a registered user
    const user = await User.findOne({
      where: { phoneNumber },
    });

    if (user) {
      // If the number belongs to a registered user, return only that user
      const spamLikelihood = await calculateSpamLikelihood(phoneNumber);
      return res.json([{ ...user.toJSON(), spamLikelihood }]);
    }

    // Otherwise, return all contacts with that phone number
    const contacts = await Contact.findAll({
      where: { phoneNumber },
    });

    const results = await Promise.all(
      contacts.map(async (contact) => ({
        ...contact.toJSON(),
        spamLikelihood: await calculateSpamLikelihood(contact.phoneNumber),
      }))
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching by phone number', error });
  }
};

const getContactDetails = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Get the logged-in user's ID from the token

  try {
    // Find the contact by ID
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Check if the contact is a registered user
    const user = await User.findOne({
      where: { phoneNumber: contact.phoneNumber },
    });

    // Calculate spam likelihood
    const spamLikelihood = await calculateSpamLikelihood(contact.phoneNumber);

    // Prepare the response
    const response = {
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      spamLikelihood,
    };

    // Include email only if the contact is a registered user and the logged-in user is in their contact list
    if (user && user.contacts.includes(userId)) {
      response.email = user.email;
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact details', error });
  }
};

module.exports = { searchByName, searchByPhone, getContactDetails };