const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music array
const songs = [
	
	{
		name : 'dilbaro',
		displayName: 'Dilbaro',
		artist: 'Harshdeep Kaur, Vibha Saraf',
	},
	{
		name : 'ae-watan',
		displayName: 'Ae Watan',
		artist: 'Arijit Singh',
	},
	{
		name : 'gully-mein',
		displayName: 'Mere Gully Mein',
		artist: 'Divine',
	},
	{
		name : 'sher-aaya-sher',
		displayName: 'Sher Aaya Sher',
		artist: 'Divine',
	},
	{
		name : 'apna-time-ayega',
		displayName: 'Apna Time Ayega',
		artist: 'Ranveer Singh',
	},
	{
		name : 'asli-hip-hop',
		displayName: 'Asli Hip Hop',
		artist: 'Ranveer Singh',
	},
	{
		name : 'kab-se-kab-tak',
		displayName: 'Kab Se Kab Tak',
		artist: 'Ranveer Singh, Vibha Saraf',
	},
	{
		name : 'azadi',
		displayName: 'Azadi',
		artist: 'Divine, Dub Sharma',
	},
	{
		name : 'jingostan',
		displayName: 'Jingostan',
		artist: 'Dub Sharma',
	},
	{
		name : 'raabta',
		displayName: 'Raabta',
		artist: 'Arijit Singh',
	},
	{
		name : 'ek-pal-ka-jeena',
		displayName: 'Ek Pal Ka Jeena',
		artist: 'Lucky Ali',
	},
	{
		name : 'kaho-na-pyaar-hai',
		displayName: 'Kaho Na Pyaar Hai',
		artist: 'Udit Narayan, Alka Yagnik',
	},
	{
		name : 'dil-ne-pukara',
		displayName: 'Sitaro Ki Mehfil Me',
		artist: 'Babul Supriyo',
	},
	{
		name : 'na-tum-jano-na-hum',
		displayName: 'Na Tum Jano Na Hum',
		artist: 'Ramya, Lucky Ali',
	},
	{
		name : 'chand-sitare',
		displayName: 'Chand Sitare',
		artist: 'Kumar Sanu',
	},
	{
		name : 'kashti',
		displayName: 'Pyar Ki Kashti Mein',
		artist: 'Alka Yagnik, Udit Narayan',
	},
	{
		name : 'janeman',
		displayName: 'Janeman Janeman',
		artist: 'Asha Bhosle',
	},
	{
		name : 'chhor-denge',
		displayName: 'Chhor Denge',
		artist: 'Parampara Tandon',
	},
	{
		name : 'teri-mitti',
		displayName: 'Teri Mitti',
		artist: 'B Praak',
	},
];



// check if playing
let isPlaying = false;

// Play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// Pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

// Play or Pause Event Listerner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Prev song
function prevSong() {
	songIndex--;
	if(songIndex < 0){
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// Next song
function nextSong() {
	songIndex++;
	if(songIndex > songs.length - 1){
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

//On load - select 1st song
loadSong(songs[songIndex]);

// Update Progress Bar and time
function updateProgressBar(e) {
	if(isPlaying) {
		const {duration, currentTime} = e.srcElement;
		// update progress bar width
		const progressPercent = (currentTime/duration) * 100;
		progress.style.width = `${progressPercent}%`;
		// Calculate the display for duration
		const durationMinutes = Math.floor(duration/60);
		let durationSeconds = Math.floor(duration % 60);
		if(durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		// Delay switching the display the duration to avoid Nan
		if(durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}

		// Calculate the display for current time
		const currentMinutes = Math.floor(currentTime/60);
		let currentSeconds = Math.floor(currentTime % 60);
		if(currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set Progress Bar
function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const {duration} = music;
	// seconds at which the progress bar was clicked
	music.currentTime = (clickX/width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

document.body.onkeyup = function(e) {
	if(e.keyCode === 32 || e.keyCode == 13) {
		if(isPlaying) {
			pauseSong();
		}else{
			playSong();
		}
	}

	if(e.keyCode === 39) {
		nextSong();
	}

	if(e.keyCode === 37) {
		prevSong();
	}
}