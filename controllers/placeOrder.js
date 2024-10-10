
        const { placeOrder } = require('../models');

        exports.placeOrder = async (req, res) => {
          try {
            const result = await placeOrder.findAll();
            res.status(200).json(result);
          } catch (err) {
            res.status(500).json({ message: 'Internal server error', error: err.message });
          }
        };
      