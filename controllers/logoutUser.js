
        const { logoutUser } = require('../models');

        exports.logoutUser = async (req, res) => {
          try {
            const result = await logoutUser.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      