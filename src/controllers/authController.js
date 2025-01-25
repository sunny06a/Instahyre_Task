const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const registerUser = async (req, res) => {
  const { name, phoneNumber, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { phoneNumber } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      phoneNumber,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
const loginUser = async (req, res) => {
    const { phoneNumber, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { phoneNumber } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          const testCompare = await bcrypt.compare(password.trim(), user.password);
        }
      } catch (compareError) {
        console.error('Bcrypt Compare Error:', compareError);
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
module.exports = { registerUser, loginUser };