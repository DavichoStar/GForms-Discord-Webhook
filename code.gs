var POST_URL = "DISCORD_WEBHOOK_URL";

function onSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();
  var latestResponse = allResponses[allResponses.length - 1];
  var response = latestResponse.getItemResponses();
  var items = [];

  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    var parts = answer.match(/[\s\S]{1,1024}/g) || [];

    if (answer == "") {
      continue;
    }
    for (var j = 0; j < parts.length; j++) {
      if (j == 0) {
        items.push({
          "name": question,
          "value": parts[j],
          "inline": false
        });
      } else {
        items.push({
          "name": question.concat(" (cont.)"),
          "value": parts[j],
          "inline": false
        });
      }
    }
  }

  var options = {
    "method": "post",
    "headers": {"Content-Type": "application/json"},
    "payload": JSON.stringify({
      "embeds": [{
        "title": "EMBED TITLE",
        "color": 15844367,
        "fields": items,
        "footer": {
          "text": "EMBED FOOTER"
        }
      }]
    })
  };

  UrlFetchApp.fetch(POST_URL, options);
};
