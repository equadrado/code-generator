
        const { createUsersWithListInput } = require('../models');

        exports.createUsersWithListInput = async (req, res) => {
          try {
            const result = await createUsersWithListInput.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      