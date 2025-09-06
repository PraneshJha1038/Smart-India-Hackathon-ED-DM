document.addEventListener('DOMContentLoaded', () => {
  const formBox = document.querySelector('.form-box');
  setTimeout(() => formBox.classList.add('show'), 300);

  const btn = document.querySelector('.btn');
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(btn.clientWidth, btn.clientHeight);

    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    circle.classList.add('ripple');

    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

const sampleUsers = [
  {
    username: 'Pranesh Jha',
    password: 'Shine@123',
    isAdmin: false
  },
  {
    username: 'Admin',
    password: 'Admin@123',
    isAdmin: true
  }
];

function handleLogin(username, password) {
  const user = sampleUsers.find(u => u.username === username && u.password === password);

  const errorMessage = document.getElementById('error-message');

  if (user) {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    if (user.isAdmin) {
      window.location.href = 'admin-landing.html';
    } else {
      errorMessage.textContent = 'Admin Not Found. Login through general login page if not an Admin.';
        errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);
    }
  } else {
    errorMessage.textContent = 'Invalid username or password';
    errorMessage.style.display = 'block';

    setTimeout(() => {
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
    }, 3000);
  }
}
