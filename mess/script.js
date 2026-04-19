const data = {
    currentUser: {
        id: 'ugryum',
        name: 'Угрюм-Бурчеев',
        status: 'Прямая линия — это единственное спасение.',
        initials: 'УБ'
    },
    friends: [
        { id: 'brudasty', name: 'Дементий Брудастый', initials: 'ДБ' },
        { id: 'borodavkin', name: 'Василиск Бородавкин', initials: 'ВБ' },
        { id: 'ferdyshchenko', name: 'Петр Фердыщенко', initials: 'ПФ' },
        { id: 'mikaladze', name: 'Ксаверий Микаладзе', initials: 'КМ' },
        { id: 'glupovtsy', name: 'Жители Глупова (Чат)', initials: 'ГЛ' }
    ],
    chats: {
        'brudasty': [
            { sender: 'ugryum', text: 'Я приказал снести кривые переулки. Будет только прямая линия!' },
            { sender: 'brudasty', text: 'Не потерплю!' },
            { sender: 'ugryum', text: 'И реку мы запрудим. Она течет неправильно.' },
            { sender: 'brudasty', text: 'Разорю!!!' }
        ],
        'borodavkin': [
            { sender: 'borodavkin', text: 'Коллега, вы слышали? Народ опять не хочет сеять горчицу!' },
            { sender: 'ugryum', text: 'Зачем им горчица? Им нужен устав и одинаковые серые кафтаны.' },
            { sender: 'borodavkin', text: 'Но просвещение... Я ради него три слободы сжег!' },
            { sender: 'ugryum', text: 'Слишком много лишних движений. Нужно просто всё сравнять с землей.' }
        ],
        'ferdyshchenko': [
            { sender: 'ferdyshchenko', text: 'Угрюм-Бурчеич, тут такое дело... кушать очень хочется. Нет ли у вас лишнего пирога?' },
            { sender: 'ugryum', text: 'Еда — это излишество, ведущее к разврату мысли. Встаньте в строй.' },
            { sender: 'ferdyshchenko', text: 'Да какой строй, когда в животе урчит? Я вот в свое время с Аленкой-булочницей... эх!' },
            { sender: 'ugryum', text: 'Ваше легкомыслие оскорбляет геометрию города. Вы исключены из списка благонадежных.' }
        ],
        'mikaladze': [
            { sender: 'mikaladze', text: 'Дорогой друг, зачем так много маршировать? Посмотрите, какие прекрасные дамы в Глупове!' },
            { sender: 'ugryum', text: 'Женщины должны быть распределены по взводам и иметь порядковые номера.' },
            { sender: 'mikaladze', text: 'О, вы так грубы! Администрация — это искусство обольщения, а не казарма.' },
            { sender: 'ugryum', text: 'Администрация — это когда все молчат и смотрят в затылок друг другу.' }
        ],
        'glupovtsy': [
            { sender: 'glupovtsy', text: 'Батюшка градоначальник! Помилуй! Зачем дома наши ломаешь? Где жить-то будем?' },
            { sender: 'ugryum', text: 'Ваши дома нарушают перспективу. Будете жить в образцовых казармах №1-100.' },
            { sender: 'glupovtsy', text: 'Так холодно же там, и река из берегов вышла, гневается!' },
            { sender: 'ugryum', text: 'Реку я упраздню. Город переименую в Непреклонск. Жалобы не принимаются.' }
        ]
    }
};

const myProfileEl = document.getElementById('my-profile');
const friendsListEl = document.getElementById('friends-list');
const chatHeaderEl = document.getElementById('chat-header');
const chatMessagesEl = document.getElementById('chat-messages');

function init() {
    myProfileEl.innerHTML = `
        <div class="avatar">${data.currentUser.initials}</div>
        <div class="info">
            <h2>${data.currentUser.name}</h2>
            <p>${data.currentUser.status}</p>
        </div>
    `;

    data.friends.forEach(friend => {
        const li = document.createElement('li');
        li.className = 'friend-item';
        li.onclick = () => openChat(friend, li);
        li.innerHTML = `
            <div class="avatar">${friend.initials}</div>
            <div class="info">
                <h2>${friend.name}</h2>
            </div>
        `;
        friendsListEl.appendChild(li);
    });
}

function openChat(friend, element) {
    document.querySelectorAll('.friend-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    chatHeaderEl.innerHTML = `
        <div class="avatar">${friend.initials}</div>
        <div class="info">
            <h2>${friend.name}</h2>
            <p>В сети</p>
        </div>
    `;

    chatMessagesEl.innerHTML = '';
    const messages = data.chats[friend.id] || [];

    messages.forEach(msg => {
        const isSentByMe = msg.sender === data.currentUser.id;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isSentByMe ? 'sent' : 'received'}`;
        const authorName = isSentByMe ? data.currentUser.name : friend.name;
        msgDiv.innerHTML = `<span class="author-name">${authorName}</span>${msg.text}`;
        chatMessagesEl.appendChild(msgDiv);
    });

    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

init();