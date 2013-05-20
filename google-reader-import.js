function createStoryEntry(jsonItem) {
  var postId = jsonItem.id.substring(jsonItem.id.lastIndexOf("/"));
  var relativeUrl = (typeof jsonItem.canonical === 'undefined') ? jsonItem.alternate.href : jsonItem.canonical.href;
  var author = (typeof jsonItem.author === 'undefined') ? '' : '<span class="label label-transparent">by <strong>' + jsonItem.author + '</strong></span>';
  var content = (typeof jsonItem.content === 'undefined') ? jsonItem.summary.content : jsonItem.content.content;
  var post = document.createElement("div");
  post.className = "well clearfix post";
  post.id = "post" + postId;
  post.data-identifier = postId;
  post.data-relative = relativeUrl;
  post.innerHTML = '<span class="label label-transparent pull-right" data-time="' + jsonItem.published + '"></span>' + 
      '<h3><a href="' + relativeUrl + '" target="_blank">' + jsonItem.title + '</a></h3>' + 
      '<div class="clearfix">' + 
      '<a href="' + jsonItem.origin.htmlUrl + '" class="label label-feed" data-pjax="">' + jsonItem.origin.title + '</a>' + 
      author + 
      '</div>' +
      '<div class="content clearfix">' +
      '<div class="content-body">' +
      content +
      '</div></div>';
  return post;
}
function handleFileSelect() {
  var storiesContainer = document.getElementById('posts');

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
