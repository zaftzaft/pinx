// parse pixiv csv
function engine(csv){
  // HIDEN NO TARE
  var s = csv.split(",");
  var o = [];
  var p = 0;
  var b = 0;
  s.forEach(function(a){
    if(!b){
      if(!a){
        return p++;
      }
      o[p] = a;
    }
    else{
      o[p] += a;
    }
    if(/^".*"$/.test(o[p])){
      p++;
      b = 0;
    }
    else{
      b = 1;
    }
  });
  return o.map(function(a){
    return a ? a.replace(/"/g, "") : "";
  });
};

// Illust
module.exports.illust = function(data){
  return data.split("\n").map(function(csv){
    var o = engine(csv);
    return {
  // For Debug
  //    csv: csv,
  //    o: o,
      id:      o[0],
      illust_id: o[0],
      userUID: o[24],
      user_name: o[24],
      userId:  o[1],
      user_id: o[1],
      type:    o[2],
      title:   o[3],
      server:  o[4],
      author:  o[5],
      thumb:   o[6],
      //image:   o[9],
      url: o[9],
      date:    o[12],
      tags:    (o[13] + "").split(" "),
      tool:    o[14],
      rating:  o[15],
      total:   o[16],
      view:    o[17],
      comment: o[18],
      profile_img: o[29],
      images:  o[19]
    };
  }).slice(0, -1);
};

// User
module.exports.user = function(data){
  return data.split("\n").map(function(csv){
    var o = engine(csv);
    return {
      id:    o[1],
      name:  o[5],
      thumb: o[6],
      uid:   o[24]
    };
  }).slice(0, -1);
};
