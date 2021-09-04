const hmenu = document.querySelector('.hmenu');
const icon = document.querySelector('.micon');


icon.addEventListener('click', ()=>{
    hmenu.classList.toggle('d-none')
})


const validate = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const input = document.querySelector('input');
    const urls = input.value;
    let results = validate.test(urls);
    let err = document.querySelector('.error');
    let inpu = document.querySelector('#short');
    if(results){
        dataload(urls).then((res)=>{
            appendContent(urls, res)
        }).catch((err)=>{
            console.log(err)
        })
        err.classList.add('d-none')
inpu.style.border=`3px solid green`
        
    }else{
        err.classList.remove('d-none')
inpu.style.border=`3px solid red`

    }

})


async function dataload(url){
   const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
   const data = await response.json();
   return data.result.short_link;
}

const disply = document.querySelector('.section2 .links-display');
const linkstock = document.querySelector('.linksstock');


console.log(typeof(linkstock))
function appendContent(url, sdlink){
const newContent = document.importNode(linkstock.content, true);
newContent.querySelector('.url').textContent = url;
newContent.querySelector('.slink').textContent = sdlink;

newContent.querySelector('input[type="submit"]').addEventListener('click', (e)=>{
    navigator.clipboard.writeText(sdlink);
    e.target.value = 'copied';
    e.target.classList.add('bg-success');
})


disply.appendChild(newContent)

}