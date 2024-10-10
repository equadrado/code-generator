
        const { findPetsByStatus } = require('../models');

        exports.findPetsByStatus = async (req, res) => {
          try {
            const result = await findPetsByStatus.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      