console.log('gj');
// Дані
const fullName = 'Michel Rigaurio';

const experience = [
    {
        position: 'Enter Job Position Here',
        period: 'Present',
        company: 'Company Name / Location',
        description: 'Lorem ipsum dolor sit amet, this is a thena consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore'
    },
    {
        position: 'Enter Job Position Here',
        period: '2017 - 2019',
        company: 'Company Name / Location',
        description: 'Lorem ipsum dolor sit amet, this is a thena consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore'
    }
];

const skills = [
    { name: 'Adobe photoshop', level: 88 },
    { name: 'Adobe Illustrator', level: 85 },
    { name: 'Adobe Indesign', level: 82 },
    { name: 'Power Point', level: 80 }
];

// Завдання 1: ім'я користувача
function setPersonName(name) {
    const element = document.getElementById('personName');
    if (element) {
        element.textContent = name; // текст, без вставлення HTML
    }
}

//  Завдання 2: стрілки, що згортають блоки
function initToggles() {
    const arrows = document.querySelectorAll('.arrow');

    arrows.forEach(function (arrow) {
        arrow.addEventListener('click', function () {
            const target = document.getElementById(arrow.dataset.target);
            if (!target) return;

            target.classList.toggle('is-hidden');   // показати / сховати контент
            arrow.classList.toggle('rotated');      // повернути стрілку
            arrow.setAttribute('aria-expanded', !target.classList.contains('is-hidden'));
        });
    });
}

//  Завдання 3: генерація розмітки з масивів
function renderExperience(list) {
    const container = document.getElementById('experienceList');
    if (!container) return;

    container.innerHTML = ''; // очищаємо перед вставленням

    const markup = list.map(function (job) {
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

function renderSkills(list) {
    const container = document.getElementById('skillsList');
    if (!container) return;

    container.innerHTML = '';

    const markup = list.map(function (skill) {
        const label = skill.name.replace(' ', '<br>'); // перенос рядка в кружку
        return '<div class="circle" style="--p:' + skill.level + '"><span>' + label + '</span></div>';
    }).join('');

    container.insertAdjacentHTML('beforeend', markup);
}

// Запуск після завантаження документа
document.addEventListener('DOMContentLoaded', function () {
    setPersonName(fullName);
    renderExperience(experience);
    renderSkills(skills);
    initToggles();
});