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
            		    url: 'https://cdn.discordapp.com/icons/1066225230479101972/88ffeb74a180ed40f5d49278259cbb8e.webp?size=1024&format=webp&width=640&height=640',
            	  },
                "color": 33023, // You can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                "footer": {
                    "text": "Footer Message",
                    "icon_url": "https://cdn.discordapp.com/icons/1066225230479101972/88ffeb74a180ed40f5d49278259cbb8e.webp?size=1024&format=webp&width=640&height=640"
                },
                "image": {
              		url: 'https://cdn.discordapp.com/icons/1066225230479101972/88ffeb74a180ed40f5d49278259cbb8e.webp?size=1024&format=webp&width=640&height=640',
              	},
                "timestamp": new Date().toISOString()
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
