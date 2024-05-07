 async function fetchData(apiEndpoint, containerId) {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const Sports = data.games;
    const sportsName = data.sports[0].name;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    const leagueId = data.competitions[0].id;
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    let matchesFound = false;
    
    // Use an object to group events by estTimeStr
    const groupedEvents = {};
    
    for (const sport of Sports) {
      if (
        sport.statusText !== "Ended" &&
        sport.statusText !== "After Penalties" &&
        sport.statusText !== "After ET" &&
        sport.statusText !== "Postponed" &&
        sport.statusText !== "Final" &&
        sport.statusText !== "Final (OT)" &&
        sport.statusText !== "Final (SO)"
      ) {
        const gameDate = new Date(sport.startTime);
    
        const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
        // Check if the game is scheduled for today
        if (
          gameDate.getDate() === today.getDate() &&
          gameDate.getMonth() === today.getMonth() &&
          gameDate.getFullYear() === today.getFullYear()
        ) {
          matchesFound = true;
    
          // Create a unique key for the estTimeStr
          const key = `scheduled_${estTimeStr}`;
    
          // If the key doesn't exist, create it with an empty array
          if (!groupedEvents[key]) {
            groupedEvents[key] = [];
          }
    
          // Push the current sport into the array
          groupedEvents[key].push(sport);
        }
        // if live now
        else if (sport.statusText !== "Scheduled") {
          matchesFound = true;
    
          // Create a unique key for the estTimeStr
          const key = `live_${estTimeStr}`;
    
          // If the key doesn't exist, create it with an empty array
          if (!groupedEvents[key]) {
            groupedEvents[key] = [];
          }
    
          // Push the current sport into the array
          groupedEvents[key].push(sport);
        }
      }
    }
    
   // Iterate through the groupedEvents object and create HTML structure
for (const key in groupedEvents) {
  const events = groupedEvents[key];
  const isLive = events[0].statusText !== "Scheduled";
  const estTimeStr = new Date(events[0].startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const teamContainer = document.createElement('div');
  teamContainer.innerHTML = `
              ${events.map(event => `<ul class="f1-podium f1-color--carbonBlack" style="margin-top: 15px;">
              <li style="font-weight: bold">
                    <a class="f1-podium--link" href="#">
                     <!-- League name and logo -->
                         <img style="width: 30px; height: 30px;" alt="" src="https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v4/Competitions/${leagueId}">
                         <span style="padding-left: 3px;">${leagueName}</span>
                     </a>
             </li>
                                                                                                  <li class="f1-podium--item">
                 <a href="https://stream.krbgy.xyz/#${event.id}#${leagueSlug}" target="_blank" class="f1-podium--link f1-bg--white">
                     <span class="f1-podium--rank f1-bold--xs" style="min-width: 35px;width: unset;">
                     ${sportsName}
                     </span>
         
                     <span class="team-color-icon" style="background:#00D2BE"></span>
                     <span class="f1-podium--driver f1--xs MacBaslik">
                        
                         <span class="d-md-inline f1-capitalize">
                             ${event.homeCompetitor.name} vs ${event.awayCompetitor.name}
                         </span>
                     </span>
                     <span class="f1-podium-right">
                         <span class="f1-podium--time f1-label f1-bg--gray2 misc--label text-semi-bold ${isLive ? 'live-text' : ''}">
                             ${isLive ? 'LIVE' : estTimeStr}
                     </span>
                         <i class="icon icon-chevron-right f1-color--warmRed"></i>
                     </span>
             </a>
             </li>
          </ul>
              `).join('')}
            `;
  container.appendChild(teamContainer);
}
 
    if (!matchesFound) {
      // No matches found, hide the container
      container.style.display = 'none';
    }
    }
    
    
    
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=624', 'cafleague');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=7', 'premierleague');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=103', 'nba');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=6064', 'rio');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=366', 'nhl');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=11', 'laliga');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=35', 'ligue1');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=102', 'Libertadores');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=25', 'budesliga');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=17', 'seriaA');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=572', 'championsleague');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=573', 'europaleague');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=13', 'delray');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=104', 'mls');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=649', 'saudi');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=8', 'facup');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=141', 'ligamx');
    fetchData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=623', 'afc');




    // ESPN CODE 
    let today = new Date();
 let year = today.getFullYear();
 let month = String(today.getMonth() + 1).padStart(2, '0');
 let day = String(today.getDate()).padStart(2, '0');
 let formattedDate = year + month + day;


 // ufc fight night //
const API_mma = `https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=${formattedDate}`;
async function getmmafixture() {
  const response = await fetch(`${API_mma}`);
  const data = await response.json();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const league = data.leagues;
  const Slug = league[0].slug;
  const ufclogo = league[0].logos[0].href;
  const events = data.events;
  let matchesFound = false;
  for (const event of events) {
      if (event.status.type.description !== "Postponed"){
        const fightnight = event.name;
        const fightnameshort = event.shortName;
        const detail = event.status.type.detail;
        const eventId = event.id;
        const eventDate = new Date(event.date);
        const estTimeStr = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });   
        const eventDayOfWeek = eventDate.getDay();
        const startTime = new Date(event.date);
        const currentTime = new Date();
        const mma_URL = `https://ufc.krbgy.xyz/#${fightnight}`;
        
     const container = document.querySelector('#mmafixtures');
    const teamContainer = document.createElement('div');
        teamContainer.innerHTML = `
            <ul class="f1-podium f1-color--carbonBlack" style="margin-top: 15px;">
                  <li style="font-weight: bold">
                        <a class="f1-podium--link" href="#">
                         
                             <img style="width: 30px; height: 30px;" alt="" src="${ufclogo}">
                             <span style="padding-left: 3px;">UFC</span>
                         </a>
                 </li>
                                                                                                      <li class="f1-podium--item">
                     <a href="${mma_URL}" target="_blank" class="f1-podium--link f1-bg--white">
                         <span class="f1-podium--rank f1-bold--xs" style="min-width: 35px;width: unset;">
                         UFC
                         </span>
             
                         <span class="team-color-icon" style="background:#00D2BE"></span>
                         <span class="f1-podium--driver f1--xs MacBaslik">
                            
                             <span class="d-md-inline f1-capitalize">
                                 ${fightnight} - ${fightnameshort}
                             </span>
                         </span>
                         <span class="f1-podium-right">
                             <span class="f1-podium--time f1-label f1-bg--gray2 misc--label text-semi-bold">
                                 ${estTimeStr}
                         </span>
                             <i class="icon icon-chevron-right f1-color--warmRed"></i>
                         </span>
                 </a>
                 </li>
              </ul>
  `
  ;
    container.appendChild(teamContainer); 
    matchesFound = true;
  }

}
 //   IF NO MATCHES TODAY SHOW THIS CODE 
 if (!matchesFound) {document.getElementById("mmafixtures").style.display = "none";}
}
getmmafixture()

// -- end mma fixtuers -- //


 // Boxing Matches 
 async function main() {
        const response = await fetch("https://boxingschedule.co/");
        const src = await response.text();
        const soup = new DOMParser().parseFromString(src, 'text/html');
        const boxingDiv = document.querySelector("#boxing");

        // Keywords to exclude
        const exclude_keywords = ["Contact", "News", "Videos", "Tickets", "Rankings", "Results", "Gyms", "Live", "Crossover", "Top", "Follow Us", "Like Us", "Youtube", "Follow on IG", "Submit Boxing Event", "Privacy Policy", "About Us"];

        // Get today's date in the format "Month Day"
        const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        // Object to store fights grouped by date
        const fightsByDate = {};

        // Find all <ul> elements containing fight information
        const ul_elements = soup.querySelectorAll('ul');

        ul_elements.forEach(ul => {
            // Find the parent element containing the date
            const date_parent = ul.previousElementSibling;

            if (date_parent) {
                const date_strong = date_parent.querySelector('strong');

                if (date_strong) {
                    let date = date_strong.textContent.trim();
                    // Extract only what's before the ":" character
                    date = date.split(":")[0].trim();

                    // Extract text from each <li> element within <ul>
                    ul.querySelectorAll('li').forEach(li => {
                        let fight_info = li.textContent.trim();
                        if (!exclude_keywords.some(keyword => fight_info.includes(keyword))) {
                            // Extract only what's before the comma (",") character
                            fight_info = fight_info.split(",")[0].trim();

                            // Group fights by date
                            if (!fightsByDate[date]) {
                                fightsByDate[date] = [];
                            }
                            fightsByDate[date].push(fight_info);
                        }
                    });
                }
            }
        });

        // Find all <p> elements containing fight information
        const p_elements = soup.querySelectorAll('p');

        p_elements.forEach(p => {
            const strong_tag = p.querySelector('strong');

            if (strong_tag) {
                let date = strong_tag.textContent.trim();
                // Extract only what's before the ":" character
                date = date.split(":")[0].trim();

                // Extract fight details excluding the date
                const fights = Array.from(p.querySelectorAll('br')).slice(1);

                fights.forEach(fight => {
                    let fight_info = fight.nextSibling.textContent.trim();
                    if (!exclude_keywords.some(keyword => fight_info.includes(keyword))) {
                        // Extract only what's before the comma (",") character
                        fight_info = fight_info.split(",")[0].trim();

                        // Group fights by date
                        if (!fightsByDate[date]) {
                            fightsByDate[date] = [];
                        }
                        fightsByDate[date].push(fight_info);
                    }
                });
            }
        });

        // Create <div> elements for each date with associated fights
        for (const date in fightsByDate) {
            if (fightsByDate.hasOwnProperty(date)) {
                const fightInfos = fightsByDate[date];

                // Create <ul> element for this date
                const ulElement = document.createElement("ul");
                ulElement.classList.add("f1-podium", "f1-color--carbonBlack");
                ulElement.style.marginTop = "15px"; // Add margin-top

                // Add bold <li> element with link to each <ul>
                const boldLiElement = document.createElement("li");
                boldLiElement.style.fontWeight = "bold";
                boldLiElement.innerHTML = `
                    <a class="f1-podium--link" href="#">
                        <img style="width: 30px; height: 30px;" alt="" src="https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-boxing.png">
                        <span style="padding-left: 3px;">Boxing</span>
                    </a>
                `;
                ulElement.appendChild(boldLiElement);

                // Append all fight info for this date under the same <ul>
                fightInfos.forEach(fight_info => {
                    if (fight_info.trim() !== '') { // Check if fight_info is not empty
                        const liElement = document.createElement("li");
                        liElement.innerHTML = `
                            <a href="https://boxing.krbgy.xyz/#${fight_info}" target="_blank" class="f1-podium--link f1-bg--white">
                                <span class="f1-podium--rank f1-bold--xs" style="min-width: 35px;width: unset;">Boxing</span>
                                <span class="team-color-icon" style="background:#00D2BE"></span>
                                <span class="f1-podium--driver f1--xs MacBaslik">
                                    <span class="d-md-inline f1-capitalize">${fight_info}</span>
                                </span>
                                <span class="f1-podium-right">
                                    <span class="f1-podium--time f1-label f1-bg--gray2 misc--label text-semi-bold">
                                        ${date === today ? `<button class="event-button" onclick="handleButtonClick('${fight_info}')">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 53 58" height="15" width="15">
                                                <path stroke-width="9" stroke="currentColor" d="M44.25 36.3612L17.25 51.9497C11.5833 55.2213 4.5 51.1318 4.50001 44.5885L4.50001 13.4115C4.50001 6.86824 11.5833 2.77868 17.25 6.05033L44.25 21.6388C49.9167 24.9104 49.9167 33.0896 44.25 36.3612Z"></path>
                                            </svg> Live
                                        </button>` : date}
                                    </span>
                                    <i class="icon icon-chevron-right f1-color--warmRed"></i>
                                </span>
                            </a>
                        `;
                        ulElement.appendChild(liElement);
                    }
                });

                // Append the <ul> element directly to the boxingDiv
                boxingDiv.appendChild(ulElement);
            }
        }
    }

    // Run the main function after the DOM content is loaded
    document.addEventListener('DOMContentLoaded', () => {
        main();
    });
