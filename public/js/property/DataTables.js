// DataTables

// Catalog table
$('#tableCatalog').DataTable({
    "responsive": true,
    "details": false,
    "columnDefs": [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 1 }
    ],
    "dom": 't<"dataTables_footer"ip>',
    "pageLength": 5
});

// Add-on table
$('#tableAddOn').DataTable({
    "responsive": true,
    "details": false,
    "columnDefs": [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 4, targets: 1 },
        { responsivePriority: 3, targets: 2 },
        { responsivePriority: 2, targets: 3 }
    ],
    "dom": 't<"dataTables_footer"ip>',
    "pageLength": 5
});

// Room table
$('#tableRoom').DataTable({
    "responsive": true,
    "details": false,
    "columnDefs": [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 5 },
        { responsivePriority: 3, targets: 4 },
        { responsivePriority: 4, targets: 3 },
        { responsivePriority: 5, targets: 2 },
        { responsivePriority: 6, targets: 1 }
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
                className: 'btn--submit m-0 mb-1 text-nowrap',
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

// Tenant table
$('#tableTenant').DataTable({
    "responsive": true,
    "details": false,
    "columnDefs": [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 5 },
        { responsivePriority: 3, targets: 4 },
        { responsivePriority: 4, targets: 3 },
        { responsivePriority: 5, targets: 2 },
        { responsivePriority: 6, targets: 1 }
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
                className: 'btn--submit m-0 mb-1 text-nowrap',
                text: `Add tenant`,
                action: function (e, dt, node, config) {
                    $('#addTenantModal').modal('show')
                }
            }
        ]
    },
    "pageLength": 10
});

// Booking table
$('#tableBooking').DataTable({
    "responsive": true,
    "details": false,
    "columnDefs": [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: 5 },
        { responsivePriority: 3, targets: 4 },
        { responsivePriority: 4, targets: 3 },
        { responsivePriority: 5, targets: 2 },
        { responsivePriority: 6, targets: 1 }
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
                className: 'btn--submit booking-link m-0 mb-1 text-nowrap',
                text: `Booking Link`,
                action: function (e, dt, node, config) {
                    let booking_link = document.querySelector("#booking_id").value;

                    navigator.clipboard.writeText(window.location.host + booking_link)

                    let btn = this
                    let text = btn.text()

                    if (text.includes('Copied')) {
                        btn.text()
                    } else {
                        btn.text(btn.text() + ' - Copied')

                        setTimeout(function () {
                            btn.text('Booking Link')
                        }, 5000);
                    }
                }
            }
        ]
    },
    "pageLength": 10
});

// Remove form-control-sm to all search input
$(".dataTables_filter input").removeClass('form-control-sm')