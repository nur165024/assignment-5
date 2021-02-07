document.getElementById('searchBtn').addEventListener('click',function(){
    const inputSearch = document.getElementById('inputSearch').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`
    if(inputSearch === ''){
        alert('Please File is required');
    }else{
        fetch(url)
        .then(response => response.json())
        .then(data => {
            afterSearchResult(data);
        });
    }
});

const afterSearchResult = data => {
    if(data.meals === null){
        alert('there are no search data');
    }else{
        data.meals.forEach(element => { 
            const totalSearchData = document.getElementById('totalSearchData');
            const div = document.createElement('div');
            div.className = 'col-3';
            const loadData = `
                <div class="card">
                    <a onclick="searchDetailsPage('${element.idMeal}')" href="javascript:void(0);">
                        <img class="card-img-top" style="width:100%;" src="${element.strMealThumb}" alt="${element.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${element.strMeal}</h5>
                        </div>
                    </a>
                </div>
            `;
            
            div.innerHTML = loadData;
            totalSearchData.appendChild(div);
        });
    }
}

const searchDetailsPage = data => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        detailsPage(data);
    });
}

const detailsPage = data => {
    console.log(data.meals[0])
    document.getElementById('detailsShow').style.display = 'block';
    document.getElementById('contentShow').style.display = 'none';
    const totalSearchData = document.getElementById('detailsData');
    const div = document.createElement('div');
    div.className = 'col-8';
    const detailsText = `
        <a href="index.html" class="btn btn-info mb-4">Back</a>  
        <div class="card">    
            <img class="card-img-top" style="height: 400px;" src="${data.meals[0].strMealThumb}" alt="">
            <div class="card-body">
            <h2 class="card-title">${data.meals[0].strMeal}</h5>
            <ul>
                <li>${data.meals[0].strIngredient1}</li>
                <li>${data.meals[0].strIngredient2}</li>
                <li>${data.meals[0].strIngredient3}</li>
                <li>${data.meals[0].strIngredient4}</li>
                <li>${data.meals[0].strIngredient5}</li>
                <li>${data.meals[0].strIngredient6}</li>
            </ul>
            </div>
        </div>
    `;
    div.innerHTML = detailsText;
    totalSearchData.appendChild(div);
}