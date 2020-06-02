
// // Handle error 404
// xhr.onloadend = function () {
//     if (xhr.status == 404)
//         throw new Error(url + ' replied 404');
// }


// window.onload = () => {
//     //Save an image blob
//     var xhr = new XMLHttpRequest();

//     var url = 'https://s2.glbimg.com/slaVZgTF5Nz8RWqGrHRJf0H1PMQ=/0x0:800x450/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/U/e/NTegqdSe6SoBAoQDjKZA/cachorro.jpg';

//     xhr.responseType = 'blob'; //Set the response type to blob so xhr.response returns a blob
//     xhr.open('GET', url, true); 
//     xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//     // xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == xhr.DONE) {
//             //When request is done
//             //xhr.response will be a Blob ready to save
//             saveAs(xhr.response, 'image.jpeg');
//         }
//     };

//     xhr.send();
//}


// window.onload = () => {
//     var fr = new FileReader();
//     fr.onload = (function (theFile) {
//         return function (e) {
//             var link = e.target.result;
//             console.log(link);
//         };
//     });

//     fr.readAsDataURL(document.getElementById('img'));
// }

window.onload = function getBase64FromImageUrl() {
    var url = "https://mangadex.org/data/c4b3fe284643dafff260a9e05d78a576/s20.png";
    var img = document.getElementById("img");


    //img.setAttribute('crossOrigin', 'anonymous');

    img.src = url;

    // var blob = new this.Blob([img], { type: "text/html" });

    // var link;

    // console.log(blob);

    // var fr = new FileReader();
    // fr.onload =  function (e) {
    //         var link = e.target.result;
    //         img.src = link;
    //         console.log(link);
    //     }

    // fr.readAsDataURL(blob);

    var doc = new jsPDF();

    doc.addHTML(document.body, {
       callback: function (doc) {
         doc.save();
       }
    });

}


