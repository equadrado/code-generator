
        const { updateUser } = require('../models');

        exports.updateUser = async (req, res) => {
          try {
            const result = await updateUser.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      