
var consumo_diario;
var dias;
load_UltimaSemana();
//setInterval(function(){
//   load_UltimaSemana() 
//}, 1000);



function load_UltimaSemana() {
  var post_url = "/dados/UltimaSemana" 
  var request_method = "get" 
  $.ajax({
    async: "false",
    url: post_url,
    type: request_method,

  }).done(function (response) {
    //$("#server-results").html(response);
    //alert(response);
    console.log(response.cons_dia_esp);
    console.log(response.dias_esp);
    console.log(response.dataUltimoConsumo);

    consumo_diario = response.cons_dia_esp;
    dias = response.dias_esp;
    carregaChart();

  });


}



function carregaChart() {
  var ctx = document.getElementById('canvas').getContext('2d');
  // var ctx = document.getElementById("canvas");
  //ctx.height = 100;
  window.myLine = new Chart(ctx, config);
}
