
        const { updatePetWithForm } = require('../models');

        exports.updatePetWithForm = async (req, res) => {
          try {
            const result = await updatePetWithForm.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      