// Upload profile-photo
function update(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#current_profile_photo')
                .attr('style', 'display: none;');
            $('#uploaded_profile_photo')
                .attr('style', 'display: flex; background-image: url(' + e.target.result + ');');
        };
        reader.readAsDataURL(input.files[0]);
    }
}