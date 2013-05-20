function createStoryEntry(jsonItem) {
  var publishedDate = new Date(jsonItem.published * 1000);
  var content = (typeof jsonItem.content === 'undefined') ? jsonItem.summary.content : jsonItem.content.content;
  var entryMain = document.createElement("div");
  entryMain.className = "entry-main";
  entryMain.innerHTML = '&lt;div class="entry-date"&gt;' + publishedDate.toDateString() + ' ' + 
      publishedDate.toTimeString() + '&lt;/div&gt;&lt;h2 class="entry-title"&gt;' + 
      '&lt;a class="entry-title-link" href="' + jsonItem.alternate.href + '" target="_blank"&gt;' + 
      jsonItem.title + '&lt;/a&gt;&lt;/h2&gt;&lt;div class="entry-author"&gt;' + 
      '&lt;span class="entry-source-title-parent"&gt;from &lt;a class="entry-source-title" href="' + 
      jsonItem.origin.htmlUrl + '" target="_blank"&gt;' + jsonItem.origin.title + 
      '&lt;/a&gt;&lt;/span&gt;&lt;/div&gt;&lt;div class="entry-body"&gt;&lt;div&gt;' +
      '&lt;div class="item-body"&gt;&lt;div&gt;' + content + '&lt;/div&gt;&lt;/div&gt;' +
      '&lt;/div&gt;&lt;/div&gt;';
  return entryMain;
}
function handleFileSelect() {
  var storiesContainer = document.getElementById('stories');

  var reader = new FileReader();
  reader.onload = function(evt) {
    var parsedStories = JSON.parse(evt.target.result);
    for (var i = 0; i &lt; parsedStories.items.length; i++) {
      storiesContainer.appendChild(createStoryEntry(parsedStories.items[i]));
    }
  };
  reader.readAsText(this.files[0]);
}
document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
