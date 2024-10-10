
        const { deleteUser } = require('../models');

        exports.deleteUser = async (req, res) => {
          try {
            const result = await deleteUser.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      