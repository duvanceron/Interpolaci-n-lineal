$(document).ready(function () {
  var i = 0,
    y = 0,
    a = 0;
  $("#add").click(function () {
    $("#New_value").fadeIn();
  });

  $("#cancel").click(function () {
    $("#New_value").fadeOut();
  });

  var lista = [];
  var lista_b = [];
  $("#btn_add").click(function () {
    var xi = $("#valor1").val();
    var yi = $("#valor2").val();

    //   lista.push({
    // 		xi:xi,
    // 		yi:yi
    // 	});
    // if (xi=="" || yi==""||xi=="," || yi==",") {
    // 	return false;
    // };

    i++;
    y++;
    $(".pito").attr('id', i);
    $(".pite_pite").attr('id', y);
    $("#lista").append('<div class="fila"><div class="column1 "><input id="1" class="pito">' + '</div><div class="column2"><input id="0" class="pite_pite">');
    $("#1").val(xi);
    $("#0").val(yi);

  });

  $("#calculate").click(function () {
    var sum_xi = 0,
      sum_yi = 0,
      sum_xi_elev = 0,
      sum_yi_elev = 0,
      cont = 0,
      acum_elev = 0,
      acum_powY = 0,
      xi_ = 0,
      yi_ = 0,
      x_y = 0;
    var acum_xy = 0,
      xi = 0,
      yi = 0,
      y_gorro = 0,
      a = 0,
      b = 0,
      acm_gorro = 0,
      y_less = 0,
      acm_less = 0,
      gorro = 0,
      aux = 0,auxi;
    var lista = [];
    var lista_dup = [];
    var lista_b = [];
    var lista_gorro = [];
    var lista_dupB = [];
    var listaaux = [];


    $(".column1").find(':input').each(function () {
      cont = cont + 1;
      xi_ = parseFloat($(this).val());
      lista.push({
        xi: xi_
      })

      lista_dup.push(
        xi_
      )


      sum_xi = parseFloat(sum_xi) + parseFloat($(this).val());
    });


    $(".column2").find(':input').each(function () {
      yi_ = parseFloat($(this).val());
      lista_b.push({
        yi: yi_
      })
      lista_dupB.push(
        yi_
      )
      sum_yi = parseFloat(sum_yi) + parseFloat($(this).val())
    });

    //crea lista de inputs
    $(".fila").find(':input').each(function () {
      aux = parseFloat($(this).val());
      listaaux.push(
        aux
      )

    });



    $(".column1").find(':input').each(function () {
      sum_xi_elev = parseFloat($(this).val()) * parseFloat($(this).val())
      acum_elev += sum_xi_elev;
    });

    //encontrar y al cuadrado y su sumatoria
    $(".column2").find(':input').each(function () {
      sum_yi_elev = parseFloat($(this).val()) * parseFloat($(this).val());
      acum_powY += sum_yi_elev;
    });




    for (var j = 0; j < lista.length; j++) {
      x_y = lista[j].xi * lista_b[j].yi;
      acum_xy = acum_xy + x_y;
    }


    //encontrar  b
    function find_b() {
      var b = 0,
        s_b = 0,
        i_b = 0;
      s_b = (acum_xy - ((sum_xi * sum_yi) / cont));
      i_b = (acum_elev - ((sum_xi * sum_xi) / cont))
      b = (s_b / i_b);
      return b;
    };
    //encontrar a
    function find_a() {
      var a = 0;
      f_b = find_b();
      a = (sum_yi / cont) - (f_b * (sum_xi / cont));
      return a;
    }
    //boton que estima a y dependiendo la x ingresada

    $("#calculate_x").click(function () {
      a = find_a();
      b = find_b();
      var stimate_x = $("#estimar_x").val();
      y_stimate = a + (b * stimate_x);
      console.log(y_stimate);
      $("#estimar_y").val(y_stimate);
    });

    //recorre  las lista de x(i) para encontrar y gorro
    a = find_a();
    b = find_b();
    for (var k = 0; k < lista.length; k++) {
      y_gorro = a + lista[k].xi * b;
      lista_gorro.push({
        gorro: y_gorro
      })

      acm_gorro = acm_gorro + y_gorro;
    };


    for (var l = 0; l < lista_b.length; l++) {
      y_less = lista_b[l].yi - lista_gorro[l].gorro;
      // console.log(y_less);
      acm_less = acm_less + y_less;

    }

    function find_r() {
      var s_r = 0,
        i_r = 0,
        r = 0;
      s_r = (acum_xy - ((sum_xi * sum_yi) / cont))
      i_r = Math.sqrt((acum_elev - ((sum_xi * sum_xi) / cont)) * (acum_powY - ((sum_yi * sum_yi) / cont)));
      r = s_r / i_r;
      return r;
    }

    function find_r2() {
      r = find_r();
      return r * r;
    }
    function draw(){
     auxi=_.chunk(listaaux,2)
     auxi=JSON.parse(JSON.stringify(auxi))
     console.log(auxi)
   return auxi;
    }
    draw();
    console.log(draw())
    $(function () {

      $('#container').highcharts({
        chart: {
          type: 'scatter',
          zoomType: 'xy'
        },
        title: {
          text: 'Interpolacion Lineal'
        },
        subtitle: {
          text: 'Métodos numéricos'
        },
        xAxis: {
          title: {
            enabled: true,
            text: 'x (i)'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
        },
        yAxis: {
          title: {
            text: 'y(i)'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 100,
          y: 70,
          floating: true,
          backgroundColor: '#FFFFFF',
          borderWidth: 1
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 5,
              states: {
                hover: {
                  enabled: true,
                  lineColor: 'rgb(100,100,100)'
                }
              }
            },
            states: {
              hover: {
                marker: {
                  enabled: false
                }
              }
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x} x, {point.y} y'
            }
          }
        },
        series: [{
          regression: true,
          name: 'Test input',
          color: 'rgba(223, 83, 83, .5)',
          data:auxi

        }]
      });
    });

  // aqui resultados

    $("#sum_xi").text(sum_xi);
    $("#sum_yi").text(sum_yi);
    $("#times").text(cont);
    $("#elevado").text(acum_elev);
    $("#acc_xi_yi").text(acum_xy);
    $("#bi").text(find_b());
    $("#ei").text(find_a());
    $("#y_gorritos").text(acm_gorro);
    $("#y_menos").text(acm_less);
    $("#r").val(find_r);
    $("#r_2").val(find_r2);

  });

  if (".fila") {
    $("#remove").click(function () {
      var filas = $(".fila").size();
      if (filas > 1) {
        $(".fila").last().remove();
        $("#sum_xi").text(sumarXi());
        $("#sum_yi").text(sumarYi());
        $("#acc_xi_yi").text(multiply());
        $("#elevado").text(elevado_x());
        cont = cont - 1;

        $("#ei").text(find_a());
        $("#bi").text(find_b());
      }


    });
  }




});