//Coded by Debugger#0001

async function top_voice(count , db)
{
  db.all(`SELECT * FROM ServerBanner WHERE id=1`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach(async (row) => {
                  var RecordMic = row.recordMic;
          let count_top = RecordMic;
      db.serialize(async function() {
            var stmt =await db.prepare(`UPDATE ServerBanner SET recordMic = ? WHERE id = 1`);
            stmt.run(count_top);
            stmt.finalize();
        });
      console.log(count_top)

    if(count > count_top)
    {
        count_top = count
        db.serialize(async function() {
            var stmt =await db.prepare(`UPDATE ServerBanner SET recordMic = ? WHERE id = 1`);
            stmt.run(count_top);
            stmt.finalize();
        });
       
    }
      else
        {
          count_top = RecordMic
        }
       });
  });
}

    var yPosOfRec = -100;
    var xPosOfRec = 90;
    var yPosOfMic = -100;
    var xPosOfMic = 1170;
    var yPosOfDate = -100;
    var xPosOfDate = 2100;
    let TimeOfChange = 60000;

let changeTime=function (timeMS){
    TimeOfChange = timeMS;
} 
let posOfRec = function(x , y)
{
    yPosOfRec = y;
    xPosOfRec = x;
}
let posOfMic = function(x , y)
{
    yPosOfMic = y;
    xPosOfMic = x;
}
let posOfDate = function(x , y)
{
    yPosOfDate = y;
    xPosOfDate = x;
}
let run = function (client , Canvas, sqlite3 , guildId , images , textColor , fontSize , fontFamily)
{
    if(!client)return console.log("Client Dont Require");
    if(!Canvas)return console.log("Canvas Dont Require");
    if(!images)return console.log("images Dont Require");
    if(!guildId)return console.log("guildId Dont Require");
    if(!fontFamily)return console.log("fontFamily Dont Require");
    if(!textColor)return console.log("textColor Dont Require");
    if(!sqlite3)return console.log("sqliteDatabase Dont Require");

    var db = new sqlite3.Database('./ServerBanner.db');
    db.all(`SELECT * FROM ServerBanner`, [], (err, rows) => {
        if (err) {
                db.run("CREATE TABLE ServerBanner(id int , recordMic int)")
            setTimeout(function(){
                db.run("INSERT INTO ServerBanner VALUES (1 , 0)");
            }, 2000)
        }
    });
    client.on("ready" , () => {
        console.log("discord-sbm is working");
           
            setInterval( async () => {
                setTimeout(async function(){
                    let guild = client.guilds.cache.get(guildId)
		            const voiceChannels = guild.channels.cache.filter(c => c.type === 'voice');
                    let count = 0;
				    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
                    await top_voice(count , db); 
                    let image = images[Math.floor(Math.random() * images.length)];
                    const canvas = Canvas.createCanvas(2920,1642);
                    const ctx = canvas.getContext('2d');
                    let dateMe = new Date(); 

                    let hours = dateMe.getHours().toLocaleString({
                    timeZone: 'Asia/Tehran',
                    format : 'HH:MM'
                    }); 
                    let minutes = ("0" + dateMe.getMinutes().toLocaleString({
                    timeZone: 'Asia/Tehran',
                    format : 'HH:MM'
                    })).slice(-2);
                    let timeNow = `${hours}:${minutes}`;
                    if(timeNow == "00:00" || timeNow == "23:59" || timeNow == "00:01")
                    {
                        db.serialize(function() {
                                var stmt = db.prepare(`UPDATE ServerBanner SET recordMic = ? WHERE id = 1`);
                                stmt.run(0);
                                stmt.finalize();
                        });
                    }

                    db.all(`SELECT * FROM ServerBanner WHERE id = 1`, [],  async (err, rows) => {
             
                        if (err) {
                            throw err;
                        }
                        rows.forEach(async (row) => { 

                    let date = ("0" + dateMe.getDate()).slice(-2);
                    let month = ("0" + (dateMe.getMonth() + 1)).slice(-2);
                    let year = dateMe.getFullYear();

                            let color = `${textColor}`;

                            const background = await Canvas.loadImage(`${image}`);
                            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                            ctx.strokeStyle = '#000';
                            ctx.strokeRect(0, 0, canvas.width, canvas.height);

                            var textString4 = `${year}/${month}/${date}`;
                            ctx.font = `${fontSize} ${fontFamily}`;
                            ctx.fillStyle = `${color}`;
                            ctx.fillText(textString4, xPosOfDate, canvas.height / (1) + (yPosOfDate));
                            
                            var textString5 = `Mic: ${count}`;
                            ctx.font = `${fontSize} ${fontFamily}`;
                            ctx.fillStyle = `${color}`;
                            ctx.fillText(textString5, xPosOfMic, canvas.height / (1) + (yPosOfMic));

                            var RecordMic =await row.recordMic;
                            var textString6 = `Record: ${RecordMic}`;
                            ctx.font = `${fontSize} ${fontFamily}`;
                            ctx.fillStyle = `${color}`;
                            ctx.fillText(textString6, xPosOfRec, canvas.height / (1) + (yPosOfRec));
                            try{
                                await guild.setBanner(canvas.toBuffer())
                            }
                            catch
                            {
                                console.log("discordSBM - request timed out")
                            }
                        });   
                    });    
                } , TimeOfChange - 20000)
            } , TimeOfChange)
    });
}
module.exports = {
	run : run,
    changeTime : changeTime,
    posOfRec : posOfRec,
    posOfMic : posOfMic,
    posOfDate : posOfDate
}; 

