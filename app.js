fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=0')
.then((response) => response.json())
.then((data) => {
    for(let job of data) {
        let jobLogo = job.company_logo;
        let jobDate = job.created_at;
        let jobType = job.type;
        let jobName= job.title;
        let jobEntreprise= job.company;
        let jobLocation= job.location;
        let jobCard = document.createElement('div');
        jobCard.className = "job-card"
        jobCard.innerHTML = '<div class="job-img"><img src="' + jobLogo + '" alt="logo de l\'entreprise"></div><div class="job-hours"><p class="job-date">' + jobDate + '</p><span class="separateur"></span><p class="job-type">' + jobType + '</p></div><p class="job-name">' + jobName + '</p><p class="job-entreprise">' + jobEntreprise + '</p><small class="job-location">' + jobLocation + '</small>'
        document.querySelector('section').append(jobCard);
    };
});
 
