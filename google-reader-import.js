function createStoryEntry(jsonItem) {
  var publishedDate = new Date(jsonItem.published * 1000);
  var content = (typeof jsonItem.content === 'undefined') ? jsonItem.summary.content : jsonItem.content.content;
  var entryMain = document.createElement("div");
  entryMain.className = "entry-main";
  entryMain.innerHTML = '<div class="entry-date">' + publishedDate.toDateString() + ' ' + 
      publishedDate.toTimeString() + '</div><h2 class="entry-title">' + 
      '<a class="entry-title-link" href="' + jsonItem.alternate.href + '" target="_blank">' + 
      jsonItem.title + '</a></h2><div class="entry-author">' + 
      '<span class="entry-source-title-parent">from <a class="entry-source-title" href="' + 
      jsonItem.origin.htmlUrl + '" target="_blank">' + jsonItem.origin.title + 
      '</a></span></div><div class="entry-body"><div>' +
      '<div class="item-body"><div>' + content + '</div></div>' +
      '</div></div>';
  return entryMain;
}
function handleFileSelect() {
  var storiesContainer = document.getElementById('stories');

  var reader = new FileReader();
  reader.onload = function(evt) {
    var parsedStories = JSON.parse(evt.target.result);
    for (var i = 0; i < parsedStories.items.length; i++) {
      storiesContainer.appendChild(createStoryEntry(parsedStories.items[i]));
    }
  };
  reader.readAsText(this.files[0]);
}
Modernizr.load([
  {
    test : Modernizr.filereader,
    nope : ['https://raw.github.com/Jahdrien/FileReader/master/jquery.FileReader.min.js']
}]);
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
