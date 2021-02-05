const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// deshabilita/habilita el boton
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// pasa el chiste a VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: 'd392c1b695e941f5ab82147b4aca233c',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

// trae un chiste de joke API
const getJokes = async () => {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.setup
      ? (joke = `${data.setup} ... ${data.delivery}`)
      : (joke = data.joke);
    // pasa texto a voz
    tellMe(joke);
    // deshabilita el boton
    toggleButton();
  } catch (error) {
    console.log('fetch failed', error);
  }
};

// trae un chiste cada vez que aprieto el boton
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
