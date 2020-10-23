var url_allstats = "https://raw.githubusercontent.com/tylerspck/Final_Project/main/data_files/FinalDataFiles/WBNAfullplayerstatslist.csv"
// var url_covid = 'https://raw.githubusercontent.com/tylerspck/Final_Project/main/data_files/covid_dropped.csv'
var url_top50 = "https://raw.githubusercontent.com/tylerspck/Final_Project/main/data_files/FinalDataFiles/Top50WNBA.csv"
function init() {
    d3.csv(url_top50).then((player_data) => {
        var name = []    
        // console.log(player_data)
        player_data.forEach( data => {
            name.push(data.Player_Name)
        }); 
        
        // console.log(name)
        
        // var uniqueNames = [];
        // name.foreach(name, function(i, el){
        // if(name.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        // });

    
    
        // })
        // console.log(name)
        // console.log(names)
        // var metadata = json_data.metadata;
        // console.log(metadata)
        // var samples = json_data.samples;
        // console.log(samples)

        var dropdown = d3.select("#selDataset");

        name.forEach((item) => {
            dropdown.append("option")
            .text(item)
            .property("value", item)
        });

        var init_id = name[0];
        console.log(init_id)
        
        scatterplot(init_id)
        player_info(init_id)
    });
};


d3.select("#selDataset").on("change", function() {
    var newSelection = d3.select("#selDataset").property("value")
    // console.log(newSelection)
    scatterplot(newSelection)
    player_info(newSelection)
});

 function player_info(selected_id) {
    d3.csv(url).then((demo_data) => {
        demo_data = demo_data.filter(function(row) {
                return row['Player_Name'] ===  selected_id
            });
        console.log(demo_data[0])
        var metadata_index = d3.select("#sample-metadata")
        metadata_index.html('');
        Object.entries(demo_data[0]).forEach(([k, v]) => {
            metadata_index.append("p").text(`${k.toUpperCase()}: ${v}`)
        });
    });
};


function scatterplot(selected_id) {
    d3.csv(url_precovid).then((precovid) => {
        d3.csv(url_covid).then((covid_playoffs) =>{
            precovid = precovid.filter(function(row) {
                return row['player_name'] ===  selected_id
            });

            covid_playoffs = covid_playoffs.filter(function(row) {
                return row['player_name'] ===  selected_id
            });

            
            // console.log(precovid)
            // console.log(covid_playoffs)

            points =[]
            time_played =[]

            points_covid = []
            time_played_covid = []
            
            precovid.forEach( item => {
            pts = item.Points
            points.push(pts)
            time_in_game = item.total_sec_played
            time_played.push(time_in_game)
            });

            covid_playoffs.forEach( item => {
            pts = item.Points
            points_covid.push(pts)
            time_in_game = item.total_sec_played
            time_played_covid.push(time_in_game)
            });

            // console.log(points)
            // console.log(time_played)
            // console.log('----------------------')
            // console.log(points_covid)
            // console.log(time_played_covid)
        
            var bubble_index = d3.select("#bubble")
            bubble_index.html('');

            var trace1 = {
            x: time_played,
            y: points,
            mode: 'markers',
            type: 'scatter'
            };

            linear = findLineByLeastSquares(time_played,points)
            linear_covid = findLineByLeastSquares(time_played_covid, points_covid)
   
            var trace2 = {
                x: time_played_covid,
                y: points_covid,
                mode: 'markers',
                type: 'scatter'
            }

            var trace3 = {
            x: linear[0],
            y: linear[1],
            type: 'line'
            };

            var trace4 = {
            x: linear_covid[0],
            y: linear_covid[1],
            type: 'line'
            };


            var databubble = [trace1, trace2, trace3, trace4];

            var bubble_Layout = {
                xaxis:{
                    title: {text:"Seconds Played Vs. Points Scored"}
                },
                showlegend: false,
                autosize: true
            };

            var config = { responsive: true }

            Plotly.newPlot('bubble', databubble, bubble_Layout, config)
        });
    });
};

function findLineByLeastSquares(values_x, values_y) {
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var count = 0;

    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    for (var i = 0; i < values_length; i++) {
        x = parseFloat(values_x[i]);
        y = parseFloat(values_y[i]);
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
        count++;
    }
    // console.log(sum_x)
    // console.log(sum_y)
    // console.log(sum_xx)
    // console.log(sum_xy)
    // console.log(count)
    var m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    var b = (sum_y/count) - (m*sum_x)/count;

    var result_values_x = [];
    var result_values_y = [];
    // console.log(m)
    // console.log(b)
    for (var v = 0; v < values_length; v++) {
        x = values_x[v];
        y = x * m + b;
        result_values_x.push(x);
        result_values_y.push(y);
    }
    // console.log(result_values_x)
    // console.log(result_values_y)
    return [result_values_x, result_values_y];
    
}

init()