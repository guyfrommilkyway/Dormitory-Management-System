// Upload profile avatar
function upload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#uploaded-image')
                .attr('style', 'width: 7rem; height: 7rem; background-image: url(' + e.target.result + '); border-radius: 3.5rem;');
            $('#uploaded-message')
                .attr('style', 'display: none;');
            $('.upload')
                .attr('style', 'border: none;');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Upload property avatar
function update(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#old_image')
                .attr('style', 'display: none;');
            $('#updated_image')
            .attr('style', 'display: block; background-image: url(' + e.target.result + ');');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Password confirmation
$(document).ready(function() {
    $('#newPassword, #confirmNewPassword').on('keyup', function () {
        if ($('#newPassword').val() == $('#confirmNewPassword').val() ) {
            $('#btnSave').attr('disabled', false);
        } else {
            $('#btnSave').attr('disabled', true);
        }
    });
});
