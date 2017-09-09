var router = function(){
    var pageMapping = {
        //"pageId": callback
    };

    function hashToId(hash){
        if(hash.length > 1) {
            return hash.substr(1, hash.length - 1);
        }
        return "";
    }

    window.onhashchange = function (event) {
        handleRouteChange(hashToId(location.hash));
    };

    function handleRouteChange(pageId) {
        if(pageMapping.hasOwnProperty(pageId)){
            pageMapping[pageId]();
        } else if(pageMapping.hasOwnProperty("")){
            pageMapping[""]();
        } else {
            throw Error("page doesn't exist, no fallbackGet defined");
        }
    }

    return {
        get: function(pageId, callback) {
            if(pageId.length === 0) {
                throw RangeError("zero pageIds not supported, define fallbackGet");
            }
            pageMapping[pageId] = callback;
        },
        fallbackGet: function(callback) {
            pageMapping[""] = callback;
        },
        init: function(){
            handleRouteChange(hashToId(location.hash));
        }
    }
};