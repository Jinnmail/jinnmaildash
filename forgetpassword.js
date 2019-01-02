$(document).ready(() => {
    $('#btn-reset').click(()=>{
        
        let x= getUrlVars();
        console.log(x)
    });


    let getUrlVars =  ()=>
        {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].substr(2,hashes[i].length);
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
})