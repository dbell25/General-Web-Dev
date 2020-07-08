const fs = require('fs');
const vm = require('vm');

class Templates{
   
    render(template, context, callback){
        
        fs.readFile(template, {encoding: "utf-8"}, (err, data)=>{
            if(err) return callback(err);
           
            try{
                callback(null, data.replace(/<%=(.*?)%>/g, (match, code) =>{
                    return vm.runInNewContext(code, context);
                }));
            }
            catch(err){
                callback(err);
            }
        });
    }
}

module.exports = Templates;