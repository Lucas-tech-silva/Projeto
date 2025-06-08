function derrubarSite() {
  const conteudo = document.getElementById('conteudo');
  const bloqueio = document.getElementById('bloqueio');

  if (conteudo) conteudo.style.display = 'none';
  if (bloqueio) bloqueio.style.display = 'flex';
}

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert("Right click disabled. 🔒");
});


document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
    (e.ctrlKey && e.key.toLowerCase() === 'u') ||
    (e.ctrlKey && e.key.toLowerCase() === 's')
  ) {
    e.preventDefault();
    derrubarSite();
  }
});


document.addEventListener('keyup', function (e) {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText('');
    derrubarSite();
  }
});



const form = document.getElementById('formulario-contato');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function (event) {

  form.style.display = 'none';
  successMessage.style.display = 'block';

  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }

  let confettiCount = 30;
  let interval = setInterval(() => {
    createConfetti();
    confettiCount--;
    if (confettiCount <= 0) clearInterval(interval);
  }, 100);
});


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      successMessage.style.display = 'block';
      form.reset();
    } else {
      alert('Erro ao enviar a mensagem.');
    }
  } catch (error) {
    alert('Erro de conexão. Tente novamente mais tarde.');
  }
});

const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador-caracteres");

mensagem.addEventListener("input", () => {
  contador.textContent = `${mensagem.value.length} / 1000`;
});
