// Логика транслита
function transliterate(input) {
  const cyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const latin = [
    'a', 'b', 'v', 'g', 'd', 'e', 'yo', 'zh', 'z', 'i', 'y', 'k', 'l', 'm',
    'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'shch',
    '', 'y', "'", 'e', 'yu', 'ya'
  ];
  
  const result = [];

  // цикл, чтобы пройти по каждому символу
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const index = cyrillic.indexOf(char.toLowerCase());

    // замена символа
    if (index !== -1) {
      if (char.toLowerCase() === char) {
        result.push(latin[index]);
      } else {
        result.push(latin[index].toUpperCase());
      }
    } else {
      result.push(char);
    }
  }


  return result.join('');
}


let tableIndex = 2; // таблица начинается с 2

// ввод Enter (событие)
document.querySelector('.blockInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTransliteration(); // Вызываем функцию транслита в табл
  }
});

// ввод при нажатии кнопки 'Добавить' (событие)
document.querySelector('.buttonInside').addEventListener('click', function () {
  addTransliteration(); /// Вызываем функцию транслита в табл
});

// добавление транслита в таблицу
function addTransliteration() {
  const inputElement = document.querySelector('.blockInput');
  const inputValue = inputElement.value.trim();

  if (inputValue !== '') {
    const transliteratedText = transliterate(inputValue); // переводим введенный текст
    addToTable(tableIndex, inputValue, transliteratedText); // Добавляем в таблицу

    tableIndex += 1; // каждая строка увеличивается на 1

    inputElement.value = ''; // очищение поле ввода
  }
}

// добавляем слова в таблицу
function addToTable(index, original, transliterated) {
  const tableBody = document.querySelector('.table-body');
  const row = document.createElement('tr');
  const indexCell = document.createElement('td'); 
  const russianCell = document.createElement('td');
  const translitCell = document.createElement('td');
  const deletCell = document.createElement('td');

  // Очищаем содержимое ячейки, чтобы номер индекса остался
  // indexCell.innerHTML = '';



  const isLongWord = original.length >= 7 || transliterated.length >= 7;
  const maxLength = 7;

  let displayedOriginal = original;
  let displayedTransliterated = transliterated;

  if (original.length > maxLength) {
    displayedOriginal = original.slice(0, maxLength) + '...';
  }


  if (transliterated.length > maxLength) {
    displayedTransliterated = transliterated.slice(0, maxLength) + '...';
  }

  // indexCell.textContent = index;

  // верхний бордер к строкам, начиная со второй
  if (index > 1) {
    row.classList.add('with-top-border');
  }


  // всплывающие подсказки для русского и транслитерированного текста
  const tooltipTranslit = document.createElement('span');
  tooltipTranslit.className = 'tooltip';
  tooltipTranslit.textContent = displayedTransliterated;
  tooltipTranslit.title = transliterated;
  translitCell.appendChild(tooltipTranslit);

  const tooltipRussian = document.createElement('span');
  tooltipRussian.className = 'tooltip';
  tooltipRussian.textContent = displayedOriginal;
  tooltipRussian.title = original;
  russianCell.appendChild(tooltipRussian);

  document.querySelector('tbody').children[0].children[0].removeAttribute("style")
  document.querySelector('tbody').children[0].children[3].removeAttribute("style")

  

  // кнопка для удаления строки из таблицы
  const deletButton = document.createElement('button');
  deletButton.className = 'delet';
  const deletImg = document.createElement('img');
  deletImg.src = 'icons/Group 1.svg';
  deletImg.alt = '';
  deletButton.appendChild(deletImg);

  // клик на кнопку удаления
  deletButton.addEventListener('click', function () {
    tableBody.removeChild(row);

    // console.log(rowIndex);

    if (document.getElementById('pain').children.length === 1) {
      document.getElementById('pain').children[0].children[0].setAttribute("style", "border-radius: 8px 0 0 8px;");
      document.getElementById('pain').children[0].children[3].setAttribute("style", "border-radius: 0 8px 8px 0;");
    }

      // Пересчитываю индексы строк в таблице после удаления
});


  //  стильй для кнопки удаления
  deletCell.className = 'deletBotten';
  deletButton.style.backgroundColor = '#b3abab';
  deletButton.style.border = 'none';
  deletButton.style.borderRadius = '50px';
  deletCell


  deletCell.appendChild(deletButton);

  // анимация кнопки удаления
  deletButton.addEventListener('mousedown', function () {
    this.style.transform = 'translateY(2px)';
  });

  deletButton.addEventListener('mouseup', function () {
    this.style.transform = '';
  });

  if (isLongWord) {
    // класс "long-word" и всплывающую подсказку для длинных слов
    russianCell.classList.add('long-word');
    russianCell.title = original;
    translitCell.classList.add('long-word');
    translitCell.title = transliterated;
  }

  // добавление в таблицу, того, что генирует  функция
  row.appendChild(indexCell);
  row.appendChild(russianCell);
  row.appendChild(translitCell);
  row.appendChild(deletCell);

  // новая строку в таблице
  tableBody.appendChild(row);
}

//  кнопк "Очистить текст"
document.querySelector('.clear-button').addEventListener('click', function () {
  window.location.reload();

});



