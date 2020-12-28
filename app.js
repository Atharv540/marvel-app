
urls = ["url('https://i.pinimg.com/564x/18/d1/66/18d166334b7020b71ae4830e48cbdce4.jpg')",
        "url('https://i.pinimg.com/564x/f6/75/74/f67574061643f8b0e4958262c51fe557.jpg')",
        "url('https://i.pinimg.com/564x/74/35/13/74351340ed5eae54501d2c3f41afa3ea.jpg')"
]

for(x=0; x<10000000; x++){
    setInterval(function(){
            document.body.style.backgroundImage = urls[Math.floor(Math.random()*2)]
      }, 2000);
}