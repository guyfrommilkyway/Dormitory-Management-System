
$(document).ready(function () {

    // Change active tabs based on hash value
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

    // Catalog
    $(document).on("click", "#editCatalogButton, #deleteCatalogButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let rate = $(this).data('rate');

        // Pass data to edit catalog modal
        $("#inputEditCatalog_id").val(_id);
        $("#inputEditCatalogName").val(name);
        $("#inputEditCatalogRate").val(rate);

        // Pass data to edit catalog modal
        $("#inputDeleteCatalog_id").val(_id);
        $("div #spanDeleteCatalogName").text(name);
        $("div #spanDeleteCatalogRate").text(rate);
    });

    // Add-on
    $(document).on("click", "#editAddOnButton, #deleteAddOnButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let rate = $(this).data('rate');
        let type = $(this).data('type');

        // Pass data to edit add-on modal
        $("#inputEditAddOn_id").val(_id);
        $("#inputEditAddOnName").val(name);
        $("#inputEditAddOnRate").val(rate);
        $("#inputEditAddOnType").val(type);
        $(`#selectEditAddOnType option[value=${type}]`)
            .prop('selected', true)
            .text(type + ' (Current)');

        // Pass data to edit add-on modal
        $("#inputDeleteAddOn_id").val(_id);
        $("div #spanDeleteAddOnName").text(name); ``
        $("div #spanDeleteAddOnRate").text(rate);
        $("div #spanDeleteAddOnType").text(type);
    });

    // Delete 'current' on modal close
    $(document).on("hide.bs.modal", "#editAddOnModal", function () {
        let type = $(`#selectEditAddOnType option:selected`).val();
        let len = type.length;

        $(`#selectEditAddOnType option[value=${type}]`)
            .text($(`#selectEditAddOnType option[value=${type}]`).text().substring(len, -10))
            .prop({ 'selected': false });
    });

    // Room
    $(document).on("click", "#editRoomButton, #deleteRoomButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let floor = $(this).data('floor');
        let catalogid = $(this).data('catalogid');
        let catalogname = $(this).data('catalogname');
        let catalograte = $(this).data('catalograte');
        let status = $(this).data('status');

        // Pass data to edit room modal
        $("#inputEditRoom_id").val(_id);
        $("#inputEditRoomName").val(name);
        $("#inputEditRoomFloor").val(floor);
        $(`#selectEditRoomCatalog option[value=${catalogid}]`)
            .prop('selected', true)
            .text(catalogname + ' - ' + catalograte + ' (Current)')

        // Pass data to delete room modal
        $("#inputDeleteRoom_id").val(_id);
        $("div #spanDeleteRoomName").text(name);
        $("div #spanDeleteRoomFloor").text(floor);
        $("div #spanDeleteRoomCatalogName").text(catalogname);
        $("div #spanDeleteRoomCatalogRate").text(catalograte);
        $("div #spanDeleteRoomStatus").text(status);
    });

    // Tenant
    $(document).on("click", "#editTenantButton, #deleteTenantButton", function () {
        let _id = $(this).data('id');
        let first_name = $(this).data('firstname');
        let last_name = $(this).data('lastname');
        let mobile = $(this).data('mobile');
        let email = $(this).data('email');
        let room = $(this).data('room');
        let roomname = $(this).data('roomname');

        // Pass data to edit tenant modal
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

        // Pass data to delete tenant modal
        $("#inputDeleteTenant_id").val(_id);
        $("#inputDeleteTenantRoom").val(room);
        $("div #spanDeleteTenantFirstName").text(first_name);
        $("div #spanDeleteTenantLastName").text(last_name);
        $("div #spanDeleteTenantMobile").text(mobile);
        $("div #spanDeleteTenantEmail").text(email);
        $("div #spanDeleteTenantRoom").text(roomname);
    });

    // Delete 'current' on modal close
    $(document).on("hide.bs.modal", "#editTenantModal", function () {
        let room = $('#inputEditTenantRoom').val();
        let len = room.length

        $(`#selectEditTenantRoom .occupied`)
            .prop({ 'disabled': true });
        $(`#selectEditTenantRoom option[value=${room}]`)
            .text($(`#selectEditTenantRoom option[value=${room}]`).text().slice(len, -10))
            .prop({ 'selected': false });
    });
});