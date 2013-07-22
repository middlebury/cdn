(function() {

  var html5elements = "address|article|aside|audio|canvas|command|datalist|details|dialog|figure|figcaption|footer|header|hgroup|keygen|mark|meter|menu|nav|progress|ruby|section|summary|time|video";

  html5elements = html5elements.split('|');

  for (var i = 0; i < html5elements.length; i++){
    document.createElement(html5elements[i]);
  }

})();