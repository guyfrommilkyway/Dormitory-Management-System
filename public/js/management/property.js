$(document).ready(function () {
    // Edit and delete property
    $(document).on("click", "#editPropertyButton, #deletePropertyButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let location = $(this).data('location');

        // Edit
        $("#inputEditProperty_id").val(_id);
        $("#inputEditPropertyName").val(name);
        $("#inputEditPropertyLocation").val(location);

        // Delete
        $("#inputDeleteProperty_id").val(_id);
        $("div #spanPropertyName").text(name);
        $("div #spanPropertyLocation").text(location);

        console.log(_id)
    });

    // DataTable
    $('#tableProperty').DataTable({
        "responsive": true,
        "details": false,
        "columnDefs": [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: 2 },
            { responsivePriority: 3, targets: 1 }
        ],
        "dom": '<"dataTables_header"Bf>t<"dataTables_footer"ip>',
        "buttons": {
            dom: {
                button: {
                    tag: 'button',
                    className: 'btn'
                }
            },
            buttons: [
                {

                    className: 'btn-submit m-0 mb-1 text-nowrap',
                    text: `Add property`,
                    action: function (e, dt, node, config) {
                        $('#addPropertyModal').modal('show')
                    }
                },
            ]
        },
        "pageLength": 5
    });

    // Recalculate on resize
    $(document).on("resize", function () {
        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc();
    });
});