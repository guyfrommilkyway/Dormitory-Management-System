$(document).ready(function () {
    $(document).on('keypress', 'form', function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            return false;
        }
    });

    const err_svg = '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="18px" height="18px"><path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'

    const succ_svg = '<svg class="mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="18px" height="18px"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>'

    // First tab validation
    $('.js-ftab-btn-next').on('click', function () {
        let first_name = $('.js-first-name').val()
        let last_name = $('.js-last-name').val()
        let birthday = $('.js-birthday').val()
        let mobile = $('.js-mobile').val()
        let email = $('.js-email').val()

        function validEmail(email) {
            let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(email)) {
                return false;
            } else {
                return true;
            }
        }

        // First name validity check
        if (first_name === '') {
            $('.js-first-name-indicator')
                .html(err_svg)
        } else {
            $('.js-first-name-indicator')
                .html(succ_svg)
        }
        // Last name validity check
        if (last_name === '') {
            $('.js-last-name-indicator')
                .html(err_svg)
        } else {
            $('.js-last-name-indicator')
                .html(succ_svg)
        }
        // Birthday validity check
        if (!birthday) {
            $('.js-birthday-indicator')
                .html(err_svg)
        } else {
            $('.js-birthday-indicator')
                .html(succ_svg)
        }
        // Mobile validity check
        if (mobile === '') {
            $('.js-mobile-indicator')
                .html(err_svg)
        } else {
            $('.js-mobile-indicator')
                .html(succ_svg)
        }
        // Email validity check
        if (!validEmail(email)) {
            $('.js-email-indicator')
                .html(err_svg)
        } else {
            $('.js-email-indicator')
                .html(succ_svg)
        }
        if (first_name != '' && first_name != '' && birthday != '' && mobile != '' && validEmail(email)) {
            $('.js-ftab')
                .addClass('d-none')
            $('.js-stab')
                .removeClass('d-none')
        }
    })

    $('.js-ftab-btn-prev').on('click', function () {
        $('.js-stab')
            .addClass('d-none')
        $('.js-ftab')
            .removeClass('d-none')
    })

    $('.js-stab-btn-next').on('click', function () {
        let name = $('.js-first-name').val() + ' ' + $('.js-last-name').val()
        let birthday = $('.js-birthday').val()
        let mobile = $('.js-mobile').val()
        let email = $('.js-email').val()

        $('.js-td-name').text(name)
        $('.js-td-birthday').text(birthday)
        $('.js-td-mobile').text(mobile)
        $('.js-td-email').text(email)
        if ($('input[name=catalog]:checked').length > 0) {
            $('.js-stab')
                .addClass('d-none')
            $('.js-ttab')
                .removeClass('d-none')
        }
    })

    $('.js-ttab-btn-prev').on('click', function () {
        $('.js-ttab')
            .addClass('d-none')
        $('.js-stab')
            .removeClass('d-none')
    })
})

function radioSelected(element) {
    let selected = element.id

    $('.radio-label .card')
        .attr('style', 'background-color: #ffffff;')
    $(`#${selected} .card`)
        .attr('style', 'background-color: #ffeab2 !important;')

    let catalog_name = $(element).attr('data-name')
    let catalog_rate = $(element).attr('data-rate')

    $('#review_catalog_name')
        .text(catalog_name)
    $('#review_catalog_rate')
        .text('P' + catalog_rate + '/month')
}