
        const { updatePet } = require('../models');

        exports.updatePet = async (req, res) => {
          try {
            const result = await updatePet.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      