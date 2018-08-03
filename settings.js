$(document).ready(function() {
    $('#lastname_button').click(function() {
        var lastname = $('#lastname_input').val();
        chrome.storage.sync.set({'lastname': lastname}, function() {
            console.log('Last name is set to ' + lastname);
        });
    });

    chrome.storage.sync.get(['lastname'], function(result) {
        $('#lastname_input').val(result.lastname);
    });
});

