$(document).ready(function() {
    $('#add-user').on('submit', function() {
        var firstName = $('input#firstName').val();
        var lastName = $('input#lastName').val();
        var desc = $('textarea#description').val();

        $('.contacts').append('<div class="row">'+
            '<h2 class="name">'+firstName+' '+lastName+'</h2>'+
            '<button type="button" class="btn btn-default desc center-block" data-toggle="modal" data-target="#descModal" data-desc="'+desc+'">Description</button>'+
            '</div>'
            );

        $(this)[0].reset();
        attach_description_handlers();
    }); 

    attach_description_handlers();
});

function attach_description_handlers() { 
    $('.desc').on('click', function() {
        var name = $(this).siblings('h2').text();
        var desc = $(this).attr('data-desc');

        console.log('name', name, 'desc', desc);

        $('#descModal .modal-header h4').text(name);
        $('#descModal .modal-body p').text(desc);
    });
}
