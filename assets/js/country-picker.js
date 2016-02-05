/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+function($){

$.smConfig.rawCountrysData = [
    {
        "name":"亚洲",
        "sub":[
            {
                "name":"请选择"
            },
            {
                "name":"中国"
            },
            {
                "name":"日本"
            },
            {
                "name":"韩国"
            }
        ],
        "type":0
    },
    {
        "name":"美洲",
        "sub":[
            {
                "name":"请选择"
            },
            {
                "name":"美国"
            },
            {
                "name":"加拿大"
            },
            {
                "name":"巴西"
            }
        ],
        "type":0
    },
    {
        "name":"欧洲",
        "sub":[
            {
                "name":"请选择"
            },
            {
                "name":"英国"
            },
            {
                "name":"法国"
            },
            {
                "name":"德国"
            }
        ],
        "type":0
    },
    {
        "name":"非洲",
        "sub":[
            {
                "name":"请选择"
            },
            {
                "name":"南非"
            },
            {
                "name":"埃及"
            },
            {
                "name":"塞舌尔"
            }
        ],
        "type":0
    },
    {
        "name":"大洋洲",
        "sub":[
            {
                "name":"请选择"
            },
            {
                "name":"澳大利亚"
            },
            {
                "name":"瑙鲁"
            },
            {
                "name":"斐济"
            }
        ],
        "type":0
    }
    
];

}(Zepto);
// jshint ignore: end

/* global Zepto:true */
/* jshint unused:false*/

+ function($) {
  "use strict";


  var format = function(data) {
    var result = [];
    for(var i=0;i<data.length;i++) {
      var d = data[i];
      if(d.name === "请选择") continue;
      result.push(d.name);
    }
    if(result.length) return result;
    return [""];
  };

  var sub = function(data) {
    if(!data.sub) return [""];
    return format(data.sub);
  };

  var getCities = function(d) {
    for(var i=0;i< raw.length;i++) {
      if(raw[i].name === d) return sub(raw[i]);
    }
    return [""];
  };

  var getDistricts = function(p, c) {
    for(var i=0;i< raw.length;i++) {
      if(raw[i].name === p) {
        for(var j=0;j< raw[i].sub.length;j++) {
          if(raw[i].sub[j].name === c) {
            return sub(raw[i].sub[j]);
          }
        }
      }
    }
    return [""];
  };

  var raw = $.smConfig.rawCountrysData;
  var provinces = raw.map(function(d) {
    return d.name;
  });
  var initCities = sub(raw[0]);
  var initDistricts = [""];

  var currentProvince = provinces[0];
  var currentCity = initCities[0];
  var currentDistrict = initDistricts[0];

  var t;
  var defaults = {

    cssClass: "city-picker",
    rotateEffect: false,  //为了性能

    onChange: function (picker, values, displayValues) {
      var newProvince = picker.cols[0].value;
      var newCity;
      if(newProvince !== currentProvince) {
        // 如果Province变化，节流以提高reRender性能
        clearTimeout(t);

        t = setTimeout(function(){
          var newCities = getCities(newProvince);
          newCity = newCities[0];
          var newDistricts = getDistricts(newProvince, newCity);
          picker.cols[1].replaceValues(newCities);
          // picker.cols[2].replaceValues(newDistricts);
          currentProvince = newProvince;
          currentCity = newCity;
          picker.updateValue();
        }, 200);
        return;
      }
      newCity = picker.cols[1].value;
      if(newCity !== currentCity) {
        // picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
        currentCity = newCity;
        picker.updateValue();
      }
    },

    cols: [
      {
        textAlign: 'center',
        values: provinces,
        cssClass: "col-province"
      },
      {
        textAlign: 'center',
        values: initCities,
        cssClass: "col-city"
      }
      // ,
      // {
      //   textAlign: 'center',
      //   values: initDistricts,
      //   cssClass: "col-district"
      // }
    ]
  };

  $.fn.countryPicker = function(params) {
    return this.each(function() {
      if(!this) return;
      var p = $.extend(defaults, params);
      //计算value
      var val = $(this).val();
      if(val) {
        p.value = val.split(" ");
        if(p.value[0]) {
          currentProvince = p.value[0];
          p.cols[1].values = getCities(p.value[0]);
        }
        if(p.value[1]) {
          currentCity = p.value[1];
          // p.cols[2].values = getDistricts(p.value[0], p.value[1]);
        } else {
          // p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]);
        }
        // if(p.value[2]) {
        //   currentDistrict = p.value[2];
        // }
      }
      $(this).picker(p);
    });
  };

}(Zepto);