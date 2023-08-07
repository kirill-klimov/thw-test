export let data = `[
  {
      "name": "name",
      "label": "Имя",
      "type": "STRING",
      "max_length": 255,
      "min_lengh": 3,
      "regex": "^[a-zA-Z\s]+$"
  },{
      "name": "surname",
      "label": "Фамилия",
      "type": "STRING",
      "max_length": 255,
      "min_lengh": 3,
      "regex": "^[a-zA-Z\s]+$"
  },{
      "name": "age",
      "label": "Полных лет",
      "type": "NUMBER",
      "min": 1,
      "max": 100
  },{
      "name": "email",
      "label": "Email",
      "type": "EMAIL"
  }
]`;

export function shuffleData() {
    let parsedData = JSON.parse(data);
    let currentIndex = parsedData.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [parsedData[currentIndex], parsedData[randomIndex]] = [
            parsedData[randomIndex], parsedData[currentIndex]
        ];
    }    
    data = JSON.stringify(parsedData);
}