const {User} = require('../db');

const login = async (req, res) => {
    try {
      const { email, password } = req.query;
  
      if (!email || !password) return res.status(400).json({ error: "Missing data" });
  
      const user = await User.findOne({ where: { email } });
  
      if (!user) return res.status(404).json({ error: "User not found" });
  
      return user.password === password ? res.status(202).json({ access: true }) : res.status(403).json({ error: "Invalid Password" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = login;