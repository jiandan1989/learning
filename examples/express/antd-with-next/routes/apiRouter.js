const express = require("express");
const cheerio = require("cheerio");
const ApiRouter = express.Router();

const request = require("superagent");

ApiRouter.get("/search", (req, res) => {
  request.get("https://cnodejs.org/").end(function(err, sres) {
    if (err) {
      return next(err);
    }
    var $ = cheerio.load(sres.text);
    var items = [];
    $("#topic_list .topic_title").each(function(idx, element) {
      var $element = $(element);
      items.push({
        title: $element.attr("title"),
        href: $element.attr("href")
      });
    });

    res.send(items);
  });
});


module.exports = ApiRouter;
