// var content3;
// var content;
// document.getElementById("aboutme").addEventListener("click", function(event) {
//     event.preventDefault();

//     // Mengganti seluruh konten di dalam elemen dengan ID "content"
//      content = document.getElementById("container");
//     const content2=document.getElementById("container2");
//     content.classList.add('hidden');

//     setTimeout(function() {
        
//         content2.style.display="flex";
//     content2.style.flexDirection="column"
//     content2.style.gap="2px";
//     content2.style.backgroundColor="rgba(0, 0, 0, 0.577)";
//     content2.style.color="white";
//     // content2.style.borderRadius="20px";
//     content2.style.fontSize="10px";
//     content2.style.padding="10px";
//     content2.style.width="100%";
//         content2.style.textAlign="center";
//         content3=content;
//     content.style.display="none";
    
//         content=content2;
//     ;
//     content.classList.remove('hidden')
//     },500)
    
// });
// document.getElementById("buttonback").addEventListener("click", function(event) {
//     event.preventDefault();

//     const content2=document.getElementById("container2");
//     content2.classList.add('hidden');

//     setTimeout(function() {
        
//         content=content3;
//     ;
//     content.classList.remove('hidden')
//     },500)
    
// });
// var content3;
var content; // Dideklarasikan di luar event listener untuk bisa diakses di kedua event listener

document.getElementById("aboutme").addEventListener("click", function(event) {
    event.preventDefault();

    // Mengganti seluruh konten di dalam elemen dengan ID "content"
    content = document.getElementById("container");
    const content2 = document.getElementById("container2");
    
    content.classList.add('hidden');
    
    setTimeout(function() {
        content2.style.display = "flex";
        content2.style.flexDirection = "column";
        content2.style.gap = "2px";
        content2.style.backgroundColor = "rgba(0, 0, 0, 0.577)";
        content2.style.color = "white";
        content2.style.fontSize = "10px";
        content2.style.padding = "10px";
        content2.style.width = "100%";
        content2.style.textAlign = "center";
        
        content3 = content; // Simpan konten lama ke dalam content3
        content.style.display = "none"; // Sembunyikan konten lama

        content = content2; // Set content ke content2 yang baru
        content.classList.remove('hidden');
        content2.scrollIntoView({
            behavior: 'smooth'  // Scroll secara halus
        });
    }, 500);
   
});

document.getElementById("buttonback").addEventListener("click", function(event) {
    event.preventDefault();

    const content2 = document.getElementById("container2");
    // const content3 = document.getElementById("container");

    content.style.transition = "all 0.5s ease";

    content2.classList.add('hidden');
    // content2.requestFullscreen()
    setTimeout(function() {
        
        content.style.display="none"
        content = content3; // Kembalikan konten lama
        content.style.display = "grid"; // Tampilkan konten lama
        content.classList.remove('hidden');        
        // content.classList.add('hidden');
        // content2.requestFullscreen()

    }, 500);
});
