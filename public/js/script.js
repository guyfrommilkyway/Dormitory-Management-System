// Sets the cursor focus
$("document").ready(function () {
    const $inputEmail = document.querySelector('#email')
    $inputEmail.focus()
})

// Sets the cursor focus
$("document").ready(function () {
    const $inputName = document.querySelector('#name')
    $inputName.focus()
})

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
function uploadProperty(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#uploaded-image')
                .attr('style', 'background-image: url(' + e.target.result + '); background-size: contain;');
            $('#uploaded-message')
                .attr('style', 'display: none;');
            $('.upload')
                .attr('style', 'border: none;');
        };
        reader.readAsDataURL(input.files[0]);
    }
}