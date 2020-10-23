let param = '';
let inputDescription = document.getElementById('inputTitle');
let inputLocalisation = document.getElementById('inputLocalisation');
let inputTime = document.getElementById('inputTime');
let description;
let locations;
let dateActuelle = new Date();
let index = 2;

function getJob(param) {
    fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?${param}`)
    .then((response) => response.json())
    .then((data) => {
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

    if(jourspasser >= 7) {
        jobTempsPasser = "il y a " + Math.round(jourspasser / 7) + "sem";
    }
    else if (jourspasser > 0) {
        jobTempsPasser = "il y a " + jourspasser + "j";
    }
    else if (heuresPasser > 0) {
        jobTempsPasser = "il y a " + heuresPasser + "h";
    }
    else if (minutesPasser > 0) {
        jobTempsPasser = "il y a " + minutesPasser + "m";
    }
    else {
        jobTempsPasser = "il y a " + secondePasser + "sec";
    }
    return jobTempsPasser;
}

getJob();


[document.getElementById('bouton'), document.getElementById('boutonResponsive')].forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if(inputDescription.value != '' && inputLocalisation.value != '' && inputTime.checked == true) {
            locations = "location=" + inputLocalisation.value;
            description = "description=" + inputDescription.value;
            param = description + "&" + locations + '&full_time=on';
            getJob(param);
        }
        else if(inputLocalisation.value != '' && inputTime.checked == true) {
            locations = "location=" + inputLocalisation.value;
            param = locations + '&full_time=on';
            getJob(param);
        }
        else if(inputDescription.value != '' && inputTime.checked == true) {
            description = "description=" + inputDescription.value;
            param = description + '&full_time=on';
            getJob(param);
        }
        else if(inputDescription.value != '' && inputLocalisation.value != '') {
            locations = "location=" + inputLocalisation.value;
            description = "description=" + inputDescription.value;
            param = description + "&" + locations;
            getJob(param);
        }
        else if(inputDescription.value != ''){
            description = "description=" + inputDescription.value;
            param = description;
            getJob(param); 
        } 
        else if(inputLocalisation.value != ''){
            locations = "location=" + inputLocalisation.value;
            param = locations;
            getJob(param);
        }
        else if (inputTime.checked === true) {
            param = 'full_time=on';
            getJob(param);
        }
        document.querySelector('section').innerHTML = '';
    })
})

document.querySelector('.voir-plus-container a').addEventListener('click', () => {
    page = param + "&page=" + index;
    getJob(page);
    index++;
})

window.matchMedia("(max-width: 675px)").addEventListener('change', () => {
    if (window.matchMedia("(max-width: 675px)").matches) {
        document.querySelector('.search p').textContent= "Full Time";
    }
    else {
        document.querySelector('.search p').textContent= "Full Time Only";
    }
});

