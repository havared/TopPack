function compare(a,b) {
  if (a[Object.keys(a)[0]] < b[Object.keys(b)[0]])
    return 1;
  else if (a[Object.keys(a)[0]] > b[Object.keys(b)[0]])
    return -1;
  else if (Object.keys(a)[0] < Object.keys(b)[0])
    return -1;
  else if (Object.keys(a)[0] > Object.keys(b)[0])
    return 1;
  return 0
}


var getTopList = function(){
    var arr = []
    var top_packages = JSON.parse(localStorage.getItem("top-packages"));
    if (!top_packages){
        alert("No packages were imported");
        return;
    }
    for (var key in top_packages){
        if (top_packages.hasOwnProperty(key)) {
            var temp = {};
            temp[key] = top_packages[key];
            arr.push(temp);
        }
    }
    console.log(top_packages)
    arr.sort(compare);
    var table_rows = '<thead><tr><th>Package Name</th><th>Occurences</th></tr></thead>';
    for( var i=0; i<10 && i<arr.length; i++){
        var current_pack = arr[i];
        table_rows += '<tr><td>'+ Object.keys(current_pack)[0] + '</td>';
        table_rows += '<td>'+current_pack[Object.keys(current_pack)[0]]+'</td></tr>';
    }
    document.getElementById('top-packages-list').innerHTML = table_rows;
}

getTopList();

var searchPackage = function(){
    var input = document.getElementById("packageQuery").value;
    var table = document.getElementById("top-packages-list");
    var tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.indexOf(input) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }

}
