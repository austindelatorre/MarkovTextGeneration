module.exports = {
    json_to_js: function (path){
        let fs = require('fs');
        let json_data = fs.readFileSync(path, 'utf8');
        return JSON.parse(json_data);
    }
}


