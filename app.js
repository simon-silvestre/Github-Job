let param = '';

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
    const jobCard = document.createElement('div');
    jobCard.className = "job-card"
        jobCard.innerHTML = `
            <div class="job-img"><img src="${job.company_logo}" alt="logo de l\'entreprise"></div>
            <div class="job-hours">
                <p class="job-date">${job.created_at}</p>
                <span class="separateur"></span>
                <p class="job-type">${job.type}</p>
            </div>
            <p class="job-name">${job.title}</p>
            <p class="job-entreprise">${job.company}</p>
            <small class="job-location">${job.location}</small>
            `
        document.querySelector('section').append(jobCard);
}

getJob();

document.getElementById('bouton').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('section').innerHTML = '';
    param = "location=" + document.getElementById('inputLocalisation').value ;
    getJob(param);
})