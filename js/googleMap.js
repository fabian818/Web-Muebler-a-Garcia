$(window).load(function(){
    var mapUrl = "https://maps.google.com.pe/maps/myplaces?ll=-14.071417,-75.727901&spn=0.012592,0.013797&ctz=300&t=m&z=16",
        onLoadWebSite = true,
        googleMapHolder = $(".google_map"),
        backgroundColor = googleMapHolder.css("backgroundColor"),
        mapWidth=parseInt(googleMapHolder.css("width")),
        mapHeight=parseInt(googleMapHolder.css("height")),
        borderTopLeftRadius = parseInt(googleMapHolder.css("borderTopLeftRadius")),
        borderTopRightRadius = parseInt(googleMapHolder.css("borderTopLeftRadius")),
        borderBottomLeftRadius = parseInt(googleMapHolder.css("borderTopLeftRadius")),
        borderBottomRightRadius = parseInt(googleMapHolder.css("borderTopLeftRadius")),
        addMap=false;
	    
    if(backgroundColor == "rgba(0, 0, 0, 0)"){
        backgroundColor= "#ffffff";
    }
    verificationPageHandler();
    if(onLoadWebSite == false){
        $(window).bind("hashchange", verificationPageHandler);
    }
    function verificationPageHandler(){
        if(onLoadWebSite == false){
        	var idPage = "#"+window.location.hash.substring(3, window.location.hash.length);
        	if(idPage != "#"){
				if(googleMapHolder.parents(idPage).length != 0){
	                addGoogleMapHandler();
       			}	
        	}
        }else{
            addGoogleMapHandler();
        }
    }
    function addGoogleMapHandler(){
        if(!addMap){
            addMap = true;
            $(window).unbind("hashchange", verificationPageHandler);
            googleMapHolder.css({"overflow":"hidden"});
            googleMapHolder.html("<div style='position:absolute; overflow:hidden; width:"+mapWidth+"px; height:"+mapHeight+"px;'><iframe style='position:absolute; margin:-2px 0 10px -2px; border:0px; border-top-left-radius:"+(borderTopLeftRadius+8)+"px; border-top-right-radius:"+(borderTopRightRadius+8)+"px; border-bottom-right-radius:"+(borderBottomLeftRadius+8)+"px; border-bottom-left-radius:"+(borderBottomRightRadius+8)+"px;' width='"+(mapWidth+4)+"px' height='"+(mapHeight+4)+"px' src='"+mapUrl+"'></iframe><div id='loaderPart' style='margin:0; position:absolute; width:"+mapWidth+"px; height:"+(mapHeight)+"px; background:"+backgroundColor+" url(images/googleMapLoader.gif) no-repeat 50%; border-top-left-radius:"+borderTopLeftRadius+"px; border-top-right-radius:"+borderTopRightRadius+"px; border-bottom-right-radius:"+borderBottomLeftRadius+"px; border-bottom-left-radius:"+borderBottomRightRadius+"px;'></div></div>");
            googleMapHolder.find("iframe").load(googleMapLoadCompleteHandler);
        }
    }
    function googleMapLoadCompleteHandler(){
    	var loaderPart = googleMapHolder.find("#loaderPart");
        loaderPart.delay(100).fadeOut(500, function(){loaderPart.css({"display":"none"});});
    }
})