
        const { loginUser } = require('../models');

        exports.loginUser = async (req, res) => {
          try {
            // Perform the operation logic, e.g., database operations
            const result = await loginUser.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      