const text = `
Happy 2nd Anniversary, my love.

Two years with you have been full of laughter,
comfort, and so many beautiful memories.
You make my days brighter and my heart calmer.

Thank you for loving me,
for choosing me,
and for growing with me.
I am so grateful to have you by my side.

Here’s to many more years of happiness,
adventure, and endless love together.
I love you more than words can say.

Here’s to us — andrea.
`;


let index = 0;
const speed = 40;
const letterEl = document.getElementById("letterText");

function typeLetter() {
  if (index < text.length) {
    letterEl.textContent += text.charAt(index);
    index++;
    setTimeout(typeLetter, speed);
  }
}

typeLetter();
