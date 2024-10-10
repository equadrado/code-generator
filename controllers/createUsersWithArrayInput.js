
        const { createUsersWithArrayInput } = require('../models');

        exports.createUsersWithArrayInput = async (req, res) => {
          try {
            const result = await createUsersWithArrayInput.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      