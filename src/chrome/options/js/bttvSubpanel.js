'use strict';
var $ = require('jquery');


var $table;


function init() {
    $table = $('#bttvChannelList').EditableTable({
        columns: [
            {
                name: 'name',
                displayName: 'Channels',
                type: 'text',
                placeholder: 'Insert Channel Name here...'
            }
        ]
    });
}

module.exports = {
    init: init
};