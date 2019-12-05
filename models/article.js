"use strict"

const Sequelize = require("sequelize");
const moment = require("moment")

module.exports = (sequelize) => {
  class Article extends Sequelize.Model {
    publishedAt() {
      // formats the createdAt timestamp using moment
      const date = moment(this.createdAt).format("MMMM D, YYYY, h:mma");

      return date;
    }
    shortDescription() {
      // limits shown description to a maximum of 200 characters
      const shortDesc = this.body.length > 200 ? this.body.substring(0, 200) + "..." : this.body;

      return shortDesc;
    }
  }
  Article.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    author: Sequelize.STRING,
    body: Sequelize.TEXT
  }, { sequelize });
  return Article;
}
