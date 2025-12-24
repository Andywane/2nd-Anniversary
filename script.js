const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const landing = document.getElementById('landing');
const options = document.getElementById('options');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const sound = document.getElementById('clickSound');

let move = 0;

noBtn.addEventListener('click', () => {
  sound.play();
  move += 60;
  noBtn.style.transform = `translateX(${move}px)`;
});

yesBtn.addEventListener('click', () => {
  sound.play();
  landing.classList.add('hidden');
  options.classList.remove('hidden');
});

document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => {
    sound.play();
    const type = option.dataset.modal;

    const content = {
      photos: '<h3>Our Memories 📸</h3><p>Add your photos here ❤️</p>',
      flowers: '<h3>For You 💐</h3><p>Imagine a bouquet just for you</p>',
      love: '<h3>I Love You ❤️</h3><p>More than words can say</p>',
      letter: '<h3>My Letter 💌</h3><p>You mean everything to me</p>'
    };

    modalContent.innerHTML = content[type] + '<br><br><button onclick="closeModal()">Close</button>';
    modal.classList.remove('hidden');
  });
});

function closeModal() {
  modal.classList.add('hidden');
}

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});