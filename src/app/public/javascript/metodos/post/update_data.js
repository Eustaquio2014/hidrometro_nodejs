$("#update_form").submit(function(event) {
    event.preventDefault();
    var post_url = $(this).attr("action");
    var request_method = $(this).attr("method"); 
    var form_data = $(this).serialize(); 

    $.ajax({
        url: post_url,
        type: request_method,
        data: form_data
    }).done(function(response) { //
        //$("#server-results").html(response);
        alert(response);
        modal_hide();
        btnbusca_trigger();
    });
});