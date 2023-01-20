const express = require('express')
const query = require('samp-query')
const app = express()

app.get('/API/samp', function (req, res) {
    const ip = req.query.ip;
    const port = req.query.port;
    const Serverip = `${ip}:${port}`;
    var options = {
        host: ip,
        port: port
    };
    query(options, function (error, response) {
        if(error){
            res.status(404).json({'error': 'Something Went Wrong Please Check ip And port correcly or Please Try Again Later'})}
        else{
        function createStrList(arr) {
        const indexLen = Math.floor(Math.log10(arr.length - 1)) + 1;
         let nameLen = 0;

        for (const item of arr) {
        if (item.name.length > nameLen) nameLen = item.name.length;
    }

        return arr.map((x, i) => [`${i}${" ".repeat(indexLen - `${i}`.length)} ${x.name}${" ".repeat(nameLen - x.name.length)} ${x.score}  ${x.ping}`]).slice(0,11).join("\n");
}
let Players = (createStrList(response['players']));
res.json({'response':{'serverip': Serverip, 'address': response["address"],'hostname': response["hostname"],'gamemode': response["gamemode"],'language': response["mapname"],'passworded': response["passworded"],'maxplayers': response["maxplayers"],'isPlayerOnline': response["online"],'rule': {'lagcomp': response["rules"].lagcomp,'mapname': response["rules"].mapname,'version': response["rules"].version,'weather': response["rules"].weather,'weburl': response["rules"].weburl,'worldtime': response["rules"].worldtime},'isPlayersIngame': Players}})}
   
        })
})

app.get('*', function(req, res){
    res.status(404).json({'404': 'Not Found! Enter IP AND PORT'});
  });

app.listen(() => console.log(`listening at port 5000`))
