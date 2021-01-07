function getAverages(startDate, endDate){
    //console.log(endDate)
    //console.log("endDate:" + endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate());
    //console.log("startDate: " + startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate());
    
    //Perform Ajax request.
    $.ajax({
        url: 'https://vv3vhk4gy9.execute-api.us-east-2.amazonaws.com/Dev/ispapi',
        type: 'get',
        contentType: "application/json; charset=utf-8",
		cache: false,
		dataType: "json",
        data: {
            "avg": 1,
            "startDate": startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(),
            "endDate": endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate()
        },
        success: function(data){
            //If the success function is execute,
            //then the Ajax request was successful.
            //Add the data we received in our Ajax
            //request to the "content" div.
            var datesArray = new Array()
            var dlArray = new Array()
            var upArray = new Array()
            var latencyArray = new Array()
            data.sort(compare)
            for(i=0; i < data.length; i++){
                //console.log(data[i].eventDate)
                tempDate = new Date(data[i].eventDate * 1000)
                data[i].eventDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate()
                //console.log(data[i].eventDate)
                dlArray.push((data[i].AvgDownloadSpeed  / 100000).toFixed(2))
                latencyArray.push((data[i].AvgLatency * 100).toFixed(2))
                upArray.push((data[i].AvgUploadSpeed / 100000).toFixed(2))
                datesArray.push(data[i].eventDate);
                //console.log(data[i])
            }
            //console.log(JSON.stringify(data))
            //console.log(datesArray)
            jdata = JSON.stringify(data)
            var ctx = document.getElementById("myChart");
            var lat = document.getElementById("latencyChart");
            //console.log(data);
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: "Download Speeds (Mbps)",
                        data: dlArray,
                        fill: false,
                        borderColor: "#30A9DE",
                        backgroundColor: "#30A9DE",
                        yAxisID: "y-axis-1"
                    },
                    {label: "Upload Speeds (Mbps)",
                    data: upArray,
                    fill:false,
                    borderColor: "#E53A40",
                    backgroundColor: "#E53A40",
                    yAxisID: "y-axis-2"
                }],
                    labels: datesArray
                },
                options: {
                    scales: {
                        yAxes: [{
                            type:"linear",
                            display: true,
                            position: "left",
                            id: "y-axis-1"
                            },
                            { 
                            type:"linear",
                            display: true,
                            position: "right",
                            id: "y-axis-2"
                        }]
                    }
                }
            });
            var myChart = new Chart(lat, {
                type: 'line',
                data: {
                    datasets: [{
                        label: "Latency (ms)",
                        data: latencyArray,
                        fill: false,
                        borderColor: "#30A9DE",
                        backgroundColor: "#30A9DE"
                    }],
                    labels: datesArray
                },
                options: {
                    scales: {
                        yAxes: [{
                            type:"linear",
                            display: true,
                            position: "left"
                            }]
                    }
                }
            });
            //return(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('#content').html(errorMsg);
          }
    });
}

function renderAvgsChart(chartData){
    //console.log(chartData);

}

function compare(a, b) {
    const itemA = a.eventDate;
    const itemB = b.eventDate;
    
    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return comparison;
  }
$( document ).ready(function(){

    var endDate = new Date();
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    getAverages(startDate, endDate);
});