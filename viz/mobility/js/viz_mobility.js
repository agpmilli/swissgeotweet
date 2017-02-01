var dataSet = new Array();

var loadDsv = d3.dsv(",", "windows-1252");
loadDsv("users_final.csv", function(csvdata1) {

    globalcsvdata1 = csvdata1;
    for (var i=0;i<csvdata1.length;i++){
        dataSet_row = [globalcsvdata1[i].userID, globalcsvdata1[i]["#tweets"],  globalcsvdata1[i].homeCountry, globalcsvdata1[i].homeCanton, globalcsvdata1[i].workCountry, globalcsvdata1[i].workCanton, globalcsvdata1[i].distance, globalcsvdata1[i]['closer to home'], globalcsvdata1[i]['closer to work'], globalcsvdata1[i].routeTime];
        dataSet.push(dataSet_row);
    }
    
});

$(document).ready(function() {
    // DataTable
    var table = $('#table').DataTable({
        data: dataSet,
        "lengthMenu" : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        columns: [
            { title: "UserID" },
            { title: "# of tweets" },
            { title: "Home Country" },
            { title: "Home Canton" },
            { title: "Work Country" },
            { title: "Work Canton" },
            { title: "Distance (km)" },
            { title: "Closest town from home" },
            { title: "Closest town from work" },
            { title: "Time of travel home-work" }
        ]
    });
    
   
    $('#table').DataTable().destroy();
    
     //$(table.table().footer()).html('<tfoot><tr><th>UserID</th><th># of tweets</th><th>Home Country</th><th>Home Canton</th><th>Work Country</th><th>Work Canton</th><th>Distance</th><th>Closest town from home</th><th>Closest town from work</th><th>Time of travel home-work</th></tr></tfoot>');
    $("#table").append('<tfoot><tr><th>UserID</th><th># of tweets</th><th>Home Country</th><th>Home Canton</th><th>Work Country</th><th>Work Canton</th><th>Distance</th><th>Closest town from home</th><th>Closest town from work</th><th>Time of travel home-work</th></tr></tfoot>');
    
    // Setup - add a text input to each footer cell
    $('#table tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );

    // DataTable
    var table = $('#table').DataTable({
        data: dataSet,
        "lengthMenu" : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        columns: [
            { title: "UserID" },
            { title: "# of tweets" },
            { title: "Home Country" },
            { title: "Home Canton" },
            { title: "Work Country" },
            { title: "Work Canton" },
            { title: "Distance (km)" },
            { title: "Closest town from home" },
            { title: "Closest town from work" },
            { title: "Time of travel home-work" }
        ]
    });
    
    // Apply the search
    table.columns().every( function () {
        var that = this;
        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
} );