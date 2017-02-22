function deepLearning(element, pattern, callback) {
	for (var i = 0; i < element.childNodes.length; i++) {
	    var child = element.childNodes[i];
	    if (child.nodeType == Node.ELEMENT_NODE) {
	    	deepLearning(child, pattern, callback);
		} else if (child.nodeType == Node.TEXT_NODE) {
			var matches = [];
			var match;
			while (match = pattern.exec(child.data)) {
				matches.push(match);
			}
			for (var j = 0; j < matches.length; j++) {
				callback.call(window, child, matches[j]);
				i = i+2;
			}
	    }
	}
}


function italicsBold(node, match) {
  var italics = document.createElement('i');
  var bold = document.createElement('b');
  bold.innerHTML = 'deep';
  italics.appendChild(bold);

  node.splitText(match.index);
  node.nextSibling.splitText('deep'.length);
  node.parentNode.insertBefore(italics, node.nextSibling);
  node.parentNode.removeChild(node.nextSibling.nextSibling);
}

deepLearning(document.body, new RegExp('deep', 'ig'), italicsBold)
