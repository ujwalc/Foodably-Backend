const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* ranking step */

const rankingSchema = new Schema(
  {
    total: {
      type: Number,
      default: 0
    },
    submissions: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

module.exports = rankingSchema;