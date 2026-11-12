const DATA_URL = 'data.json';

// ---------- Службове повідомлення про помилку ----------
function showMessage(text) {
    const box = document.getElementById('statusMessage');
    if (!box) return;
    box.textContent = text;
    box.classList.remove('is-hidden');
}

// ---------- Завантаження даних через Fetch API ----------
function loadData(url) {
    return fetch(url).then(function (response) {
        if (!response.ok) {
            throw new Error('Помилка запиту: ' + response.status);
        }
        return response.json(); // відповідь -> JavaScript-об'єкт
    });
}

// ---------- Підстановка імені та посади ----------
function setPersonName(person) {
    const fullName = document.getElementById('personName');
    if (fullName) {
        fullName.textContent = person.firstName + ' ' + person.lastName;
    }

    const first = document.getElementById('firstName');
    const last = document.getElementById('lastName');
    const position = document.getElementById('personPosition');
    if (first) first.textContent = person.firstName;
    if (last) last.textContent = person.lastName;
    if (position) position.textContent = person.position;
}

// ---------- Генерація розмітки з масивів ----------
function renderExperience(jobs) {
    const container = document.getElementById('experienceList');
    if (!container) return;

    container.innerHTML = '';

    const markup = jobs.map(function (job) {
        return '<div class="card job-card">' +
            '<div class="card-body">' +
            '<h3 class="card-title">' + job.position + '</h3>' +
            '<div class="meta d-flex align-items-center gap-3">' +
            '<span class="badge bg-warning text-dark">' + job.period + '</span>' +
            '<span>' + job.company + '</span>' +
            '</div>' +
            '<p class="card-text">' + job.description + '</p>' +
            '</div>' +
            '</div>';
    }).join('');

    container.insertAdjacentHTML('beforeend', markup);
}

function renderSkills(skills) {
    const container = document.getElementById('skillsList');
    if (!container) return;

    container.innerHTML = '';

    const markup = skills.map(function (skill) {
        const label = skill.name.replace(' ', '<br>');
        return '<div class="circle" style="--p:' + skill.level + '"><span>' + label + '</span></div>';
    }).join('');

    container.insertAdjacentHTML('beforeend', markup);
}

// ---------- Стрілки, що згортають блоки ----------
function initToggles() {
    const arrows = document.querySelectorAll('.arrow');

    arrows.forEach(function (arrow) {
        // на старті всі блоки розгорнуті, тож стрілка дивиться вгору
        arrow.classList.add('rotated');

        arrow.addEventListener('click', function () {
            const target = document.getElementById(arrow.dataset.target);
            if (!target) return;

            target.classList.toggle('is-hidden');
            arrow.classList.toggle('rotated');
            arrow.setAttribute('aria-expanded', !target.classList.contains('is-hidden'));
        });
    });
}

// ---------- Запуск після завантаження документа ----------
document.addEventListener('DOMContentLoaded', function () {
    initToggles(); // стрілки працюють, навіть якщо дані не завантажились

    loadData(DATA_URL)
        .then(function (data) {
            setPersonName(data.person);
            renderExperience(data.jobs);
            renderSkills(data.skills);
        })
        .catch(function (error) {
            console.error(error);
            showMessage('Не вдалося завантажити дані. Перевірте, чи сторінку відкрито через локальний сервер.');
        });
});