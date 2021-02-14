// Upload profile photo preview
function updatePhoto(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('.js-photo--current')
                .attr('style', 'display: none;');
            $('.js-photo--uploaded')
                .attr('style', 'display: flex; background-image: url(' + e.target.result + ');');
        };
        reader.readAsDataURL(input.files[0]);
    }
}