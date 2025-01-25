const { SpamReport } = require('../models');

const markAsSpam = async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.user.id; // Get the logged-in user's ID from the token

  try {
    // Check if the number is already marked as spam by this user
    const existingReport = await SpamReport.findOne({
      where: { phoneNumber, reportedBy: userId },
    });

    if (existingReport) {
      return res.status(400).json({ message: 'Number already marked as spam' });
    }

    // Create a new spam report
    await SpamReport.create({
      phoneNumber,
      reportedBy: userId,
    });

    res.status(201).json({ message: 'Number marked as spam' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking number as spam', error });
  }
};

module.exports = { markAsSpam };