const headHtml = `
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#000000">
<link rel="icon" href="./src/image/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="./src/styles/style.css">`;

const headElement = document.head;
headElement.insertAdjacentHTML("beforeend", headHtml);