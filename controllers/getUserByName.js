
        const { getUserByName } = require('../models');

        exports.getUserByName = async (req, res) => {
          try {
            const result = await getUserByName.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      