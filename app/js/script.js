    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Pizza');
        data.addColumn('number', 'Populartiy');
        data.addRows([
            ['Chrome', 60],
            ['Safari', 26],
            ['Firefox', 24],
        ]);

        var options = {
            pieSliceText: 'none',
            sliceVisibilityThreshold: .2,
            chartArea: {
                left: '10%'
            }
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }