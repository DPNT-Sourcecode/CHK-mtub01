'use strict';

module.exports = function (friendName) {
    if (friendName)
    {
        return `Hello, ${friendName}!`
    }
    else
    {
        return `Hello, World!`
    }
    
};