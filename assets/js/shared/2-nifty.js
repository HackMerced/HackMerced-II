

/*JQUERY

11pm at night just refer to this: http://stackoverflow.com/questions/210717/using-jquery-to-center-a-div-on-the-screen
*/
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(this).parent().height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(this).parent().width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}


var toolkit = {
    generateUid: function (separator) {
        var delim = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }
}


var copy = function(data){
  return JSON.stringify(JSON.parse(data));
};



Array.prototype.chooseOne = function(){
  return this[Math.floor(Math.random() * this.length)];
}


/* capitalizes */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.replaceNthMatch = function(pattern, n, replace) {
  var parts, tempParts;

  if (pattern.constructor === RegExp) {

    // If there's no match, bail
    if (this.search(pattern) === -1) {
      return this;
    }

    // Every other item should be a matched capture group;
    // between will be non-matching portions of the substring
    parts = this.split(pattern);

    // If there was a capture group, index 1 will be
    // an item that matches the RegExp
    if (parts[1].search(pattern) !== 0) {
      throw {name: "ArgumentError", message: "RegExp must have a capture group"};
    }
  } else if (pattern.constructor === String) {
    parts = this.split(pattern);
    // Need every other item to be the matched string
    tempParts = [];

    for (var i=0; i < parts.length; i++) {
      tempParts.push(parts[i]);

      // Insert between, but don't tack one onto the end
      if (i < parts.length - 1) {
        tempParts.push(pattern);
      }
    }
    parts = tempParts;
  }  else {
    throw {name: "ArgumentError", message: "Must provide either a RegExp or String"};
  }

  // Parens are unnecessary, but explicit. :)
  indexOfNthMatch = (n * 2) - 1;

  if (parts[indexOfNthMatch] === undefined) {
  // There IS no Nth match
  return this;
  }

  if (typeof(replace) === "function") {
  // Call it. After this, we don't need it anymore.
  replace = replace(parts[indexOfNthMatch]);
  }

  // Update our parts array with the new value
  parts[indexOfNthMatch] = replace;

  // Put it back together and return
  return parts.join('');
};
