function json_to_js(path)
{
    let fs = require('fs');
    let json_data = fs.readFileSync(path, 'utf8');
    return JSON.parse(json_data);

}


export {json_to_js};
