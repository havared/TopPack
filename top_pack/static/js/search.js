var add_repo = function(repo){

    $.ajax({
     url: "/get-package-json/?repo="+repo,
     type: "get",
     success: function(data){
        var topPackages = {};
        if(localStorage.getItem("top-packages")){
            topPackages = JSON.parse(localStorage.getItem("top-packages"));
        }
         for (var j=0; j<data.length; j++){
            if (data[j] in topPackages){
                topPackages[data[j]] = parseInt(topPackages[data[j]]) + 1;
            }
            else{
                topPackages[data[j]] = 1;
            }
         }
         localStorage.setItem("top-packages", JSON.stringify(topPackages));
     },
     error: function(error){
            alert(error.responseText);
    }
    });

    if (localStorage.getItem("merge_repos")){
        var merge_repos = JSON.parse(localStorage.getItem("merge_repos"));
        console.log(merge_repos);
        console.log(repo);
        if (merge_repos.indexOf(repo) < 0){
            merge_repos.push(repo);
            localStorage.setItem("merge_repos", JSON.stringify(merge_repos));
        }
    }
    else{
        localStorage.setItem("merge_repos", JSON.stringify([repo]));
    }
    document.getElementById(repo).className = 'merged';
}

function load_repositories(){
    if (!document.getElementById('searchQuery').value){
        alert("Please enter query");
        return
    }
    $.ajax({
     url: "/search/?query="+document.getElementById('searchQuery').value,
     type: "get",
     success: function(data){

        var merge_repos = [];
        if (localStorage.getItem("merge_repos")){
            merge_repos = JSON.parse(localStorage.getItem("merge_repos"));
        }
         var table_rows = '<thead><tr><th>Repo Name</th><th>Forks</th><th>Stars</th><th>Import</th></tr></thead>';
         for (var i=0; i<data.items.length; i++){
            class_name = 'merged';
            if (merge_repos.indexOf(data.items[i].full_name) < 0){
                class_name = 'unmerged'
            }
            table_rows += '<tr class="'+ class_name +'" id="'+data.items[i].full_name+'">';
            table_rows +='<td>'+data.items[i].full_name+'</td><td>'+data.items[i].forks_count;
            table_rows += '</td><td>'+data.items[i].stargazers_count + '</td>';
            table_rows += '<td><button onclick=add_repo("'+data.items[i].full_name+'")> + </button></td></tr>';
         }
         document.getElementById('repo-table').innerHTML=table_rows;
     },
     error: function(error){
            alert(error.responseText);
    }
    });
}
