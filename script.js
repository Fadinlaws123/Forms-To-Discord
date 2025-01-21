const POST_URL = "YOURWEBHOOK";

function onSubmit(e) {
    const response = e.response.getItemResponses();
    let items = [];

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        let parts = []

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        if (!answer) {
            continue;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (index == 0) {
                items.push({
                    "name": question,
                    "value": part,
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": part,
                    "inline": false
                });
            }
        }
    }

    const options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌",
            "embeds": [{
                "title": "EMBED TITLE",
                "description": "SCRIPT DESCRIPTION",
                "thumbnail": {
            		    url: 'https://i.imgur.com/AfFp7pu.png',
            	  },
                "color": 33023, // You can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                "footer": {
                    "text": "Department AutoLog",
                    "icon_url": "
                },
                "image": {
              		url: 'https://i.imgur.com/AfFp7pu.png',
              	},
                "timestamp": new Date().toISOString()
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
