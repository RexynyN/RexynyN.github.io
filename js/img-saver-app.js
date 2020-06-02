
// // Handle error 404
// xhr.onloadend = function () {
//     if (xhr.status == 404)
//         throw new Error(url + ' replied 404');
// }


window.onload = () => {
    //Save an image blob
    var xhr = new XMLHttpRequest();

    var url = 'https://mangadex.org/data/c4b3fe284643dafff260a9e05d78a576/s20.png';

    xhr.responseType = 'blob'; //Set the response type to blob so xhr.response returns a blob
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://rexynyn.github.io');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == xhr.DONE) {
            //When request is done
            //xhr.response will be a Blob ready to save
            saveAs(xhr.response, 'image.jpeg');
        }
    };

    xhr.send();
}