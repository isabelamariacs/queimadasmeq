/* ======= MENU MOBILE ======= */
function toggleMenu(){
  const menu = document.getElementById('menu');
  const btn = document.querySelector('.hamburger');
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* ======= CARROSSEL (auto + botões + bolinhas) ======= */
let slideIndex = 1;
let slideTimer = null;

function showSlides(n){
  const slides = document.getElementsByClassName('slides');
  const dots = document.getElementsByClassName('dot');
  if(slides.length === 0) return;

  if(n > slides.length) slideIndex = 1;
  if(n < 1) slideIndex = slides.length;

  // esconde todos
  for(let i=0;i<slides.length;i++) slides[i].style.display = 'none';
  for(let i=0;i<dots.length;i++) dots[i]?.classList.remove('active');

  slides[slideIndex-1].style.display = 'block';
  dots[slideIndex-1]?.classList.add('active');

  // reinicia auto-play
  if(slideTimer) clearTimeout(slideTimer);
  slideTimer = setTimeout(()=> { plusSlides(1); }, 5000);
}

function plusSlides(n){
  showSlides(slideIndex += n);
}

function currentSlide(n){
  showSlides(slideIndex = n);
}

// inicializa carrossel na Home
document.addEventListener('DOMContentLoaded', () => {
  showSlides(slideIndex);
});

/* ======= QUIZ (Guia) ======= */
function avaliarQuiz(ev){
  ev.preventDefault();
  const form = ev.target;
  const respostasCorretas = {
    q1:'correta', q2:'correta', q3:'correta', q4:'correta', q5:'correta'
  };
  let score = 0, total = 0;
  for(const q in respostasCorretas){
    total++;
    const marcada = form.querySelector(`input[name="${q}"]:checked`);
    if(marcada && marcada.value === respostasCorretas[q]) score++;
  }
  const msg = `Você acertou ${score} de ${total} questões!`;
  const out = document.getElementById('resultadoQuiz');
  if(out){
    out.textContent = msg;
    out.style.color = score === total ? '#0b6b2b' : (score >= Math.ceil(total/2) ? '#b8860b' : '#b22222');
  } else {
    alert(msg);
  }
}
