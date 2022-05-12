const {MessageAttachment} = require("discord.js");
const axios = require('axios').default;
const cheerio = require('cheerio');
const {MessageEmbed } = require("discord.js");

function removeDuplicates(data) {
	return data.filter((value, index) => data.indexOf(value) === index);
}

function filterCol(data) {
	return data.filter(value => value != ",");
}
function filterGalery(data) {
	return data.filter(value => value != "GRAFIKAS");
}
function ilter(data){
	return data.filter(value => value != "4.");
}
function takeAwayLast(data) {
	return data.substr(0, data.length-1);
}
function searchNews(args, news) {
	let reg = "[a-z/_0-9-]*";
	for(let i = 0; i < args.length; i++)
	{
		reg += args[i] + "[a-z/_0-9-]*";
	}
	reg += ",";
	let regg = news.match(new RegExp(reg));
	if(regg)
	 return regg[0];
	else return "Not Found,";
	
}

module.exports = {
	run:
		async(client, message, args, error) => {
			try {
				const {data} = await axios.get("https://www.respublika.lt/");
				const $ = cheerio.load(data);
				
				let urlReg1 =/class="news_title.+a* href="\/[a-z/_\-0-9-]*"( class="news_title)*/g; 
				let urlReg2 = /"(?!news)[a-z/_\-0-9]+"[ ,\n]/g;
				let urlReg3 = /[a-z/_\-0-9]+/g;
				let urlArr1 = $.html().match(urlReg1);
				let urlArr2 = (urlArr1.toString()+"\n").match(urlReg2);
				let urlArr3 = urlArr2.toString().match(urlReg3);
				
				if(!args[0])
				{
				//let reg = /a href=".+\/".class=".+<\/a><!/g;
				let reg = /"uploads\/img\/catalog\/1\/photo_for_homepage_1_.+".+\n*.+\n*.+/g;
				//let arr = $.html().match(reg);
				let reg2 = /((block_main_diff_view_text"><span)|(news_title_[a-z]*_link[_a-z]*"))( style="[a-z-:0-9;\- ]*")*>[A-Za-z\u00c0-\u017e :?,.„“\u201e\u201c\u2013\u2014–0-9\-()"—!]*/g;
				let reg3 = /[A-Za-z\u00c0-\u017e :?,.„“\u201e\u201c\u2013\u2014–0-9\-()"—!]*,/g;
				let arr2 = $.html().match(reg);
				let arr3 = $.html().match(reg2);
				//let arr4 = removeDuplicates(arr3);
				let arr4 = arr3.toString().match(reg3);
				//let arr6 = filterGalery(filterCol(arr5));


				let photoReg = /uploads\/img\/catalog\/1\/photo_for_homepage_1_[0-9]*.[a-z]*" alt="">[ ]*/g;
				let photoarr = $.html().match(photoReg);
				let photoReg2 = /.+g/g;
				//let photoarr2 = photoarr.toString().match(photoReg2);
				//let filteredPhotos = removeDuplicates(photoarr);

				const used = [];
				for(let i = 0; i < arr4.length; i++) {
					if(!used.includes(takeAwayLast(arr4[i]))) {
                        let embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setURL("https://www.respublika.lt/" + urlArr3[i])
                        .setTitle(takeAwayLast(arr4[i]))
                        .setImage("https://www.respublika.lt/" + photoarr[i].match(photoReg2)[0]);
                        message.channel.send({embeds: [embed] });
                        used.push(takeAwayLast(arr4[i]));
					}
					
					 //message.channel.send(photoarr2[i]);
				}
				}
				else
				{
					let website =takeAwayLast(searchNews(args, urlArr3.toString()));
					if(website == "Not Found")
					{
						return message.channel.send("Not Found");
					}
					else
					{
                        const resp = await axios.get("https://www.respublika.lt" + website);
                        console.log("https://www.respublika.lt" + website);
                        
                        const $1 = cheerio.load(resp.data);
                        let regText = /<p( style="text-align: justify;")*>.+<\/p>/g;
                        let regText1 = /[A-Za-z\u00c0-\u017e :?,.„“\u201e\u201c\u2013\u2014–0-9\-()"—!]*[!?.]/g;
                        let textArr = $1.html().match(regText);
                        if(!textArr) return message.channel.send("https://www.respublika.lt"+website);		
                        console.log(textArr);	
                        let textArr1 = textArr.toString().match(regText1);
                        if(!textArr1) return message.channel.send("https://www.respublika.lt"+website);
                        textArr1 = ilter(textArr1);

                        let regName1 =  /[A-Za-z\u00c0-\u017e :?,.„“\u201e\u201c\u2013\u2014–0-9\-()"—!]*<\/h1>/g;
                        let regName2 =  /[A-Za-z\u00c0-\u017e :?,.„“\u201e\u201c\u2013\u2014–0-9\-()"—!]*/g;

                        let nameArr = $1.html().match(regName1);
                        let nameArr1 = nameArr.toString().match(regName2);
                        console.log(nameArr1[0]);


                        let pgotoreg = /\(\/uploads\/img\/catalog\/1\/photo_1_[0-9]*.[a-z]*/g;
                        let pgotoreg2 = /\/uploads\/img\/catalog\/1\/photo_1_[0-9]*.[a-z]*/g; 
                        let pgotoArr = $1.html().match(pgotoreg);
                        let pgotoArr1 = pgotoArr.toString().match(pgotoreg2);
                        const embedd = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(nameArr1[0])
                            .setImage(("https://www.respublika.lt" + pgotoArr1[0]))
                            .setDescription(textArr1[0])


                        for(let j = 1; j < textArr1.length-2; j++)
                        {

                            embedd.addField(`${j}`, textArr1[j] + "\n");
                        }
                        
                        return message.channel.send({embeds: [embedd] });
                        //return textArr1.forEach(value => message.channel.send(`${value}\n`));

                        }
                    //	message.channel.send(searchNews(args,urlArr3.toString() ));
				}

				return "aaa";
				//return message.channel.send(arr2.toString());
				//return arr4.forEach(value => message.channel.send(`${value}\n`));
				//})
			} catch(e) {
                return error(e);
            }

},
help: {
	name: "news",
	description: "Gets you todays news",
    category: "Web"
}
}