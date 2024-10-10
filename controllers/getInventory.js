
        const { getInventory } = require('../models');

        exports.getInventory = async (req, res) => {
          try {
            const result = await getInventory.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      