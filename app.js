let param = '';
let inputSearch;
let inputLocalisation;
let fullTime = 'off';
let dateActuelle = new Date();

function getJob(param) {
    fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?${param}&full_time=${fullTime}`)
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('section').innerHTML = '';
        for(let job of data) {
            addDataToDOM(job);
        };
    }); 
}
 
function addDataToDOM(job) {
    let timeago = timeAgo(job);
    
    const jobCard = document.createElement('div');
    jobCard.className = "job-card"
        jobCard.innerHTML = `
            <div class="job-img"><img src="${job.company_logo}" alt="logo de l\'entreprise"></div>
            <div class="job-hours">
                <p class="job-date">${timeago}</p>
                <span class="separateur"></span>
                <p class="job-type">${job.type}</p>
            </div>
            <p class="job-name">${job.title}</p>
            <p class="job-entreprise">${job.company}</p>
            <small class="job-location">${job.location}</small>
            `
        document.querySelector('section').append(jobCard);
}

function timeAgo(job) {
    let jobDate = new Date(job.created_at).getTime();
    let tempsPasser = (dateActuelle - jobDate) / 1000;
    var jobTempsPasser = 0;
    
    let jourspasser    = Math.round(tempsPasser / 86400);
    let heuresPasser   = Math.round((tempsPasser - (jourspasser * 86400)) / 3600);
    let minutesPasser  = Math.round((tempsPasser - (jourspasser * 86400 + heuresPasser * 3600)) / 60);
    let secondePasser  = Math.round(tempsPasser - (jourspasser * 86400 + heuresPasser * 3600 + minutesPasser * 60));

    if (jourspasser > 0) {
        jobTempsPasser = "il y a " + jourspasser + "j";
    }
    else if (heuresPasser > 0) {
        jobTempsPasser = "il y a " + heuresPasser + "h";
    }
    else if (minutesPasser > 0) {
        jobTempsPasser = "il y a " + minutesPasser + "m";
    }
    else {
        jobTempsPasser = "il y a " + secondePasser + "s";
    }
    return jobTempsPasser;
}

getJob();


[document.getElementById('bouton'), document.getElementById('boutonResponsive')].forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if(document.getElementById('inputTitle').value != ''){
            inputSearch = "search=" + document.getElementById('inputTitle').value;
            param = inputSearch;
        } 
        else if(document.getElementById('inputLocalisation').value != ''){
            inputLocalisation = "location=" + document.getElementById('inputLocalisation').value;
            param = inputLocalisation;
        }
        else if (document.getElementById('inputTime').checked == true) {
            fullTime = 'on';
        }
        else if(document.getElementById('inputTitle').value == true && document.getElementById('inputLocalisation').value == true) {
            param = inputSearch + "&" + inputLocalisation;
        }
        getJob(param);
        param = '';
        fullTime = 'off';
    })
})

window.matchMedia("(max-width: 675px)").addEventListener('change', () => {
    if (window.matchMedia("(max-width: 675px)").matches) {
        document.querySelector('.search p').textContent= "Full Time";
    }
    else {
        document.querySelector('.search p').textContent= "Full Time Only";
    }
});
