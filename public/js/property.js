// Change active tabs based on hash
$(document).ready(function () {
    if (location.hash === '#tenant') {
        $('.active').removeClass('active');
        $('.show').removeClass('show');
        $('#tenant-tab').addClass('active');
        $('#tenant-panel').addClass('show active');
        history.replaceState(null, null, ' ');
    } else if (location.hash === '#room') {
        $('.active').removeClass('active');
        $('.show').removeClass('show');
        $('#room-tab').addClass('active');
        $('#room-panel').addClass('show active');
        history.replaceState(null, null, ' ');
    }
});

// Edit and delete rooms
$(document).on("click", "#editRoomButton, #deleteRoomButton", function () {
    let _id = $(this).data('id');
    let name = $(this).data('name');
    let floor = $(this).data('floor');
    let catalogid = $(this).data('catalogid');
    let catalogname = $(this).data('catalogname');
    let catalograte = $(this).data('catalograte');
    let status = $(this).data('status');

    // Edit
    $("#inputEditRoom_id").val(_id);
    $("#inputEditRoomName").val(name);
    $("#inputEditRoomFloor").val(floor);
    $(`#selectEditRoomCatalog option[value=${catalogid}]`)
        .prop('selected', true)
        .text(catalogname + ' - ' + catalograte + ' (Current)')

    // Delete
    $("#inputDeleteRoom_id").val(_id);
    $("div #spanDeleteRoomName").text(name);
    $("div #spanDeleteRoomFloor").text(floor);
    $("div #spanDeleteRoomCatalogName").text(catalogname);
    $("div #spanDeleteRoomCatalogRate").text(catalograte);
    $("div #spanDeleteRoomStatus").text(status);
});

// Edit and delete tenant
$(document).on("click", "#editTenantButton, #deleteTenantButton", function () {
    let _id = $(this).data('id');
    let first_name = $(this).data('firstname');
    let last_name = $(this).data('lastname');
    let mobile = $(this).data('mobile');
    let email = $(this).data('email');
    let room = $(this).data('room');
    let roomname = $(this).data('roomname');

    // Edit
    $("#inputEditTenant_id").val(_id);
    $("#inputEditTenantFirstName").val(first_name);
    $("#inputEditTenantLastName").val(last_name);
    $("#inputEditTenantMobile").val(mobile);
    $("#inputEditTenantEmail").val(email);
    $("#inputEditTenantRoom").val(room);

    if ($(`#selectEditTenantRoom option[value=${room}]`).text().includes('Current')) {
        $(`#selectEditTenantRoom option[value=${room}]`)
            .prop({ 'disabled': false, 'selected': true });
    } else {
        $(`#selectEditTenantRoom option[value=${room}]`)
            .prop({ 'disabled': false, 'selected': true })
            .text($(`#selectEditTenantRoom option[value=${room}]`).text() + ' (Current)');
    }

    // Delete
    $("#inputDeleteTenant_id").val(_id);
    $("div #spanDeleteTenantFirstName").text(first_name);
    $("div #spanDeleteTenantLastName").text(last_name);
    $("div #spanDeleteTenantMobile").text(mobile);
    $("div #spanDeleteTenantEmail").text(email);
    $("div #spanDeleteTenantRoom").text(roomname);
});

// Delete the 'current' on modal close
$(document).on("hide.bs.modal", "#editTenantModal", function () {
    let room = $('#inputEditTenantRoom').val();
    let len = room.length

    $(`#selectEditTenantRoom .occupied`)
        .prop({ 'disabled': true });
    $(`#selectEditTenantRoom option[value=${room}]`)
        .text($(`#selectEditTenantRoom option[value=${room}]`).text().slice(len, -10))
        .prop({ 'selected': false });
});

// DataTables
$('#tableRoom').DataTable({
    "dom": '<"d-flex justify-content-between align-items-center mb-3"Bf>t<"d-flex justify-content-between align-items-center mt-4"ip>',
    "buttons": {
        dom: {
            button: {
                tag: 'button',
                className: 'btn'
            }
        },
        buttons: [
            {

                className: 'btn-custom m-0 z-depth-0',
                text: `Add room`,
                action: function (e, dt, node, config) {
                    $('#addRoomModal').modal('show')
                }
            }
        ]
    },
    "pageLength": 10,
    "order": [[0, "asc"]]
});

$('#tableTenant').DataTable({
    "dom": '<"d-flex justify-content-between align-items-center mb-3"Bf>t<"d-flex justify-content-between align-items-center mt-4"ip>',
    "buttons": {
        dom: {
            button: {
                tag: 'button',
                className: 'btn'
            }
        },
        buttons: [
            {

                className: 'btn-custom m-0 z-depth-0',
                text: `Add tenant`,
                action: function (e, dt, node, config) {
                    $('#addTenantModal').modal('show')
                }
            }
        ]
    },
    "pageLength": 10
});

$('#tableBooking').DataTable({
    "dom": '<"d-flex justify-content-end align-items-center mb-3"f>t<"d-flex justify-content-between align-items-center mt-4"ip>',
    "pageLength": 10
});