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

function DisplayMainContent( json_content )
{
    //Fill in main content.
    var main = document.getElementById('main');
    json_content['main'].forEach( function( main_element ) 
    {
        var content_item = document.createElement('div');
        content_item.className = "safetext norm";
        content_item.innerHTML = "<h1>"+main_element['header']+"</h1>";
        content_item.innerHTML += main_element['content'];

        main.appendChild(content_item);
    });    
}

function DisplaySidebarContent( json_content )
{
    var side = document.getElementById('sidebar').getElementsByTagName('div')[0];
    json_content['sidebar'].forEach( function( sidebar_element )
    {
        var sidebar_group = document.createElement('div');
        sidebar_group.className = "menublock";
        
        var sidebar_header = document.createElement('div');
        sidebar_header.className = "safetext";
        if (sidebar_element['header'] != null)
        {
            sidebar_header.innerHTML = "<b>"+sidebar_element['header']+"</b>";
        }        
        sidebar_group.appendChild( sidebar_header );

        if (sidebar_element['items'] != null)
        {
            sidebar_element['items'].forEach( function( sidebar_item ){

                var sidebar_href = document.createElement('a');
                sidebar_href.target = "_blank";
                sidebar_href.href = sidebar_item['link'];

                var sidebar_href_content = document.createElement('div');
                sidebar_href_content.className = "menublockitem";
                sidebar_href_content.innerHTML = "<b>"+sidebar_item['content']+"</b>";

                sidebar_href.appendChild( sidebar_href_content );

                sidebar_group.appendChild( sidebar_href );
            });
        }

        side.appendChild( sidebar_group );
    });
}

function DisplayMenuContent( json_content )
{
    var menu = document.getElementById('menu');
    if (json_content['menu'] != null)
    {
        json_content['menu'].forEach( function( menu_element )
        {
            var menu_item = document.createElement('div');
            menu_item.className = "menuitem";

            var menu_item_content = document.createElement('div');
            menu_item_content.className = "safetext";
            menu_item_content.innerHTML = menu_element['header'];

            menu_item.appendChild( menu_item_content );

            menu.appendChild( menu_item );
        });
    }
}

function DisplayContent( json_content )
{
    //Fill in main content.
    DisplayMainContent( json_content );

    //Fill in sidebar content.
    DisplaySidebarContent( json_content );

    //Fill in menu.
    DisplayMenuContent( json_content );
}

function FillContent()
{
    LoadJson("content/content.json", DisplayContent);
}