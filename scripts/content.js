function LoadJson(json_name, callback)
{
    var json = JSON.parse("{}");
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', json_name, true);
    xobj.onreadystatechange = function () 
    {
          if (xobj.readyState == 4 && xobj.status == "200") 
          {
            callback( JSON.parse(xobj.responseText) );
          }
    };
    xobj.send(null);
}

function DisplayContent( json_content )
{
    var main = document.getElementById('main');

    json_content['main'].forEach( function( main_element ) {

        var content_item = document.createElement('div');
        content_item.className = "safetext norm";
        content_item.innerHTML = "<h1>"+main_element['header']+"</h1>";
        content_item.innerHTML += main_element['content'];

        main.appendChild(content_item);
    });

}

function FillContent()
{
    LoadJson("content/summary.json", DisplayContent);
}