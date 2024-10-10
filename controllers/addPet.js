
        const { addPet } = require('../models');

        exports.addPet = async (req, res) => {
          try {
            const result = await addPet.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      