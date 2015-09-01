var Meta = require("rauricoste-meta");

var ensureArray = function(object) {
    if (object.constructor === Array) {
        return object;
    } else if (object.constructor === HTMLCollection) {
        var result = [];
        for (var i=0;i<object.length;i++) {
            result.push(object[i]);
        }
        return result;
    }
    return [object];
}

var wrap = function(el) {
    return {
        elements: ensureArray(el),
        find: function(query) {
            return Select(query, this.elements);
        }
    }
}

var Select = function(query, elements) {
    if (typeof query === "object") {
        return wrap(query);
    }
    if (!elements) {
        elements = [document];
    }
    if (!query.length) {
        return elements;
    }
    var parts = query.split(" ");
    var next = parts[0];
    parts.splice(0, 1);
    var left = parts.join(" ");

    var type = next.substring(0, 1);
    var name = next.substring(1);
    var array = Meta.flatten(Meta.map(elements, function(element) {
        var result;
        switch(type) {
            case "#":
                result = [element.getElementById(name)];
                break;
            case ".":
                result =  element.getElementsByClassName(name);
                break;
            default:
                result =  element.getElementsByTagName(next);
                break;
        }
        result = ensureArray(result);
        return result;
    }));
    return Select(left, array);
}


module.exports = Select;