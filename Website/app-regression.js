var url_precovid = "https://raw.githubusercontent.com/tylerspck/Final_Project/main/data_files/df_dropped.csv"
var url_covid = 'https://raw.githubusercontent.com/tylerspck/Final_Project/main/data_files/covid_dropped.csv'
var url = "https://raw.githubusercontent.com/tylerspck/D3-Challenge/master/assets/data/data.csv "
function init() {
    d3.csv(url_precovid).then((player_data) => {
        var name = ['Damian Lillard', 'Russell Westbrook', 'Giannis Antetokounmpo', 'Anthony Davis', 'LeBron James', 'Bradley Beal', 'DeMar DeRozan', 'James Harden', 'Kemba Walker', 'Karl-Anthony Towns']    
        console.log(player_data)
        player_data.forEach( data => {
        
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
    
    });
};


d3.select("#selDataset").on("change", function() {
    var newSelection = d3.select("#selDataset").property("value")
    // console.log(newSelection)
    scatterplot(newSelection)
});




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

            var trace2 = {
                x: time_played_covid,
                y: points_covid,
                mode: 'markers',
                type: 'scatter'
            }

            var databubble = [trace1, trace2];

            var bubble_Layout = {
                xaxis:{
                    title: {text:"OTU ID"}
                },
                showlegend: false,
                autosize: true
            };

            var config = { responsive: true }

            Plotly.newPlot('bubble', databubble, bubble_Layout, config)
        });
    });
};

init()