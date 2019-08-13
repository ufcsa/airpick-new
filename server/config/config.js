'use strict';
/**
 * todo: add profuction db uri
 */
const db = process.env.NODE_ENV === 'production' ? '' : 'mongodb+srv://yinghan:yinghan@cluster0-fvwc6.mongodb.net/airpick-dev?retryWrites=true&w=majority';

module.exports = db;